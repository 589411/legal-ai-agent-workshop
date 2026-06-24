# SOLUTIONS — 可複用件目錄（關鍵字索引）

> 「我以前做過嗎？踩過哪些坑？」的**單一查詢點**。
> 這份的設計原則：**靠 grep，不靠 skill 自動觸發**。skill 埋在裡面的件（如 LINE OA、LIFF 登入）不會在做別的意圖時跳出來，所以這裡用**關鍵字行**把它們翻出來給你搜。

## 開場鐵律（每次「要做某功能」前）

```bash
# 動手前先用你嘴裡會講的詞掃這份目錄＋既有 skills，命中就複用/參考，別重造、別重踩坑
grep -i "你的關鍵字" ~/github/dev-harness/SOLUTIONS.md
# 例：grep -i "約課\|line\|登入\|pwa\|推播" SOLUTIONS.md
```

- **命中** → 照「在哪 / 坑已解」複用或參考。
- **沒命中、但其實已有** → 這是一次**複用 miss**（北極星要量的失敗）；補進這份目錄，避免下次再 miss。
- **收尾鐵律**：做出新的可複用件、或新踩通一個坑，回來補一行（能力 → 在哪 → 坑已解 → 關鍵字）。

每條格式固定四欄：**能力 / 在哪 / 坑已解 / 關鍵字**。搜的是「關鍵字」那行（中英別名＋使用情境都塞進去）。

---

## LINE / 會員 / 預約

### LINE 會員課程預約系統（全套 stack）
- **能力**：LINE 內零輸入登入 → 查課表 / 預約 / 取消 / 查剩餘堂數 / 到期提醒的完整閉環；含教師後台（課表匯入、名冊審核、購課加堂、停課通知）。替代外部付費預約平台。
- **在哪**：repo `line-booking-system`（前台 PWA + `worker.js` + `admin.html` + `firebase-init.js` + `liff-init.js` + `booking.js`；L1–L8 操作手冊逐步可抄）。
- **坑已解**：扣堂扣名額用 Firestore `runTransaction`（不超賣、不重複預約，組合主鍵 `bookings/{courseId_lineUserId}`）；停課自動退堂 +1；購課效期取 `max(現有, 今天+90天)` 不縮短；新註冊先 `pending` 待後台核准。
- **關鍵字**：`line 會員 約課 預約 課表 報名 訂位 booking 扣堂 堂數 名額 不超賣 capacity 到期提醒 教室 瑜珈 舞蹈 liff firestore 後台 admin 教師 排課`

### LIFF 零輸入自動登入（LINE 內開網頁直接認人）
- **能力**：在 LINE 內以 LIFF 開啟靜態網頁，自動取得 lineUserId、免帳密登入。
- **在哪**：`line-booking-system/liff-init.js`。
- **坑已解**：認人 + 查身分綁 Firestore `members/{lineUserId}`（見 L3 手冊）。
- **關鍵字**：`liff line 登入 認人 lineUserId 零輸入 免登入 line內開網頁 front-end-framework`

### LINE OA 後端基礎件（webhook + 驗簽 + 白名單核准）
- **能力**：LINE 官方帳號收訊 → HMAC-SHA256 驗簽 → KV 白名單 → admin 手機 `/approve` 核准（第一個傳訊者自動成管理員）→ 回覆。可插拔成任何 LINE bot 後端。
- **在哪**：repo `idea-capture/worker/`（最完整）、`booking-system/kefu-bot/`（核准模式原型）、skill `line-daily-push`（驗簽片段）。
- **坑已解**：簽章錯/沒設 secret 一律 401 擋偽造 POST（constant-time 比對）；token/secret 放 Worker Secret 不進 repo；KV 免費額度對小清單綽綽有餘。
- **關鍵字**：`line oa official account webhook 簽章 hmac 驗簽 x-line-signature 白名單 核准 approve 管理員 admin kv groupId userId bot 後端`

