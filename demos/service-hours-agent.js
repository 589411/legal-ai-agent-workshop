#!/usr/bin/env node
import { bullet, findClient, findMatter, readJson, section } from "./lib.js";

const clients = readJson("data/clients.json");
const records = readJson("data/time-records.json");

const byLawyer = new Map();
const byMatter = new Map();
const alerts = [];

for (const record of records.records) {
  if (!byLawyer.has(record.lawyer)) {
    byLawyer.set(record.lawyer, { total: 0, billable: 0, nonBillable: 0, entries: [] });
  }
  const lawyerBucket = byLawyer.get(record.lawyer);
  lawyerBucket.total += record.hours;
  if (record.billable) lawyerBucket.billable += record.hours;
  else lawyerBucket.nonBillable += record.hours;
  lawyerBucket.entries.push(record);

  const key = `${record.clientId}::${record.matterId}`;
  if (!byMatter.has(key)) byMatter.set(key, { total: 0, billable: 0, entries: [] });
  const matterBucket = byMatter.get(key);
  matterBucket.total += record.hours;
  if (record.billable) matterBucket.billable += record.hours;
  matterBucket.entries.push(record);

  if (!record.matterId) alerts.push(`${record.date}｜${record.lawyer} 缺案件編號`);
  if ((record.description || "").length < 6) alerts.push(`${record.date}｜${record.lawyer} 描述過短：「${record.description}」`);
  if (record.hours > 3) alerts.push(`${record.date}｜${record.lawyer} 單筆 ${record.hours} 小時，需確認是否拆分或補說明`);
  if (!record.billable) alerts.push(`${record.date}｜${record.lawyer} 標記不請款，需確認是否列入服務紀錄但不進帳單`);
}

section(`服務時數彙整 Agent｜${records.month}`);
console.log("用途：先把各律師 Time Record 彙整成服務時數報告，再交給人確認，之後才進入帳單草稿。");

section("依律師彙整");
for (const [lawyer, bucket] of byLawyer.entries()) {
  console.log(`\n${lawyer}`);
  bullet(`總服務時數：${bucket.total.toFixed(1)} 小時`);
  bullet(`可請款時數：${bucket.billable.toFixed(1)} 小時`);
  bullet(`不請款/內部時數：${bucket.nonBillable.toFixed(1)} 小時`);
  bucket.entries.forEach((entry) => {
    const client = findClient(clients, entry.clientId);
    const matter = findMatter(client, entry.matterId);
    bullet(`${entry.date}｜${client?.name || entry.clientId}｜${matter?.name || entry.matterId}｜${entry.hours}h｜${entry.description}`);
  });
}

section("依客戶案件彙整");
for (const [key, bucket] of byMatter.entries()) {
  const [clientId, matterId] = key.split("::");
  const client = findClient(clients, clientId);
  const matter = findMatter(client, matterId);
  bullet(`${client.name}｜${matter.name}｜總 ${bucket.total.toFixed(1)}h｜可請款 ${bucket.billable.toFixed(1)}h`);
}

section("需確認項目");
if (alerts.length === 0) {
  bullet("未發現需確認項目。");
} else {
  alerts.forEach(bullet);
}

section("下一步");
bullet("律師確認服務時數是否完整。");
bullet("秘書補齊過短描述或錯誤案件編號。");
bullet("主持律師確認不可請款與折讓項目。");
bullet("確認後再執行帳單草稿 demo：npm run demo:billing");
