#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { bullet, section } from "./lib.js";

const root = resolve(new URL("..", import.meta.url).pathname);
const courses = readFileSync(resolve(root, "references/kefu-bot/courses.md"), "utf8");
const studentRecord = readFileSync(resolve(root, "references/kefu-bot/lesson-2026-06-15-ai-tools-swimlane.md"), "utf8");

section("藍鴨4號 → 法律事務所 Agent 的橋接");
console.log("藍鴨4號已經展示一個關鍵模式：同一個 LINE Agent 會先判斷身分，再決定可回答的資料範圍。");

section("原本的藍鴨4號模式");
bullet("已註冊學生：讀取該學生自己的上課紀錄，依紀錄回答。");
bullet("未註冊訪客：只回答一般課程資訊，並引導報名或體驗。");
bullet("管理員：可以人工核准，讓訪客轉成已開通學生。");

section("法律事務所映射");
bullet("已識別客戶：只能讀取自己的案件紀錄與預約資訊。");
bullet("未識別訪客：只提供一般服務資訊，不碰個案。");
bullet("秘書：看到待確認預約與行政待辦。");
bullet("律師：看到自己的案件摘要、資料推播與需判斷事項。");

section("可展示的參考內容");
console.log("課程目錄節錄：");
console.log(courses.split("\n").slice(0, 12).join("\n"));
console.log("\n學生紀錄節錄：");
console.log(studentRecord.split("\n").slice(0, 12).join("\n"));

section("講座一句話");
console.log("重點不是 LINE bot 很厲害，而是：Agent 必須知道「你是誰」，才能決定「你可以看什麼、我可以回什麼」。");
