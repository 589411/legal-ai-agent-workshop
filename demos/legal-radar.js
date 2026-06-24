#!/usr/bin/env node
import { bullet, readJson, section } from "./lib.js";

const radar = readJson("data/legal-updates.json");
const highRisk = radar.items.filter((item) => item.riskLevel === "high");
const needsReview = radar.items.filter((item) => item.needsReview);

section(`每日法律雷達｜${radar.date}｜${radar.firm}`);
console.log("用途：把 daily-bread 的每日節奏，轉成律師每天可讀的法律資訊摘要。");

section("今日重點");
radar.items.forEach((item, index) => {
  console.log(`\n${index + 1}. [${item.category}] ${item.title}`);
  bullet(`來源：${item.sourceType}｜${item.source}｜${item.sourceDate}`);
  bullet(`風險：${item.riskLevel}`);
  bullet(`律師版：${item.lawyerSummary}`);
  bullet(`客戶版：${item.clientSummary}`);
  bullet(`建議動作：${item.suggestedAction}`);
  bullet(`人工確認：${item.needsReview ? "需要" : "可列入待辦"}`);
});

section("Agent 今日回報");
bullet(`共整理 ${radar.items.length} 則更新。`);
bullet(`高風險 ${highRisk.length} 則，需優先看：${highRisk.map((item) => item.title).join("、")}`);
bullet(`需律師確認 ${needsReview.length} 則。AI 不直接轉發給客戶，只先產生草稿。`);

section("可轉 LINE 摘要");
console.log(`恩典法律事務所｜今日法律雷達\n高風險 ${highRisk.length} 則，需確認 ${needsReview.length} 則。\n優先看：${highRisk[0]?.title || "無"}\n請周律師確認後再決定是否轉成客戶提醒。`);
