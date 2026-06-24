# 上課日期：2026-06-15
# 課程主題：用 AI 生成泳道圖／流程圖 — NotebookLM、Mermaid、Codex，到「固化成 Skill」
# 關鍵字：NotebookLM, Mermaid, 泳道圖, Codex, 動態HTML簡報, Skill固化, Gemini, Perplexity Comet, Antigravity

> （這份是清洗、結構化後的上課紀錄；原始為 iPhone 語音逐字稿。專有名詞已校正：泳道圖、Mermaid＝「門妹/M妹」、Codex＝「codase」、Gemini＝「Jemini」、Comet、OpenClaw＝「龍蝦」。）

## 學習重點

- **核心心法**：AI 第一次聽不懂你的話很正常 → **迭代修正** → 完成後請 AI「把過程與踩過的坑**固化成 skill**」，下次同樣的事可自動重用。
- **泳道圖（swimlane）** = 帶多條泳道（不同系統／角色）＋條件判斷的流程圖；軟體工程行之有年（例：登入流程的正確/錯誤、重試次數、忘記密碼寄信重設）。
- **三個工具的分工**：NotebookLM（讀「你自己的文件」、每個答案有來源、可生簡報/摘要/資訊圖/學習卡）；Mermaid（用文字碼畫圖、可隨時改）；Codex（本機沙盒、寫程式＋跑 server＋產出 HTML）。
- **「Python 是工具，HTML 是成果」**：AI 常先寫一支 Python 把文件轉成 HTML；**留下那支 Python ＝ 你的可重用 skill**，日後不靠訂閱也能再跑出同樣結果。
- **動態 HTML 正在取代傳統簡報**：資訊密度高、可互動、QA 時直接跳到任一節點。
- **工具訂閱策略**：不要全訂；訂一個月、把流程**固化成 skill**，之後可退訂。

## 討論內容與問答

### NotebookLM（Pro）
- 加來源四法：上傳檔案、貼網站網址（NotebookLM 會像爬蟲抓回內容）、YouTube 連結、Google 雲端硬碟、或直接貼上文字。
- 右側內建產出：**簡報**、**語音摘要**（把來源變 podcast，可長/中/短）、**資訊圖表**、**學習卡**（考試用，如 RACI 角色卡）。
- **每個回答都有來源（reference）→ 低幻覺**，工作用很好用。最強的場景是「讀你自己的多份本地文件」並附引用，而非上網找。
- 版本差異：免費僅「網路搜尋」；**Pro 可搜尋自己的雲端硬碟**、產更多圖表/簡報。
- 防爬網站會顯示 ⚠（抓不到）。

### 泳道圖 / Mermaid 工作流
- 流程：架構圖（圖片）→ 丟給 Gemini 轉成 **Mermaid 語法** → 貼到 **mermaid.ai**（或在 VS Code / Codex 裝外掛渲染）→ **改文字碼就改圖**，也可叫 AI 繼續改。
- **別用 Nano Banana 畫流程圖** → 用 Mermaid（它是「碼」，可隨時微調系統名稱、排版）。
- mermaid.ai：把 **auto-layout 關掉**才能自由拖曳節點；免費版功能越來越少（在推付費）。

### Codex（本機 app）
- 下載 **macOS app** 比 ChatGPT 側欄擴充好用。
- 給它一個 **workspace 資料夾當沙盒**（像 Mac 裡的虛擬空間，玩壞了砍掉即可）。
- **權限要開「完整存取／自動審查」**，否則會一直卡在等你核准。
- 它會寫 Python、跑起一個 local server、在右側直接渲染 HTML（點兩下即可看）。
- 範例（另一位學生）：抓美股 → 成交量＋KD → **Power BI 風格的動態 HTML 看板**，並設條件（量增 >5日均15%、KD>80 或 <20）。
- 坑：泳道圖轉 SVG/PNG 時**文字會重疊** → 直接跟它說「文字重疊了」，它會自己 check 再改。

### 動態 HTML 簡報
- Prompt 重點：「**動態呈現泳道圖各節點、滑鼠移到節點有 highlight 效果、以動態 HTML 格式呈現**」。
- 用瀏覽器打開即可；QA 時可直接跳到某個資料節點。

### 其他工具
- **Perplexity Comet**：能操控鍵盤滑鼠、像人一樣繞過防爬抓資料（類似 OpenClaw 的部分功能）。
- **Gemini Antigravity（CLI）**：新的 AI 編輯工具，用法類似 Codex / Claude Code。

## 踩過的坑（日後要固化進 skill 的重點）

- Gemini 給「一堆文字」不給圖 → 轉成 Mermaid 碼再渲染。
- mermaid.ai 貼上失敗 / 語法錯 → 全選（Cmd+A）刪掉再重貼。
- Codex 一直停在等核准 → 設定開「完整存取／自動審查」。
- 防爬網站讀不到 → 下載圖片再上傳，或改用 Comet。
- 產出是 `.py` 不是 HTML → Python 是「中間的工具」，HTML 才是成果（留下 Python 當 skill）。

## 作業與下一步

- 下載 **Codex（macOS app）** 與 **Gemini Antigravity CLI**，各跑一次。
- 把要轉泳道圖的**需求書 / 架構圖**放進 Codex 的 workspace，實際轉一張。
- 滿意後，請 AI **「把今天的過程與踩過的坑固化成 skill」**，下次自動重用。
- 學員整理課程筆記回傳；額度重置後（約 5 小時）續做。

---