### LINE 定時推播（每天/排程推內容到群組）
- **能力**：Cloudflare Worker + Cron 每天定時 push 到 LINE 群組；把官方帳號邀進群組自動加入推播名單。
- **在哪**：skill `line-daily-push`；實作參考 `每日靈糧` 的 LINE worker。
- **坑已解**：Cron 是 UTC（台灣 −8，早上 7:00 → `0 23 * * *`）；要用「Cron expression」分頁、別用 every-N-hours；改碼一定要按 Deploy；`/?send=1` 立即驗證；推播突然停先查 cron 還在嗎、資料涵蓋今天嗎（過期會靜默不發）；建 Worker 別連 git、別加自訂網域。
- **關鍵字**：`line 推播 定時 每天 排程 cron worker 群組 push 通知 daily 早安`

---

## 登入 / 同步 / Firebase

### Firebase 跨裝置同步（Google 登入 / 免登入同步碼）
- **能力**：純前端網站加雲端同步，兩種：Google 登入（逐人隔離）或免登入「同步碼」。Firebase Auth + Firestore。
- **在哪**：skill `firebase-web-sync`；實例 `每日靈糧`、`line-booking-system`。
- **坑已解**：Firestore **一定選「正式版模式」**（測試模式 30 天後規則自動關、同步突然失效）；`firebaseConfig`/apiKey 放前端是正常且安全的（安全靠 Firestore 規則）；不必貼 Firebase 給的 init `<script>`；未填金鑰自動降級為只存本機。
- **關鍵字**：`firebase google 登入 oauth 同步 跨裝置 firestore auth 同步碼 雲端 免登入 帳號`

### Admin 後台：Google 登入 + Email 白名單
- **能力**：教師/管理員專用網頁，Google 登入後比對管理員 Email 才放行。
- **在哪**：`line-booking-system/admin.html`。
- **坑已解**：用 Email 白名單比對做授權閘（簡單可靠，不必自建 RBAC）。
- **關鍵字**：`admin 後台 google 登入 email 白名單 授權 管理員 權限 教師頁`

---

## 部署 / 前端 / PWA

### 靜態站上線（GitHub Pages + Cloudflare 自訂網域 + HTTPS）
- **能力**：純前端站發布上線、綁自訂（子）網域與 HTTPS。
- **在哪**：skill `static-site-deploy`。
- **坑已解**：CNAME 先用 **DNS only（灰雲）**，橘雲會跟 GitHub SSL 打架；push 被拒「fetch first」常是 Pages UI 自動 commit 了 CNAME → `git pull --rebase` 解；git lock → `rm -f .git/HEAD.lock .git/index.lock`；一個 repo 只能綁一個自訂網域。
- **關鍵字**：`部署 上線 github pages cloudflare dns cname https 自訂網域 子網域 deploy 靜態站 push被拒 lock`

### 網站變可離線安裝的 PWA
- **能力**：靜態站加 manifest + service worker + App 圖示，可「加到主畫面」當 App、離線可載。
- **在哪**：skill `pwa-offline`；實例 `line-booking-system`(`sw.js`+`manifest.webmanifest`)、`每日靈糧`。
- **坑已解**：**別用 cache-first**（會卡舊版）→ 用 **network-first**，push 後立即更新又保離線；處理「iPhone 找不到加入主畫面」「更新後卡舊版」。
- **關鍵字**：`pwa 離線 manifest service worker 加到主畫面 app 圖示 iphone 卡舊版 安裝`

### 前端安全呼叫 LLM（持鑰 Worker 代理 + 多供應商 fallback）
- **能力**：Cloudflare Worker 當 LLM gateway，瀏覽器零金鑰；供應商鏈 OpenRouter/GitHub Models/Anthropic 自動備援；x-app-key / ALLOWED_ORIGIN / Cloudflare Access 三層鎖端點。
- **在哪**：skill `llm-proxy-worker`；實作 `news-response/worker/`。
- **坑已解**：API key 不暴露前端；免費額度 429 自動切換供應商；同網域 `/api` + Pages；Access 登入閘。
- **關鍵字**：`llm 代理 proxy worker api key 金鑰 不暴露 openrouter github-models anthropic gemini gpt claude fallback 429 gateway access`

