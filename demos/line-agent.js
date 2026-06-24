#!/usr/bin/env node
import { bullet, findClient, findMatter, readJson, section } from "./lib.js";

const role = process.argv[2] || "client";
const message = process.argv.slice(3).join(" ") || "我想約下週跟律師討論合約";

const users = readJson("data/line-users.json").users;
const clients = readJson("data/clients.json");
const appointments = readJson("data/appointments.json");

const user = users.find((candidate) => candidate.role === role) || users.find((candidate) => candidate.role === "guest");

section("LINE 身分分流 Agent");
bullet(`輸入身分：${role}`);
bullet(`使用者：${user.displayName}`);
bullet(`訊息：${message}`);

if (user.role === "guest") {
  section("回覆給未識別訪客");
  console.log("您好，我可以先提供一般法律諮詢預約資訊。為保護當事人資料，我不能查詢任何案件內容。若您已是客戶，請由事務所秘書協助完成身分確認。");
  section("Agent 邊界");
  bullet("不揭露案件資料。");
  bullet("不承諾律師時間。");
  bullet("只提供一般預約流程。");
  process.exit(0);
}

if (user.role === "secretary") {
  section("秘書工作台");
  appointments.pendingRequests.forEach((request) => {
    const client = findClient(clients, request.clientId);
    const matter = findMatter(client, request.matterId);
    const topic = request.topic === matter.name ? request.topic : `${matter.name}｜${request.topic}`;
    bullet(`${client.name}｜${topic}`);
    bullet(`候選時間：${request.suggestedSlots.join("、")}`);
    bullet("下一步：秘書確認後，Agent 才能回覆客戶並建立行事曆。");
  });
  process.exit(0);
}

if (user.role === "lawyer") {
  section("律師今日摘要");
  const lawyer = appointments.lawyers.find((candidate) => candidate.name === user.displayName);
  bullet(`可約時段：${lawyer?.availableSlots.join("、") || "尚未設定"}`);
  bullet("待秘書確認預約：1 件。");
  bullet("Agent 只整理候選時間，不替律師承諾。");
  process.exit(0);
}

const client = findClient(clients, user.clientId);
const matter = findMatter(client, user.matterIds[0]);
const lawyer = appointments.lawyers.find((candidate) => candidate.name === matter.leadLawyer);
const slots = lawyer.availableSlots.slice(0, 2);

section("回覆給已識別客戶");
console.log(`${user.displayName}您好，我找到您目前的案件：「${matter.name}」。`);
console.log(`我先整理兩個候選時間給秘書確認：${slots.join("、")}。秘書確認後，才會正式回覆您並建立行事曆。`);

section("送給秘書的確認卡");
bullet(`客戶：${client.name}｜${client.company}`);
bullet(`案件：${matter.name}`);
bullet(`主辦律師：${matter.leadLawyer}`);
bullet(`客戶原訊息：${message}`);
bullet(`候選時間：${slots.join("、")}`);
bullet("需人工確認：是否適合安排、是否需要律師先看資料、是否可正式邀約。");
