/**
 * 藍鴨學生 AI 客服 / 導課 Bot — Cloudflare Worker
 * ------------------------------------------------------------
 * 流程：LINE webhook → 驗簽 → 去重 → 身份判斷
 *   - active 學生 → 讀他自己的 R2 上課紀錄 → Claude(只依紀錄回答) → 回覆 + 導課
 *   - 訪客/未識別 → 首次請報名 + 通知管理員；之後走課程介紹
 *   - 管理員指令 /approve → 開通學生
 *
 * 金鑰一律用 `wrangler secret put` 設定，不寫死在程式：
 *   LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN, ANTHROPIC_API_KEY
 * 綁定（wrangler.toml）：KV(身份/狀態/去重)、R2(上課紀錄/courses.md)
 */

const ANTHROPIC_MODEL = "claude-sonnet-4-6";
const ANTHROPIC_VERSION = "2023-06-01";
const LINE_MAX = 4900; // LINE 單則文字上限約 5000，留點餘裕

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "GET") return new Response("kefu-bot ok"); // 健康檢查
    if (url.pathname !== "/webhook") return new Response("not found", { status: 404 });

    const raw = await request.text();
    const signature = request.headers.get("x-line-signature") || "";
    if (!(await verifySignature(raw, signature, env.LINE_CHANNEL_SECRET))) {
      return new Response("bad signature", { status: 401 }); // 擋偽造事件
    }

    let body;
    try { body = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }

    // 立刻回 200 給 LINE（它要求數秒內回應），Claude 等較慢的事在背景處理
    ctx.waitUntil(handleEvents(body.events || [], env));
    return new Response("ok");
  },
};

async function handleEvents(events, env) {
  for (const event of events) {
    try {
      // 去重：LINE 在沒收到 200 時會重送同一事件，避免重複回覆
      const eid = event.webhookEventId || `${event.timestamp}:${event.source?.userId || ""}`;
      if (await env.KV.get(`dedup:${eid}`)) continue;
      await env.KV.put(`dedup:${eid}`, "1", { expirationTtl: 86400 });

      if (event.type !== "message" || event.message?.type !== "text") continue; // demo 只處理文字
      const userId = event.source?.userId;
      const replyToken = event.replyToken;
      const text = (event.message.text || "").trim();
      if (!userId || !replyToken) continue;

      // 管理員指令：/approve <userId> <studentId> <name>
      if (text.startsWith("/approve") && (await isAdmin(userId, env))) {
        const msg = await handleApprove(text, env);
        await reply(replyToken, msg, env);
        continue;
      }

      const user = await env.KV.get(`user:${userId}`, "json");
      if (user && user.status === "active") {
        await handleStudent(user, text, replyToken, env);
      } else {
        await handleGuest(userId, text, replyToken, env);
      }
    } catch (e) {
      console.error("event error:", e); // 單一事件出錯不影響其他事件
    }
  }
}

// ---------- 學生：RAG 問答 + 導課 ----------
async function handleStudent(user, text, replyToken, env) {
  const records = await loadStudentRecords(user.studentId, env);
  const courses = await loadCourses(env);
  const system = studentSystemPrompt(user, records, courses);
  const answer = await callClaude(system, text, env);
  await reply(replyToken, answer, env);
}

// ---------- 訪客 / 未識別 ----------
async function handleGuest(userId, text, replyToken, env) {
  const pending = await env.KV.get(`pending:${userId}`, "json");
  const courses = await loadCourses(env);
  const firstTouch = !pending;
  if (firstTouch) {
    // 首次：記 pending、通知管理員（不再用罐頭訊息擋掉首問）
    const displayName = await getLineDisplayName(userId, env);
    await env.KV.put(`pending:${userId}`, JSON.stringify({ displayName, selfReportedName: text, ts: Date.now() }));
    await notifyAdmin(
      `🔔 新用戶待審核\nuserId=${userId}\ndisplayName=${displayName}\n自報=${text}\n核准：/approve ${userId} <studentId> <name>`,
      env
    );
  }
  // 一律由 Claude 以「課程顧問」口吻回答並導購（首次會多一句歡迎＋自然問稱呼）
  const answer = await callClaude(guestSystemPrompt(courses, firstTouch), text, env);
  await reply(replyToken, answer, env);
}

// ---------- 管理員開通 ----------
async function handleApprove(text, env) {
  const [, userId, studentId, ...nameParts] = text.split(/\s+/);
  if (!userId || !studentId) return "用法：/approve <userId> <studentId> <name>";
  const displayName = nameParts.join(" ") || studentId;
  await env.KV.put(`user:${userId}`, JSON.stringify({ studentId, status: "active", displayName }));
  await env.KV.delete(`pending:${userId}`);
  await push(userId, `您好 ${displayName}，已為您開通 ✅ 現在可以問我跟您上課內容有關的問題了！`, env);
  return `已開通：${displayName}（${studentId}）`;
}

