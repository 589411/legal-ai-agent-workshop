# launchdock 內容更新 Loop 設計

> 把「更新網站內容」從一次性手動工作，變成會自我推進的閉環。
> 第一性原則：你的零件幾乎都有了，缺的是**「決定下一件事」這一步**——
> 現在靠你想起來，所以會停。Loop 化 = 讓系統自己冒出下一個內容任務。

## 你已經有的零件

| 階段 | 現有資產 | 狀態 |
|---|---|---|
| 起草 | `scripts/article-workflow.sh`（8 步一鍵）、`@img` 標記系統 | ✅ 成熟 |
| 驗證 | `redact-screenshots.py`、機敏掃描、`@img --validate` | ✅ |
| 發布 | push → Cloudflare 自動 build → sitemap 自動更新 | ✅ |
| 監控 | `feedback-monitor.sh`、lab 的 `linkcheck.yml`（每週開 Issue） | ✅ 部分 |
| **選題** | — | ❌ **缺這一環，所以 loop 接不起來** |

現況是一條「直線」：想到 → 寫 → 發。寫完就斷，要靠你重新啟動。

## 目標閉環

```
   ┌─────────────────────────────────────────────┐
   │                                             ↓
（6）回饋 → 寫進 BACKLOG     （1）觸發（每週排程 / 你一句話）
   ↑                              ↓
（5）監控：壞連結 / 缺圖 /    （2）選題：讀 BACKLOG，挑出最高價值的一件
     讀者回饋 → 產生新項目          ↓
   ↑                          （3）起草：article-workflow.sh（含 @img）
   │                              ↓
   └──────（4）驗證 + 發布 ←──────┘
            （機敏掃描、push、自動部署）
```

## 缺的那一環：`BACKLOG.md`（內容待辦單一真相）

在 launchdock 建一份 `BACKLOG.md`，每項是一個候選內容任務：

```markdown
## 待辦（依價值排序，新項目自動補在分類下）
### 來自監控（系統自動產生）
- [ ] [壞連結] article-x 的 zeabur 連結失效 — linkcheck #12
- [ ] [缺圖] article-y 有 3 個 @img 未配對

### 來自規劃（你或 AI 提議）
- [ ] [新文] n8n 串 LINE 通知教學（對應 lab demo gas-line-push）
- [ ] [更新] 某文 UI 改版，截圖需重拍
```

**這份檔案就是 loop 的記憶。** 監控往裡寫，選題從裡讀。它讓「下一件事」永遠是顯性的——
和你各 repo 的 `STATUS.md` 是同一個哲學。

## 落地步驟

### 步驟 1：建 BACKLOG.md + 選題慣例
建檔，並在 launchdock/CLAUDE.md 加一條：每次內容工作**開場讀 BACKLOG、收尾更新 BACKLOG**。

### 步驟 2：讓監控自動寫進 BACKLOG
- 既有 `feedback-monitor.sh` 與 lab `linkcheck` 的產出，改成**附加到 BACKLOG.md**（或開 GitHub Issue 並在 BACKLOG 引用）。
- 新增「缺圖偵測」：掃所有文章未配對的 `@img` → 寫進 BACKLOG。

### 步驟 3：每週排程觸發（建議用 Cowork 排程）
每週一早上自動跑一次：執行監控 → 更新 BACKLOG → 給你一份「本週內容待辦 Top 3 + 建議先做哪篇」。
你只要看一眼、說「做第一個」，loop 就轉起來。

### 步驟 4：起草/發布沿用現有 article-workflow.sh
不重寫。選題決定後，把 slug 丟給既有腳本即可。

## 與 launchdock-lab 的接點

lab 新增一個 demo 時，可在 BACKLOG 自動補一項「為這個 demo 寫一篇教學文」——
讓 demo 庫和教學站互相餵題，兩個站一起長。

### 內容路由規則（東西該放哪）

- **操作型、會隨平台改版的步驟教學**（LINE OA 設定、Cloudflare Worker 操作、各種後台設定）
  → **launchdock 教學頁**。用 `@img` 截圖，當上課講義、可重複使用，又帶 SEO 流量。
- **可點、可重用的成品／概念品（demo）** → **lab**（projects.yaml）。
- **研究心得、概念長文** → launchdock。
- 鐵律：lab 的 demo 需要「怎麼做」的步驟時，用 `links.kind: doc` **連到 launchdock 那篇，不在 lab 複製步驟**。
  同一份操作教學只維護一處（launchdock），平台改版時只改一個地方。

## 給 Claude Code 的起手指令（之後實作用）
> 讀 launchdock/CLAUDE.md、QUICK_REFERENCE.md 與本檔。先做步驟 1：
> 建 BACKLOG.md（含「來自監控 / 來自規劃」兩區），並在 CLAUDE.md 補「開場讀、收尾更新 BACKLOG」鐵律。

---
💡 步驟 3 的每週排程我可以直接幫你設定（Cowork 排程任務）。要的話跟我說，我們先把前兩步檔案做出來再掛排程。
