#!/usr/bin/env node
/**
 * 本機測試：不接 LINE、不用 wrangler，直接讀磁碟上的學生紀錄 + courses.md，
 * 看 bot 會怎麼回。重用 src/index.js 的 prompt（單一來源，跟正式上線同一份）。
 *
 * 用法：
 *   ANTHROPIC_API_KEY=sk-... node test-local.mjs stu_a "上次教的泳道圖怎麼做？"
 *   ANTHROPIC_API_KEY=sk-... node test-local.mjs stu_b "上次抓股票成交量的做法？"
 *   ANTHROPIC_API_KEY=sk-... node test-local.mjs guest "有什麼課？"
 *   node test-local.mjs stu_a "..." --dry    # 只印組好的 prompt，不呼叫 Claude（不需金鑰）
 *
 * 需要 Node 18+（內建 fetch）。
 */
import { readFileSync } from "node:fs";
import { studentSystemPrompt, guestSystemPrompt } from "./src/index.js";

const MODEL = "claude-sonnet-4-6";
const RECORDS = {
  stu_a: { name: "學生A", file: "../sample-records/lesson-2026-06-15-ai-tools-swimlane.md" },
  stu_b: { name: "學生B", file: "../sample-records/lesson-codex-stock-workflow.md" },
};

const argv = process.argv.slice(2);
const dry = argv.includes("--dry");
const positional = argv.filter((a) => !a.startsWith("--"));
const who = positional[0] || "stu_a";
const question = positional[1] || "上次上到哪裡？";

const url = (p) => new URL(p, import.meta.url);
const courses = readFileSync(url("../courses.md"), "utf8");

let system;
if (who === "guest") {
  system = guestSystemPrompt(courses);
} else {
  const s = RECORDS[who];
  if (!s) { console.error(`未知學生：${who}（可用 stu_a / stu_b / guest）`); process.exit(1); }
  const records = readFileSync(url(s.file), "utf8");
  system = studentSystemPrompt({ displayName: s.name, studentId: who }, records, courses);
}

if (dry) {
  console.log("===== 組好的 system prompt（--dry，不呼叫 Claude）=====\n");
  console.log(system);
  console.log("\n===== 使用者問題 =====\n" + question);
  process.exit(0);
}

const key = process.env.ANTHROPIC_API_KEY;
if (!key) { console.error("請先設定環境變數 ANTHROPIC_API_KEY"); process.exit(1); }

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
  body: JSON.stringify({ model: MODEL, max_tokens: 800, system, messages: [{ role: "user", content: question }] }),
});
if (!res.ok) { console.error("Claude 錯誤", res.status, await res.text()); process.exit(1); }
const data = await res.json();
const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
console.log(`\n🧑 ${who}：${question}\n`);
console.log(`🤖 bot：\n${text}\n`);
