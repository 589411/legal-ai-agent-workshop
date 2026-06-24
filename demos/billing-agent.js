#!/usr/bin/env node
import { bullet, findClient, findMatter, money, readJson, section } from "./lib.js";

const clients = readJson("data/clients.json");
const rates = readJson("data/rates.json");
const records = readJson("data/time-records.json");
const payments = readJson("data/payments.json");

const rateMap = new Map(rates.lawyerRates.map((item) => [item.lawyer, item.hourlyRate]));
const grouped = new Map();

for (const record of records.records) {
  const key = `${record.clientId}::${record.matterId}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(record);
}

section(`月結帳單助理｜${records.month}`);
console.log("用途：自動彙整 Time Record，先產生可審核帳單草稿，不直接寄出。");

for (const [key, entries] of grouped.entries()) {
  const [clientId, matterId] = key.split("::");
  const client = findClient(clients, clientId);
  const matter = findMatter(client, matterId);
  const payment = payments.payments.find((item) => item.clientId === clientId && item.matterId === matterId);
  let total = 0;
  const warnings = [];

  section(`${client.name}｜${matter.name}`);
  entries.forEach((entry) => {
    const rate = rateMap.get(entry.lawyer) || 0;
    const amount = entry.billable ? entry.hours * rate : 0;
    total += amount;
    bullet(`${entry.date}｜${entry.lawyer}｜${entry.hours}h｜${entry.description}｜${entry.billable ? money(amount) : "不請款"}`);

    if (!entry.matterId) warnings.push(`${entry.date} 缺案件編號。`);
    if ((entry.description || "").length < 6) warnings.push(`${entry.date} 描述過短：「${entry.description}」`);
    if (entry.hours > 3) warnings.push(`${entry.date} 單筆超過 3 小時，需主持律師確認。`);
    if (!entry.billable) warnings.push(`${entry.date} 標記為不請款，請確認是否列入帳單備註。`);
  });

  console.log(`\n帳單草稿金額：${money(total)}`);
  bullet(`收件窗口：${matter.billingContact}`);
  bullet(`付款狀態：${payment?.status || "尚未建立"}`);

  section("需人工確認");
  if (warnings.length === 0) {
    bullet("未發現明顯異常。仍需主持律師確認後才能寄出。");
  } else {
    warnings.forEach(bullet);
  }
}

section("Agent 邊界");
rates.billingRules.forEach(bullet);
bullet("確認後才寄 email 給客戶與會計；付款狀態由會計確認後回填。");
