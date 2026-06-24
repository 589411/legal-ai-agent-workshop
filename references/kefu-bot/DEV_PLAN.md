# 藍鴨學生 AI 客服 / 導課 Bot — 開發計劃

> 專案 3(最高優先)。Joseph 自用的 LINE bot:回答學生問題、提升黏著度、推課;之後再疊預約功能。
> 同時是 6/26 律師團契講座的 demo。技術棧:**Cloudflare Workers + KV + R2 + Claude API**。

---

## 0. 一條設計鐵律(決定成本與架構)

**「導課」要塞進「回覆」裡,不要靠「主動推播」。** LINE 回覆訊息免費、不限量;只有主動推播計費(輕用量每月僅 200 則)。所以:學生來問問題,bot 在回答尾巴順勢推薦下一門課 = 免費。主動推播只留給真正高價值的時刻(例如剩堂數快用完、限時優惠),省著用。

---

## 一、系統架構(各層職責)

| 層 | 技術 | 職責 |
|---|---|---|
| 介面 | LINE OA | 收訊息(webhook)、回訊息(reply)、圖文選單、postback |
| 編排/大腦 | Cloudflare Worker (JS) | 驗簽、去重、身份判斷、呼叫 Claude、組回覆 |
| 身份/狀態 | Cloudflare KV | userId↔studentId、學生狀態、待審核佇列、事件去重 |
| 內容 | Cloudflare R2 | 每位學生的上課紀錄(Markdown)、公開課程目錄 `courses.md` |
| 理解/生成 | Claude API | 意圖辨識、依紀錄回答(RAG)、導課、逐字稿處理 |

**兩個面向,分開想:**
- **Runtime(學生/訪客用的 bot)**:隨時在線,跑在 Worker。
- **後台(你自己用的內容準備)**:逐字稿→紀錄、審核學生。**這半不需要上線**——做成你本機跑的 Claude Code skill 或管理員指令即可。Demo 階段甚至先手動預載。

---

## 二、KV 資料結構

```
user:{lineUserId}      → { studentId, displayName, status, joinedAt }
                         status = "guest" | "pending" | "active"
student:{studentId}    → { name, tags:[...], recordKeys:[...], createdAt }
pending:{lineUserId}   → { displayName, selfReportedName, ts }   # 待你人工核准
dedup:{eventId}        → "1"   (TTL 1 天，擋 LINE 重送造成的重複處理)
admin:{lineUserId}     → "1"   # 標記你自己是管理員
```

> 訪客(沒上過課)= KV 查無 `user:` 或 status=guest;學生 = status=active。

## 三、R2 檔案結構

```
students/{studentId}/records/{YYYY-MM-DD}.md   # 一堂課一個檔（避免「附加到同一檔」的覆寫風險）
students/{studentId}/profile.md                # 選用：學生輪廓摘要
public/courses.md                              # 公開課程/主題目錄（推課用，見另檔）
```

> 「一堂一檔」勝過「附加到同一個大檔」:沒有 read-modify-write 競態,功能三要讀全部紀錄時就是 list + 抓檔。

---

## 四、Worker 主邏輯(pseudocode)

```
POST /webhook:
  1. 驗證 x-line-signature（HMAC-SHA256, channel secret）→ 失敗回 401
  2. for each event in body.events:
     a. 去重：if KV.get(dedup:{event 唯一id}) 存在 → skip；否則寫入（TTL 1天）
     b. if event 是 postback（圖文選單）→ 依 action 處理（查我的紀錄 / 看課程）
     c. if event 是文字訊息：
        user = KV.get(user:{userId})
        ── 管理員（KV.admin 命中）且訊息是指令/逐字稿 → 走【後台流程】
        ── status = active（學生）→ 走【學生問答流程】
        ── 其他（訪客/未識別）→ 走【訪客流程】

學生問答流程:
  - records = R2 list+get  students/{studentId}/records/*
  - courses = R2 get public/courses.md
  - 呼叫 Claude（系統提示見【五-4】），帶入 records + courses + 問題
  - Claude 回答（只根據該生紀錄）+ 視情況在結尾導一門相關課
  - reply 回 LINE

訪客流程:
  - 若首次：回「申請已收到，請告知您的姓名以便確認身份」→ 寫 pending → 通知 Joseph
  - 否則：一般模式——介紹課程、近期開課、引導報名（可帶 courses.md）

後台流程（你自己用，demo 階段可省）:
  - /approve {lineUserId} {studentId}  → 建 user: 對應、status=active、通知學生「已開通」
  - 貼上逐字稿 → 跑【五】三段處理 → 寫入 R2 該生 records
```

模型建議:runtime 問答用 `claude-sonnet-4-6`(快、便宜、夠聰明);逐字稿結構化也用 sonnet-4-6;若要更省,意圖分類可用 `claude-haiku-4-5`。

---

## 五、Claude Prompt 設計