---

## 內容 / 自動化 / 資料

### 管道無關捕捉 loop（外出丟想法 → 自動起草 → 審 PR 發布）
- **能力**：手機丟一則訊息（LINE）→ loop 撿起 → `claude -p` 起草文章骨架 → 開 PR → 通知。加 Telegram/Issue 只需新增 adapter，下游不動。
- **在哪**：repo `idea-capture`（`worker/` + `loop/draft-loop.sh` + launchd plist）。
- **坑已解**：專屬 clone 不碰工作區、`processed.txt` 去重、不動 main、閒置零成本、人在迴圈審稿。
- **關鍵字**：`想法 捕捉 idea loop 自動起草 draft pr 排程 launchd channel-agnostic adapter telegram 外出 手機`

### YAML → 自動建置展示頁（含每週連結巡檢）
- **能力**：改一個 YAML 資料檔 → push → GitHub Actions 驗證 + 建置成展示頁；每週一自動巡檢失效連結開 Issue。
- **在哪**：repo `launchdock-lab`（`data/projects.yaml` + `scripts/validate.py` + `build.py` + `templates/page.html`）。
- **坑已解**：schema.json 機器驗證（id 唯一、封面存在）；無封面自動產佔位圖；篩選 + QR code 內建。
- **關鍵字**：`yaml 建置 build 展示頁 作品集 gallery github-actions 連結巡檢 linkcheck schema 驗證 demo索引`

### 雙模型撰稿 → 校正（憲法 + 框架 + 回填學習）
- **能力**：事件 → 速報 → 判斷是否對外 → 套版型生成草稿 → 人工修改 → 回填。Sonnet 撰稿 → Opus 4.8 校正。
- **在哪**：repo `news-response`（`CONSTITUTION.md` 不可違反原則、`FRAMEWORK.md` 流程、`knowledge_base.json` 事件→爭點/基調/few-shot、`news-response-onboard` skill 多單位導入）。
- **坑已解**：憲法/框架分層（原則 vs 流程）；few-shot 知識庫驅動；多單位用 onboard 框架複製。
- **關鍵字**：`新聞稿 公關 危機 撰稿 雙模型 sonnet opus 校正 憲法 框架 few-shot 知識庫 輿情 多單位 導入 onboard`

### BI 儀表板（單檔 HTML，不用 DAX/建模）
- **能力**：CSV/Excel/JSON → 互動圖表/儀表板，交叉篩選、KPI 即時重算、Pareto/熱力圖/漏斗。
- **在哪**：skill `lucid-bi`。
- **關鍵字**：`bi 儀表板 戰情板 看板 dashboard 圖表 視覺化 kpi pareto 熱力圖 漏斗 csv excel powerbi替代`

### YouTube 播放清單 → 影片 ID 對照
- **能力**：用 YouTube Data API（Colab）把頻道播放清單建成「標題→videoId」對照表，省配額。
- **在哪**：skill `youtube-playlist-map`。
- **關鍵字**：`youtube 播放清單 playlist videoId 影片對照 api colab 配額 系列`

### 從雜亂歷史排程重建週期、預測未來
- **能力**：不乾淨的歷史排程（CSV/網頁）→ 找週期規律、第一性原則驗證穩定度 → 產未來草稿。
- **在哪**：skill `cyclic-schedule-reconstruct`。
- **關鍵字**：`班表 輪值 值班表 排班 排程 週期 規律 預測 重建 csv`

---

## 專案維護手冊型 skill（靠專案名觸發）
- `update-daily-bread` → 維護「每日靈糧」讀經網站（新增月份進度、影片對照、Firebase 同步、PWA/部署）。
- `update-bible-atlas` → 維護「聖經像素地圖」（時代內容、子代理量產、book_eras 對照、與 daily-bread 接合）。

---

> 索引層 = 這份（grep）。執行層 = skills（靠意圖自動觸發，保持少、一顆一意圖）。兩層分開，才能同時做到「找得到」又「不塞爆 context」。