// ---------- LINE 簽章驗證（HMAC-SHA256, base64）----------
async function verifySignature(raw, signature, secret) {
  if (!secret || !signature) return false;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return timingSafeEqual(expected, signature);
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// ---------- LINE 回覆 / 推播 ----------
async function reply(replyToken, text, env) {
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` },
    body: JSON.stringify({ replyToken, messages: [{ type: "text", text: clip(text) }] }),
  });
}
async function push(to, text, env) {
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` },
    body: JSON.stringify({ to, messages: [{ type: "text", text: clip(text) }] }),
  });
}
async function notifyAdmin(text, env) {
  if (env.ADMIN_USER_ID) await push(env.ADMIN_USER_ID, text, env);
}
function clip(s) { return s.length > LINE_MAX ? s.slice(0, LINE_MAX) + "…" : s; }

async function getLineDisplayName(userId, env) {
  try {
    const res = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: { authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` },
    });
    if (res.ok) return (await res.json()).displayName || "";
  } catch (_) {}
  return "";
}

// ---------- R2 讀取 ----------
async function loadStudentRecords(studentId, env) {
  const listed = await env.R2.list({ prefix: `students/${studentId}/records/` });
  const parts = [];
  for (const obj of listed.objects || []) {
    const o = await env.R2.get(obj.key);
    if (o) parts.push(await o.text());
  }
  return parts.join("\n\n---\n\n");
}
async function loadCourses(env) {
  const o = await env.R2.get("public/courses.md");
  return o ? await o.text() : "";
}

// ---------- 管理員判斷 ----------
async function isAdmin(userId, env) {
  if (env.ADMIN_USER_ID && userId === env.ADMIN_USER_ID) return true;
  return (await env.KV.get(`admin:${userId}`)) === "1";
}

// ---------- Claude ----------
async function callClaude(system, userText, env) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 800,
        system,
        messages: [{ role: "user", content: userText }],
      }),
    });
    if (!res.ok) { console.error("claude error", res.status, await res.text()); return "抱歉，系統忙線中，請稍後再試 🙏"; }
    const data = await res.json();
    const out = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    return out || "（目前沒有回應，請換個問法試試）";
  } catch (e) {
    console.error("claude exception", e);
    return "抱歉，系統忙線中，請稍後再試 🙏";
  }
}

// ---------- System Prompts ----------
function studentSystemPrompt(user, records, courses) {
  return `你是「藍鴨」的學生 AI 助教，正在服務學生「${user.displayName || user.studentId}」。
規則：
1. 只能根據「以下這位學生自己的上課紀錄」回答他課程相關的問題。
2. 紀錄裡沒有的，就誠實說目前紀錄中沒有、建議直接問老師，絕不杜撰。
3. 回答精簡、繁體中文、口語親切。
4. 回答完，若「課程目錄」中有合適的下一步課程，就自然地推薦一門並附連結；沒有合適的就不要硬推。

=== 這位學生的上課紀錄 ===
${records || "（目前沒有紀錄）"}

=== 課程目錄（導課用）===
${courses || "（無）"}`;
}

function guestSystemPrompt(courses, firstTouch = false) {
  return `你是「藍鴨」的課程顧問（不是被動客服），目標是幫對方找到「明天就能做」的那一件事，並促成預約體驗課 / 報名。對方還不是已開通的學生。

【導購對話原則】
1. 賣成果，不賣功能：用課程目錄裡的「明天就能做」當鉤子，描述對方能得到什麼，不要逐條念規格。
2. 先懂再推：若還看不出對方的產業／想解決什麼，先用「一個」輕鬆問題釐清（一次只問一題，別連珠炮）；看得出來就直接推。
3. 精準推薦：依對方關鍵字，從目錄挑「最相關的 1～2 門」，不要一次倒整份目錄。
4. 每則回答結尾都要有「一個明確、低門檻的行動呼籲」，且讓對方好回覆：例如「想試的話直接回我『我要體驗 ◯◯』，我幫你轉給老師安排體驗課」。
5. 語氣：繁體中文、口語、溫暖、精簡（LINE 一～兩小段，可用 emoji 小標）。

【務必遵守的底線】
- 只根據下方「課程目錄」內容，絕不杜撰課程。
- 目錄沒有「價格、開課時間、堂數」等資訊 → 千萬不要編，改說「這部分我幫你轉給老師、由老師親自跟你說明並安排」，順勢促成留資 / 體驗。
- 連結只貼「看起來完整的正式網址」（http 開頭、且不含 REPLACE 或「待補」字樣）；其餘一律說「老師會提供」，不要貼半成品連結。
- 查不到或不確定 → 誠實說並轉介老師，不要硬掰。
${firstTouch ? "\n【這是對方第一次來訊】先用一句溫暖的話歡迎，並自然地問一下怎麼稱呼（只問一次、別強迫），接著進入上面的導購流程回答對方這次的訊息。\n" : ""}
=== 課程目錄 ===
${courses || "（無）"}`;
}

// 供本機測試（test-local.mjs）匯入使用；不影響 Worker 執行
export { studentSystemPrompt, guestSystemPrompt };
