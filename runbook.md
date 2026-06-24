# Runbook

## 環境需求

- Node.js 18+
- 不需要安裝 npm 套件
- 不需要網路

## 現場前檢查

```bash
cd /Users/joseph/github/legal-ai-agent-workshop
npm run demo:all
```

若全部能跑，表示 demo 資料與腳本可用。

## 單段展示指令

```bash
npm run demo:radar
npm run demo:duck
npm run demo:line:client
npm run demo:line:secretary
npm run demo:line:guest
npm run demo:hours
npm run demo:billing
```

## 展示口令

### 1. 每日法律雷達

「這一段不是要讓 AI 給法律意見，而是讓 AI 像每日靈糧一樣，每天把該看的內容整理好。」

### 2. 藍鴨4號

「我已經做過一個類似模式：註冊學生可以問自己的上課內容；不是學生，只回答一般課程資訊。法律服務也需要這種身分邊界。」

### 3. LINE 客戶排程

「客戶可以用 LINE 問，但 Agent 不直接承諾律師時間。它先整理候選時間，送秘書確認。」

### 4. 訪客模式

「如果不是已識別客戶，Agent 不能碰案件，只能回答一般預約流程。」

### 5. 服務時數彙整

「原始需求不是直接寄帳單，而是先把各律師 Time Record 算清楚。AI 先整理每位律師服務了誰、多少小時、哪些描述太短或需確認。」

### 6. 帳單草稿

「AI 先把 Time Record 整理成帳單草稿，找出描述太短、時間過長、不請款等異常，最後仍由人確認。」

## 失敗備援

如果 `npm` 不能跑，改用：

```bash
node demos/legal-radar.js
node demos/line-agent.js client "我想約下週跟律師討論 AI 供應商合約"
node demos/service-hours-agent.js
node demos/billing-agent.js
node demos/blue-duck-4-bridge.js
```

如果 Node 不能跑，直接打開：

- `demo-plan.md`
- `data/legal-updates.json`
- `data/time-records.json`
- `references/kefu-bot/DEV_PLAN.md`

## 不要做的事

- 不修改其他 repo。
- 不現場接真實 LINE、Cloudflare、Firebase 或金流。
- 不輸入真實客戶個資。
- 不讓 demo 聲稱 AI 可以提供最終法律意見。
