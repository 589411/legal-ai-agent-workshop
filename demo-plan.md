# Demo Plan

## 原則

- 不改其他 repo；所有引用素材都先複製到 `references/`。
- 不接後端，不依賴 LINE、Cloudflare、Firebase 或外部 API。
- demo 用本機 Node.js 讀取 `data/*.json`，穩定、可重播、可截圖。
- 目標是讓律師看懂「工作流與人工確認點」，不是展示技術炫技。

## Demo 1：每日法律雷達

檔案：

- `data/legal-updates.json`
- `demos/legal-radar.js`

指令：

```bash
npm run demo:radar
```

講法：

`每日靈糧` 每天依日期整理讀經內容；法律版就是每天依議題整理法律更新。AI 先找、先摘要、先分類，但不直接提供法律意見，也不直接發給客戶。

## Demo 2：LINE 身分分流與排程

檔案：

- `data/line-users.json`
- `data/appointments.json`
- `data/clients.json`
- `demos/line-agent.js`

指令：

```bash
npm run demo:line:client
npm run demo:line:secretary
npm run demo:line:guest
```

講法：

同一個 Agent 先判斷身分。已識別客戶可整理案件預約；秘書看到待確認卡；訪客只得到一般資訊。這是法律場景最重要的資料隔離。

## Demo 3A：服務時數彙整

檔案：

- `data/time-records.json`
- `data/clients.json`
- `demos/service-hours-agent.js`

指令：

```bash
npm run demo:hours
```

講法：

原始需求不是一開始就寄帳單，而是先抓取各律師 Time Record，計算服務時數，依律師、客戶、案件整理，並抓出需要人補正的項目。這一步確認後，才進入帳單草稿。

## Demo 3B：Time Record 到帳單草稿

檔案：

- `data/time-records.json`
- `data/clients.json`
- `data/rates.json`
- `data/payments.json`
- `demos/billing-agent.js`

指令：

```bash
npm run demo:billing
```

講法：

AI 不直接寄帳單、不直接認定可請款。它先彙整、計算、找異常，再交給主持律師或秘書確認。

## Demo 4：藍鴨4號橋接

檔案：

- `references/kefu-bot/*`
- `demos/blue-duck-4-bridge.js`

指令：

```bash
npm run demo:duck
```

講法：

藍鴨4號已經做過「註冊學生看個人上課紀錄、訪客看一般課程資訊」。法律事務所版可以映射成「已識別客戶看自己的案件、訪客只看一般資訊」。

## 建議展示順序

1. `demo:radar`：低風險、最容易理解。
2. `demo:duck`：證明身分分流不是想像。
3. `demo:line:client` + `demo:line:guest`：套回法律事務所。
4. `demo:hours`：先展示服務時數如何彙整與找異常。
5. `demo:billing`：再展示帳單草稿與金流仍需人工確認。

## 可備援

如果現場 Node 或投影出問題，可以直接打開這些檔案講：

- `data/legal-updates.json`
- `data/time-records.json`
- `demo-plan.md`
- `outline.md`
