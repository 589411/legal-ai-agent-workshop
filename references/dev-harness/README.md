# dev-harness — Joseph 的多 repo 開發 harness

一套讓你在「同時多個 repo、技術棧差很大」的情況下，**降低上下文切換成本、防止 repo 停住**的最小系統。
以 Claude Code 為主力，但任何 LLM agent 都適用。

---

## 為什麼需要它（第一性原則）

你的瓶頸不是寫程式的速度，是 **re-entry cost（重新進入成本）**：
隔兩週回到一個 repo，忘了做到哪、下一步是什麼，於是不想開 → repo 停住。

解法只有一個核心動作：**把「狀態」變成顯性檔案，並用鐵律保證每次離開前都更新它。**
其餘都是圍繞這個動作的鷹架。

---

## 三層結構（對應 憲法 / harness / loop）

| 層 | 檔案 | 作用 |
|---|---|---|
| **憲法（薄·全域）** | `GLOBAL-CLAUDE.md` → 複製到 `~/.claude/CLAUDE.md` | 跨所有 repo 都成立的習慣與紅線 |
| **憲法（厚·每 repo）** | `templates/CLAUDE.md.template` | 每個 repo 的棧專屬規則 |
| **harness（交接）** | `templates/STATUS.md.template` | 每個 repo 的「現況＋下一步」單一真相 |
| **loop（推進）** | 全域憲法的「開場 / 收尾」鐵律 | 每次 session 自動讀 STATUS、離開前更新 STATUS |

> 全域憲法**刻意很薄**。塞太多規則 = 沒有規則。棧專屬的東西一律放各 repo 的 CLAUDE.md。

---

## 安裝（一次）

```bash
# 1. 安裝全域憲法（所有 repo 共用的開場/收尾/紅線）
mkdir -p ~/.claude
cp ~/github/dev-harness/GLOBAL-CLAUDE.md ~/.claude/CLAUDE.md
# 若已有 ~/.claude/CLAUDE.md，先比對再合併，不要直接覆蓋

# 2. 安裝「開新 repo」與「補 STATUS」的小工具
cp ~/github/dev-harness/scripts/repo-init.sh ~/github/dev-harness/scripts/repo-init.sh
chmod +x ~/github/dev-harness/scripts/*.sh
```

## 用法（每個 repo）

```bash
# 替一個既有 / 新 repo 鋪上憲法 + STATUS
cd ~/github/<repo>
~/github/dev-harness/scripts/repo-init.sh

# 之後在該 repo 開 Claude Code，第一句話固定是：
#   讀 STATUS.md，告訴我現在卡在哪、下一步是什麼，然後開始做。
```

---

## 🧭 新 session 從這裡開始（context handoff）

任何新的 Cowork / Claude Code session，開場照這個順序讀，就能對齊：

1. 本 `README.md`（索引）
2. `GLOBAL-CLAUDE.md`（規範）＋ `PROJECT-QUEUE.md`（現在在做什麼）
3. 依當下任務再讀對應檔（見下方文件地圖）

> 北極星討論專用：讀 `NORTH-STAR.md`（已含該知道的脈絡＋議程）。

## 文件地圖

- `GLOBAL-CLAUDE.md` — 全域憲法（複製/symlink 到 `~/.claude/CLAUDE.md`）
- `CLAUDE.md` — 本 repo 指引（agent 進來先讀；含「北極星」定義）
- `SKILL-GUIDE.md` — skill 撰寫準則（描述＝觸發面、一 skill 一意圖）
- `SOLUTIONS.md` — 可複用件目錄（動手前先查；含你的 skills）
- `templates/`、`scripts/repo-init.sh` — 新 repo 鋪 CLAUDE.md + STATUS.md
- `scripts/sync.sh` — 換機器開工：拉所有 repo、列下一步、標未push
- `NORTH-STAR.md` — 北極星定義、已建地基、討論議程
- `PROJECT-QUEUE.md` — 已排程的獨立 task（Q1–Q6），一次推一項
- `IDEAS.md` — 支線停車場（someday：RPA/n8n 工具、藍鴨小聚商模）
- `REPO-TRIAGE.md` — 所有 repo 大盤點（復活 / 封存 / 併入 lab）
- `LAUNCHDOCK-LAB-PLAN.md` — launchdock-lab 教學複用規劃
- `LAUNCHDOCK-CONTENT-LOOP.md` — launchdock 內容 loop ＋ lab↔launchdock 內容路由
- `MULTI-MACHINE.md` — 跨機器一致性＋agent 驅動設定（Phase 1/2 prompt）
- `SCREENSHOT-TO-ARTICLE-DESIGN.md` — 截圖→教學文章流程（含 Cowork 回覆決議）
- `HANDOFF.md` — 給 Claude Code 的 git commit 交接
- `TODAY-WORKLIST.md` — 單日遠端無人值守工作清單範例
- `config/`、`SETUP.md` — 跨機器同步的設定與 desired-state 清單（由 Phase 1 生成）

> Repo：https://github.com/589411/dev-harness（private）