**Prompt 1｜清洗逐字稿**
> 你是逐字稿整理員。輸入是 iPhone 語音轉文字、品質粗糙的繁體中文逐字稿。請移除語氣詞與口頭禪、修正斷句與標點、合併破碎句子,**不要改變原意、不要新增沒講過的內容**。輸出乾淨的繁體中文純文字。

**Prompt 2｜結構化成課程紀錄**
> 你是課程記錄編輯。把以下清洗後的逐字稿整理成這個 Markdown 格式:
> ```
> # 上課日期：{date}
> # 課程主題：{一句話主題}
> # 關鍵字：{tag1, tag2, tag3}
> ## 學習重點
> ## 討論內容與問答
> ## 作業與下一步
> ```
> 只根據逐字稿內容,不要杜撰。條列清楚、口語轉書面。

**Prompt 3｜萃取關鍵字標籤**
> 從這份課程紀錄抽 3–6 個技術/主題關鍵字(如:n8n、Prompt 工程、Claude API、LINE webhook),回傳 JSON 陣列。

**Prompt 4｜Runtime 客服人格(最重要)**
> 你是藍鴨的學生 AI 助教。**只能根據「這位學生自己的上課紀錄」回答**他課程相關問題;紀錄裡沒有的,就說目前紀錄中沒有、建議直接問老師,**絕不杜撰**。回答精簡、繁體中文。回答完,**若有合適的下一步課程(見 courses.md),自然地推薦一門**並附連結;沒有合適的就不要硬推。

---

## 六、三階段開發計畫

**Phase 1 — demo 上線(目標 6/26 前,核心抓前 3 天衝)**
- LINE webhook echo → 驗簽 → 文字回覆跑通。
- 預先把你 2 位 demo 學生的紀錄(貼逐字稿、跑 Prompt 1–3)放進 R2。
- KV 預先寫好這 2 位的 user:↔studentId(demo 不做審核 UI)。
- 學生問答流程(RAG)+ 訪客模式 + 結尾導課。
- 產出:**真的上線的 bot + 2 段 LINE 對話 demo**。

**Phase 2 — 真實學生上線(講座後約兩週)**
- 審核解鎖(做成管理員指令或本機 skill)。
- 逐字稿→紀錄做成你常用的 skill,日常上課後一鍵生紀錄。
- 累積更多學生紀錄。

**Phase 3 — 導課自動化 +(之後)預約(約一個月後起)**
- 黏著度/回購分析:辨識久未互動的學生、在「回覆」時導課;高價值時刻才動用主動推播(控在免費額度)。
- 接著疊**預約功能**(沿用 booking-system 的帳本/預約設計):會員預約/取消、堂數扣減、剩 3 堂提醒、開課門檻分眾通知。

---

## 七、6/26 Demo 最小清單(逐項估時)

| # | 項目 | 估時 |
|---|---|---|
| 1 | Cloudflare Worker + LINE webhook 驗簽 + echo 跑通 | 0.5 天 |
| 2 | KV/R2 綁定，寫入 2 位 demo 學生對應與紀錄 | 0.5 天 |
| 3 | 貼逐字稿 → Prompt 1–3 → 產出 2 位學生的 records.md | 0.5 天 |
| 4 | 學生問答 RAG（讀 records → Claude → 回答）| 1 天 |
| 5 | 結尾導課（讀 courses.md → 推薦一門 + 連結）| 0.5 天 |
| 6 | 訪客模式（課程介紹）| 0.5 天 |
| 7 | 排練 2 段對話：①學生問「上次上到哪/某概念」→ 個人化回答 + 導課 ②訪客問「有什麼課」→ 介紹 | 0.5 天 |

**Demo 的 wow 點**:學生問「我上次學的 LINE 推播怎麼接?」→ bot 用他**自己的上課紀錄**回答 → 結尾:「你這個基礎很適合接著做〈⚙️ 文章自動產線〉,要看看嗎?」(導課,免費)。

---

## 八、哪幾塊抽成可重用 skill(跨棧接縫,不抽資料層)

| Skill | 內容 | 重用於 |
|---|---|---|
| `line-oa-base` | webhook + 驗簽 + reply/push + 圖文選單/postback 骨架 | 每個 LINE 專案、小朱的課(1) |
| `line-member-identity` | userId↔會員對應 + 首次建檔/審核解鎖 | 課服 bot、預約系統 |
| `line-ai-rag` | 讀某人紀錄 → 餵 Claude → 回答 + 導課 | 課服 bot、未來客戶 |
| `transcript-to-record` | 粗逐字稿 → 清洗 → 結構化 Markdown + 標籤 | 課服 bot、你的協會公文 |
| (現成)`line-daily-push` | 入群取 groupID + 加白名單 + 定時推播 | 主動推播那一側 |

> 抽在這些「LINE I/O / 身份 / AI / 逐字稿」的接縫,資料層(KV/R2 vs Airtable/Supabase)因專案而異不抽 → 一份心力,專案 1、3 與未來客戶都能複用。
> (技術提醒:在本工作階段我可幫你把 skill 檔案寫進 repo;正式安裝/啟用走你熟悉的 Settings > Capabilities 流程。)
