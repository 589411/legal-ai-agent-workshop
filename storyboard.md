# Storyboard Draft

這份是 Remotion 與互動展示頁的分鏡基礎。第一支影片已實作於 `remotion/`，主題為「每日法律雷達如何取得新資訊」。

## 已實作影片

- Composition：`LegalRadar`
- 規格：1920 × 1080、30 fps、75 秒
- 用途：講座開場或「每日法律雷達」案例前轉場
- 預覽：`npm run video:studio`
- 渲染：`npm run video:render`

## 視覺風格

- 深色底，白字，高對比。
- 一幕一個重點。
- 使用時間軸、流程圖、對話框、審核節點。
- 不塞滿文字；詳細內容由講者口述或 CLI demo 補足。

## 分鏡

### 1. 開場：律師的一天

畫面：

- 左側：法律資料、LINE 訊息、Time Record、帳單、客戶追問。
- 右側：律師與秘書被多條流程拉扯。

主句：

「AI 不是取代律師，而是先整理那些重複、容易漏、容易錯的工作。」

### 2. 福音團契語境：忠心管家

畫面：

- 三個詞：時間、責任、信任。
- AI Agent 放在「工具」位置，不放在「決策者」位置。

主句：

「工具越強，邊界越要清楚。」

### 3. Daily Bread → 每日法律雷達

畫面：

- 左：每日靈糧流程：日期 → 內容 → LINE 分享/推播。
- 右：法律雷達流程：日期 → 法律更新 → 律師摘要 → 人工確認。

Demo：

```bash
npm run demo:radar
```

### 4. 保密與人工確認

畫面：

- 五個鎖點：個資、案件事實、法律判斷、對外送出、付款狀態。

主句：

「AI 先整理，人再決定。」

### 5. 藍鴨4號：身分分流

畫面：

- 已註冊學生 → 個人上課紀錄。
- 訪客 → 一般課程資訊。

Demo：

```bash
npm run demo:duck
```

### 6. 法律版 LINE Agent

畫面：

- 已識別客戶 → 自己的案件與候選時段。
- 訪客 → 一般預約資訊。
- 秘書 → 待確認卡。

Demo：

```bash
npm run demo:line:client
npm run demo:line:guest
npm run demo:line:secretary
```

### 7. 服務時數彙整

畫面：

- Time Record 表格 → 依律師彙整 → 依客戶案件彙整 → 異常標記 → 人工確認。

Demo：

```bash
npm run demo:hours
```

### 8. Time Record 到帳單草稿

畫面：

- 已確認服務時數 → 費率 → 可請款規則 → 帳單草稿 → email 草稿。

Demo：

```bash
npm run demo:billing
```

### 9. 30 天導入路線

畫面：

- Week 1：盤點流程。
- Week 2：每日法律雷達。
- Week 3：LINE 身分分流與排程。
- Week 4：帳單草稿與付款追蹤。

主句：

「從低風險、可審核、容易有感的流程開始。」

### 10. 結尾

畫面：

- 三條路：工作坊、顧問盤點、內部導入。

主句：

「把今天的模擬事務所，改成你自己的工作流。」
