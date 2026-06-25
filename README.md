# Legal AI Agent Workshop

## GitHub Pages

公開展示網址：

```text
https://589411.github.io/legal-ai-agent-workshop/
```

互動簡報：

```text
https://589411.github.io/legal-ai-agent-workshop/presentation/
```

推送到 `main` 後，GitHub Actions 會執行 `npm run build:pages` 並自動部署。

## 互動展示工作台

```bash
npm run demo:web
```

開啟 `http://127.0.0.1:4173`。工作台使用 `data/*.json` 的模擬資料，所有互動只存在瀏覽器記憶體，重新整理或按右上角重設即可復原。

## 互動式講座簡報

啟動同一個本機網站後，開啟：

```text
http://127.0.0.1:4173/presentation/
```

控制方式：

- `→` / 空白鍵：下一個揭露或下一頁
- `←`：上一個揭露或上一頁
- `O`：章節索引
- `P`：講者備註與計時
- `F`：全螢幕
- 簡報內可直接開啟工作台 Demo，再返回原頁

## Remotion 開場與串場

Remotion 不再作為講座主體，而是提供 10 秒開場鉤子與五支 4 秒章節串場。原 75 秒版本保留於 Archive composition。

```bash
npm run video:studio
npm run video:still
npm run video:short
npm run video:render
```

2 小時講座工作目錄：法律事務所 AI Agent 實戰課。聽眾以律師為主，場域是福音團契性質的聚會。

## 目前狀態

- 互動式網頁簡報、工作台 Demo、Remotion 開場與串場均已建立。
- 其他 repo 只讀取，不直接修改；改寫素材均已複製到本工作目錄。
- 參考 repo：
  - `launchdock`
  - `launchdock-lab`
  - `dev-harness`
  - `每日靈糧`
  - `booking-system/kefu-bot`

## 主持人期待

1. AI 助理定時上網查資料，提供最新 AI 法律問題與文獻。
2. 客戶習慣用 LINE 聯絡，AI Agent 可在 LINE 作業，自動排程並發送給秘書。
3. 自動抓取各律師 Time Record，彙整成帳單；確認後用 email 發送給客戶與會計，並回報付款情形。

## 講座方向

- 以觀念啟發為主，但每個觀念都搭配實例。
- 模擬一間法律事務所，從真實需求推導出可落地的工作流。
- `每日靈糧` 可作為重點案例：固定內容、每日排程、LINE 分享/推播、PWA、同步與提醒，對團契聽眾也較容易理解。
- 結尾可輕帶工作坊、顧問服務或內部導入案，但不做強銷售。

## 後續產出

- `outline.md`：講座大綱與時間配置。
- `demo-plan.md`：四個本機 demo 的設計與講法。
- `runbook.md`：現場操作指令與備援方案。
- `presentation/`：33 頁互動簡報、講者備註與生成圖片。
- `remotion/`：開場、章節串場與封存的長版影片。
- `storyboard.md`：影片與互動展示的分鏡基礎。
- `data/`：模擬法律事務所資料。
- `demos/`：可直接執行的本機 CLI demo。
- `references/`：從其他 repo 複製進來的參考素材，本專案內可自由改寫。

## Demo 指令

```bash
cd /Users/joseph/github/legal-ai-agent-workshop
npm run demo:all
```

單獨執行：

```bash
npm run demo:radar
npm run demo:duck
npm run demo:line:client
npm run demo:line:secretary
npm run demo:line:guest
npm run demo:hours
npm run demo:billing
```
