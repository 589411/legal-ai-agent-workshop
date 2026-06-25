const asset = (name) => `./assets/${name}`;
const video = (name) => `../remotion/out/${name}`;

const card = (number, title, copy, tone = "") => `
  <article class="card ${tone} fragment">
    <span class="card-number">${number}</span>
    <h3>${title}</h3>
    <p>${copy}</p>
  </article>`;

const slides = [
  {
    chapter: "開場",
    minutes: "1 分",
    title: "開場鉤子",
    notes: "這支影片只有 10 秒。按播放，結束後立刻進入正式標題頁，不在影片中講解。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("opening-hook.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放開場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "開場",
    minutes: "4 分",
    title: "法律事務所 AI Agent 實戰課",
    notes: "開場先不要解釋技術。問大家：每天最消耗注意力、卻不一定需要法律判斷的是什麼？\n\n核心句：工具越強，邊界越要清楚。",
    html: `
      <img class="slide-bg" src="${asset("law-office-stewardship.png")}" alt="">
      <div class="slide-content hero-copy">
        <p class="kicker">AI × 法律服務 × 忠心管家</p>
        <h1>法律事務所<br>AI Agent 實戰課</h1>
        <p class="lead">不是讓 AI 取代律師，而是重新設計資訊、溝通與行政工作的流動方式。</p>
        <div class="meta-line"><span>2 小時互動講座</span><span>恩典法律事務所 · 模擬案例</span></div>
      </div>`,
    className: "image-slide",
  },
  {
    chapter: "開場",
    minutes: "4 分",
    title: "最想先自動化哪一件事？",
    notes: "請現場舉手或掃視反應。三個選項正好對應後半場三個案例。不要急著評價答案。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Audience poll</p>
        <div class="big-question">如果只能先改善一件事，你會選哪一個？</div>
        <div class="poll-options">
          <div class="poll-option fragment"><span>01</span>每天找最新法律資訊</div>
          <div class="poll-option fragment"><span>02</span>LINE 往返與排程</div>
          <div class="poll-option fragment"><span>03</span>Time Record 與帳單</div>
        </div>
      </div>`,
  },
  {
    chapter: "開場",
    minutes: "3 分",
    title: "三種壓力",
    notes: "把主持人原始需求完整還原。重點是：三件事表面不同，底層其實都是『資料進來、整理、確認、行動』。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">The simulated firm</p>
        <h1>恩典法律事務所的三種壓力</h1>
        <div class="grid-3">
          ${card("01", "資訊太快", "AI 法、個資、智財、資安資訊每天增加，律師沒有時間逐一追蹤。", "blue")}
          ${card("02", "溝通太碎", "客戶習慣用 LINE，秘書不斷確認身分、案件、時間與資料。", "green")}
          ${card("03", "行政易錯", "工時描述不完整、不可請款項目與帳單寄送都需要反覆核對。", "red")}
        </div>
      </div>`,
  },
  {
    chapter: "Agent 觀念",
    minutes: "5 分",
    title: "ChatGPT 與 Agent",
    notes: "ChatGPT 回答問題；Agent 對一個結果負責，會讀資料、用工具、遵守流程並回報。律師需要的通常不是多一個聊天視窗。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Chat is not a workflow</p>
        <h1>會回答，不等於會工作。</h1>
        <div class="comparison">
          <div class="comparison-block fragment"><h2>ChatGPT</h2><ul><li>等待一次提問</li><li>產生一次回答</li><li>上下文常由人提供</li><li>回答後流程中斷</li></ul></div>
          <div class="versus">→</div>
          <div class="comparison-block accent fragment"><h2>AI Agent</h2><ul><li>有固定任務與觸發時間</li><li>能讀取指定資料與工具</li><li>保留狀態、權限與紀錄</li><li>知道何時必須交給人</li></ul></div>
        </div>
      </div>`,
  },
  {
    chapter: "Agent 觀念",
    minutes: "4 分",
    title: "Agent 的五個構件",
    notes: "逐步揭露五個構件。最後問：如果少了『邊界』會怎樣？答案是它可能很有效率地做錯事。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Anatomy of an agent</p>
        <h1>任務、資料、工具、邊界、回報</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>任務</strong><small>要達成什麼結果</small></div>
          <div class="flow-step fragment"><b>02</b><strong>資料</strong><small>可讀哪些內容</small></div>
          <div class="flow-step fragment"><b>03</b><strong>工具</strong><small>可執行哪些動作</small></div>
          <div class="flow-step fragment"><b>04</b><strong>邊界</strong><small>何時必須停下</small></div>
          <div class="flow-step fragment"><b>05</b><strong>回報</strong><small>留下什麼紀錄</small></div>
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "Agent 觀念",
    minutes: "4 分",
    title: "忠心管家的框架",
    notes: "福音團契語境不用把經文變成技術背書。只談三個可理解的價值：時間、責任、信任。AI 是工具，不是責任主體。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Stewardship</p>
        <div class="quote-mark">“</div>
        <div class="quote">AI 的價值，不是讓人逃離責任，而是把時間留給真正需要人的判斷、陪伴與承擔。</div>
        <div class="grid-3" style="margin-top:55px">
          ${card("時間", "減少重複", "把查找、整理、格式化與提醒交給系統。", "green")}
          ${card("責任", "保留判斷", "法律意見、承諾與對外送出仍由人決定。", "blue")}
          ${card("信任", "留下紀錄", "來源、版本、確認者與送出時間可以追溯。", "amber")}
        </div>
      </div>`,
  },
  {
    chapter: "安全邊界",
    minutes: "5 分",
    title: "不能全自動的五個鎖點",
    notes: "這一頁是全場的風險底線。每揭露一個鎖點就給一個例子。特別強調帳單與付款狀態不能由模型自行認定。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Safety gates</p>
        <h1>法律工作不能只問「做不做得到」</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>個資</strong><small>是否可輸入此工具</small></div>
          <div class="flow-step fragment"><b>02</b><strong>案件事實</strong><small>是否跨越客戶邊界</small></div>
          <div class="flow-step fragment"><b>03</b><strong>法律判斷</strong><small>是否由律師確認</small></div>
          <div class="flow-step fragment"><b>04</b><strong>對外送出</strong><small>是否有人核准</small></div>
          <div class="flow-step fragment"><b>05</b><strong>金流狀態</strong><small>是否由會計回填</small></div>
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "安全邊界",
    minutes: "4 分",
    title: "資料先分級，才談工具",
    notes: "讓聽眾思考自己事務所現況。公開資料可先做；真實客戶資料不能因為方便就直接貼進未核准工具。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Data classification</p>
        <h1>同一個模型，不代表所有資料都能進去。</h1>
        <div class="classification">
          <div class="class-column fragment"><h3>公開</h3><ul><li>法規與判決</li><li>主管機關公告</li><li>公開文章</li></ul></div>
          <div class="class-column fragment"><h3>內部</h3><ul><li>流程手冊</li><li>範本</li><li>一般行政資料</li></ul></div>
          <div class="class-column fragment"><h3>機密</h3><ul><li>客戶身分</li><li>案件事實</li><li>未公開合約</li></ul></div>
          <div class="class-column fragment"><h3>高度敏感</h3><ul><li>訴訟策略</li><li>健康與財務資料</li><li>密碼與金流資訊</li></ul></div>
        </div>
      </div>`,
  },
  {
    chapter: "每日節奏",
    minutes: "1 分",
    title: "從每日靈糧看工作流",
    notes: "這是 Remotion 串場，不需要講完整內容。按播放，影片結束後下一頁才開始拆解。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("transition-daily-rhythm.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放串場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "每日節奏",
    minutes: "5 分",
    title: "每日靈糧：不是內容頁，而是一個節奏系統",
    notes: "用這張圖連接團契經驗。內容不是每天臨時貼，而是日期、格式、分享、推播、同步共同構成一條工作流。",
    html: `
      <img class="slide-bg" src="${asset("fellowship-daily-rhythm.png")}" alt="">
      <div class="slide-content hero-copy right">
        <p class="kicker">Daily Bread</p>
        <h1>固定內容<br>如何變成每日節奏？</h1>
        <p class="lead">日期決定內容，系統整理格式，使用者在手機閱讀，再透過 LINE 分享或定時推播。</p>
      </div>`,
    className: "image-slide reverse",
  },
  {
    chapter: "每日節奏",
    minutes: "5 分",
    title: "每日節奏系統",
    notes: "逐步揭露，指出每一格都能映射到法律資訊：日期、來源、摘要、審核、推播。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Reusable pattern</p>
        <h1>內容只是其中一格，節奏才是系統。</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>內容來源</strong><small>經文與材料</small></div>
          <div class="flow-step fragment"><b>02</b><strong>日期規則</strong><small>今天顯示什麼</small></div>
          <div class="flow-step fragment"><b>03</b><strong>閱讀格式</strong><small>手機與 PWA</small></div>
          <div class="flow-step fragment"><b>04</b><strong>分享提醒</strong><small>LINE 與推播</small></div>
          <div class="flow-step fragment"><b>05</b><strong>維護同步</strong><small>版本與雲端</small></div>
        </div>
      </div>`,
  },
  {
    chapter: "每日節奏",
    minutes: "4 分",
    title: "把內容換掉，工作流仍成立",
    notes: "這是轉折頁。每日靈糧換成法律更新、客戶進度、帳單提醒，底層工作流沒有改變。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Pattern transfer</p>
        <h1>日期 → 內容 → 整理 → 確認 → 分享</h1>
        <div class="grid-3" style="margin-top:55px">
          ${card("每日", "法律雷達", "官方法規、裁判與主管機關動態。", "blue")}
          ${card("每週", "客戶更新", "案件進度、待補資料與下一步。", "green")}
          ${card("每月", "帳單提醒", "服務時數、帳單草稿與付款狀態。", "amber")}
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "休息",
    minutes: "10 分",
    title: "休息與問題",
    notes: "休息前請大家留一個問題：如果 Agent 明天上班，你最希望它先接手哪一步？",
    html: `
      <div class="slide-content centered">
        <p class="kicker">10 minute break</p>
        <h1>休息一下，留一個問題。</h1>
        <div class="prompt-box">如果 AI Agent 明天進事務所上班，你希望它先接手哪一個「步驟」，而不是哪一整份工作？</div>
      </div>`,
  },
  {
    chapter: "法律雷達",
    minutes: "1 分",
    title: "案例一：每日法律雷達",
    notes: "播放短串場，讓聽眾重新聚焦。影片只負責建立情境，不承載完整解釋。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("transition-legal-radar.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放串場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "法律雷達",
    minutes: "5 分",
    title: "新的法律資訊從哪裡來？",
    notes: "只用白名單來源，不讓 AI 任意搜尋全網。公開資料先做，最容易創造價值又風險最低。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Trusted source list</p>
        <h1>先定義可信來源，才談自動摘要。</h1>
        <div class="grid-4">
          ${card("01", "全國法規資料庫", "法規異動、命令、行政規則與草案。", "green")}
          ${card("02", "司法院開放資料", "裁判書、案號、裁判日期與法院。", "blue")}
          ${card("03", "主管機關", "金管會、數發部、智財局、勞動部。", "amber")}
          ${card("04", "國際官方來源", "EUR-Lex、EU AI Office、EDPB、FTC。", "red")}
        </div>
      </div>`,
  },
  {
    chapter: "法律雷達",
    minutes: "5 分",
    title: "每天早上的資料管線",
    notes: "逐步揭露。強調原文一定先保存，摘要是衍生資料。去重可用 URL、案號與內容雜湊。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Daily pipeline</p>
        <h1>取得、保存、去重、摘要、待審</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>取得</strong><small>API / RSS / 公告頁</small></div>
          <div class="flow-step fragment"><b>02</b><strong>保存</strong><small>原文、網址、時間</small></div>
          <div class="flow-step fragment"><b>03</b><strong>去重</strong><small>URL、案號、雜湊</small></div>
          <div class="flow-step fragment"><b>04</b><strong>摘要</strong><small>律師版、客戶版</small></div>
          <div class="flow-step fragment"><b>05</b><strong>待審</strong><small>不直接對外送出</small></div>
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "法律雷達",
    minutes: "4 分",
    title: "每一則摘要都要能回到來源",
    notes: "AI 產生的是閱讀輔助，不是新的法律依據。展示 sourceUrl、publishedAt、fetchedAt、hash、reviewStatus。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Traceability</p>
        <h1>摘要可以短，證據鏈不能斷。</h1>
        <table class="table">
          <thead><tr><th>欄位</th><th>用途</th><th>範例</th></tr></thead>
          <tbody>
            <tr class="fragment"><td>sourceUrl</td><td>回到官方原文</td><td>law.moj.gov.tw/…</td></tr>
            <tr class="fragment"><td>publishedAt / fetchedAt</td><td>分辨發布與抓取時間</td><td>2026-06-24 08:00</td></tr>
            <tr class="fragment"><td>contentHash</td><td>去重與版本比較</td><td>4e9a…c821</td></tr>
            <tr class="fragment"><td>reviewStatus</td><td>防止未審內容送出</td><td class="warning">pending</td></tr>
          </tbody>
        </table>
      </div>`,
  },
  {
    chapter: "法律雷達",
    minutes: "6 分",
    title: "操作：每日法律雷達",
    notes: "點擊開啟 Demo。建議操作順序：高風險篩選 → 選一則來源 → 律師確認 → 產生 LINE 摘要。明說目前資料是模擬，下一階段才接官方來源。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Live demo 01</p>
        <h1>AI 先找、先讀、先整理；律師決定是否採用。</h1>
        <p class="lead">展示高風險篩選、來源紀錄、律師確認與 LINE 摘要草稿。</p>
        <p><button class="demo-button" data-open-demo="radar">開啟法律雷達工作台</button></p>
      </div>`,
  },
  {
    chapter: "身分分流",
    minutes: "1 分",
    title: "案例二：LINE 身分與排程",
    notes: "播放短串場。下一頁先用藍鴨4號證明這個模式已經做過，再映射到法律服務。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("transition-identity.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放串場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "身分分流",
    minutes: "4 分",
    title: "藍鴨4號已經驗證的模式",
    notes: "註冊學生只能讀自己的上課紀錄；訪客只看一般課程資訊；管理員可以人工核准。重點不是 bot，而是身份決定資料邊界。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Blue Duck 4</p>
        <h1>先知道「你是誰」，才能決定「你可以看什麼」。</h1>
        <div class="identity-map">
          <div>
            <div class="identity-person active fragment"><h3>已註冊學生</h3><p>讀取自己的課程紀錄</p></div>
            <div class="identity-person fragment"><h3>未註冊訪客</h3><p>只回答公開課程資訊</p></div>
          </div>
          <div class="identity-output fragment"><h2>同一個 Agent，不同資料範圍</h2><ul><li>身分與權限先判斷</li><li>個人紀錄不跨使用者</li><li>不確定時回到一般資訊</li><li>升級權限需要人工核准</li></ul></div>
        </div>
      </div>`,
  },
  {
    chapter: "身分分流",
    minutes: "5 分",
    title: "映射到法律事務所",
    notes: "逐步揭露四個角色。客戶只能看自己案件；訪客不能碰個案；秘書看到行政卡；律師看到判斷事項。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Role-based access</p>
        <h1>同一句「幫我查一下」，四種身分有四種答案。</h1>
        <div class="grid-4">
          ${card("客戶", "自己的案件", "預約資訊、待補資料與已核准更新。", "green")}
          ${card("訪客", "一般資訊", "服務範圍、預約方式與身分驗證。", "blue")}
          ${card("秘書", "行政待辦", "預約確認、收件與通知草稿。", "amber")}
          ${card("律師", "專業判斷", "法律摘要、案件決策與核准事項。", "red")}
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "身分分流",
    minutes: "5 分",
    title: "預約不是自動承諾",
    notes: "Agent 可整理需求與候選時段，但秘書核准後才建立日曆。問現場：哪些預約必須先看資料？",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Scheduling guardrail</p>
        <h1>候選時間可以自動，正式承諾不能自動。</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>收到訊息</strong><small>LINE 自然語言</small></div>
          <div class="flow-step fragment"><b>02</b><strong>辨識案件</strong><small>客戶與需求類型</small></div>
          <div class="flow-step fragment"><b>03</b><strong>查詢時段</strong><small>提出 2–3 個候選</small></div>
          <div class="flow-step fragment"><b>04</b><strong>秘書核准</strong><small>資料與律師狀態</small></div>
          <div class="flow-step fragment"><b>05</b><strong>正式建立</strong><small>回覆與行事曆</small></div>
        </div>
      </div>`,
  },
  {
    chapter: "身分分流",
    minutes: "6 分",
    title: "操作：LINE 身分與排程",
    notes: "依序切換林先生、訪客、陳秘書。最後核准預約，回到客戶視角看確認訊息。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Live demo 02</p>
        <h1>切換身分，看見資料隔離與人工確認。</h1>
        <p class="lead">展示已識別客戶、未識別訪客、秘書確認卡與正式建立預約。</p>
        <p><button class="demo-button" data-open-demo="line">開啟 LINE 排程工作台</button></p>
      </div>`,
  },
  {
    chapter: "工時帳單",
    minutes: "1 分",
    title: "案例三：Time Record 到帳單",
    notes: "播放短串場。提醒觀眾：原始需求的第一步是計算服務時數，不是直接產生帳單。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("transition-billing.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放串場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "工時帳單",
    minutes: "4 分",
    title: "原始資料看起來很正常",
    notes: "先讓大家看表格，再逐步揭露三個問題：電話描述太短、單筆 3.5 小時、內部格式調整不請款。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Time records</p>
        <h1>問題通常不在計算，而在紀錄品質。</h1>
        <table class="table">
          <thead><tr><th>律師</th><th>內容</th><th>時數</th><th>狀態</th></tr></thead>
          <tbody>
            <tr><td>周律師</td><td>審閱 AI 供應商主約</td><td>1.5h</td><td class="ok">正常</td></tr>
            <tr class="fragment"><td>林律師</td><td class="warning">電話</td><td>0.8h</td><td class="warning">描述過短</td></tr>
            <tr class="fragment"><td>周律師</td><td>合約談判策略會議</td><td class="warning">3.5h</td><td class="warning">需確認</td></tr>
            <tr class="fragment"><td>王律師</td><td>內部格式調整</td><td>1.0h</td><td class="warning">不請款</td></tr>
          </tbody>
        </table>
      </div>`,
  },
  {
    chapter: "工時帳單",
    minutes: "5 分",
    title: "先算服務時數，再進帳單",
    notes: "這一頁回應使用者先前提醒。服務時數報告是獨立的人工確認關卡，不應被帳單自動化吞掉。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Hours before invoices</p>
        <h1>時數確認，是帳單之前的一道門。</h1>
        <div class="flow">
          <div class="flow-step fragment"><b>01</b><strong>抓取紀錄</strong><small>律師與案件</small></div>
          <div class="flow-step fragment"><b>02</b><strong>依律師彙整</strong><small>總時數與可請款</small></div>
          <div class="flow-step fragment"><b>03</b><strong>依案件彙整</strong><small>客戶與 matter</small></div>
          <div class="flow-step fragment"><b>04</b><strong>異常補正</strong><small>描述、時數、不請款</small></div>
          <div class="flow-step fragment"><b>05</b><strong>人工確認</strong><small>才套用費率</small></div>
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "工時帳單",
    minutes: "6 分",
    title: "操作：服務時數",
    notes: "開啟 Demo 後先看總時數 10 小時、可請款 9 小時。依序補正『電話』、確認 3.5 小時、確認不請款。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Live demo 03A</p>
        <h1>讓異常被看見，而不是讓 AI 悄悄改掉。</h1>
        <p class="lead">展示依律師／案件彙整、描述補正、單筆過長與不請款確認。</p>
        <p><button class="demo-button" data-open-demo="hours">開啟服務時數工作台</button></p>
      </div>`,
  },
  {
    chapter: "工時帳單",
    minutes: "4 分",
    title: "帳單自動化的四條紅線",
    notes: "強調 AI 不自行認定 billable、不自行折讓、不自行寄出、不自行回填付款。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Billing guardrails</p>
        <h1>帳單可以自動草擬，責任不能自動轉移。</h1>
        <div class="grid-4">
          ${card("01", "可請款性", "不可由模型自行認定。", "red")}
          ${card("02", "折讓與重工", "需主持律師確認。", "amber")}
          ${card("03", "Email 寄送", "核准後才交由秘書送出。", "blue")}
          ${card("04", "付款狀態", "只能由會計確認回填。", "green")}
        </div>
      </div>`,
  },
  {
    chapter: "工時帳單",
    minutes: "5 分",
    title: "操作：帳單草稿",
    notes: "若前一頁沒有補正，核准按鈕應停用；補正後才可核准。展示人工關卡確實影響下一步。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Live demo 03B</p>
        <h1>前一步沒有確認，後一步就不能繼續。</h1>
        <p class="lead">展示費率計算、帳單草稿、警示與律師核准；不連接真實 Email 或會計系統。</p>
        <p><button class="demo-button" data-open-demo="billing">開啟帳單草稿工作台</button></p>
      </div>`,
  },
  {
    chapter: "導入",
    minutes: "1 分",
    title: "從 Demo 到第一個內部流程",
    notes: "播放最後一支串場。下一頁進入 30 天路線。",
    html: `
      <div class="video-frame">
        <video data-transition-video src="${video("transition-rollout.mp4")}" preload="metadata"></video>
        <div class="video-controls"><button data-play-video>播放串場</button></div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "導入",
    minutes: "6 分",
    title: "30 天導入路線",
    notes: "不是三個案例同時上線。先做公開資料的法律雷達，再做身分與排程，最後才碰工時與帳單。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">30-day rollout</p>
        <h1>先從低風險、可審核、容易有感的流程開始。</h1>
        <div class="roadmap">
          <div class="week fragment"><span>Week 1</span><strong>盤點流程</strong><ul><li>選一條流程</li><li>列出資料來源</li><li>標記人工確認點</li><li>定義成功指標</li></ul></div>
          <div class="week fragment"><span>Week 2</span><strong>法律雷達</strong><ul><li>官方來源白名單</li><li>抓取與去重</li><li>摘要草稿</li><li>律師審核</li></ul></div>
          <div class="week fragment"><span>Week 3</span><strong>LINE 排程</strong><ul><li>身分分流</li><li>候選時間</li><li>秘書確認卡</li><li>行事曆草稿</li></ul></div>
          <div class="week fragment"><span>Week 4</span><strong>工時帳單</strong><ul><li>時數彙整</li><li>異常規則</li><li>帳單草稿</li><li>寄送邊界</li></ul></div>
        </div>
      </div>`,
  },
  {
    chapter: "導入",
    minutes: "5 分",
    title: "Demo 與正式系統差在哪？",
    notes: "講清楚正式導入需要資料庫、權限、稽核、備援。Codex／CLI 適合建置與演示，不是長期排程器。",
    html: `
      <div class="slide-content centered dark">
        <p class="kicker">Architecture choices</p>
        <h1>CLI 證明流程可行，正式系統負責每天可靠運作。</h1>
        <div class="comparison">
          <div class="comparison-block fragment"><h2>講座 Demo</h2><ul><li>JSON 模擬資料</li><li>Codex / CLI 手動觸發</li><li>瀏覽器記憶體狀態</li><li>不接真實外部服務</li></ul></div>
          <div class="versus">→</div>
          <div class="comparison-block accent fragment"><h2>正式導入</h2><ul><li>資料庫與加密</li><li>排程器與錯誤重試</li><li>角色權限與稽核紀錄</li><li>核准後才連 LINE / Email</li></ul></div>
        </div>
      </div>`,
    className: "dark",
  },
  {
    chapter: "導入",
    minutes: "5 分",
    title: "你要從哪條路開始？",
    notes: "低壓地帶到後續選項。不要硬銷，讓聽眾依成熟度選擇。",
    html: `
      <div class="slide-content centered">
        <p class="kicker">Next step</p>
        <h1>不是每間事務所，都需要同一種導入方式。</h1>
        <div class="choice-row">
          <div class="choice fragment"><span class="card-number">自己做</span><strong>實作工作坊</strong><p>把今天的模擬資料與流程改成自己的版本，學會用 Codex 與 CLI 建置。</p></div>
          <div class="choice fragment"><span class="card-number">先釐清</span><strong>顧問盤點</strong><p>盤點一條工作流、資料來源、風險邊界與 30 天試作範圍。</p></div>
          <div class="choice fragment"><span class="card-number">已有系統</span><strong>內部導入</strong><p>串接現有案件、排程或會計系統，建立權限、審核與維運機制。</p></div>
        </div>
      </div>`,
  },
  {
    chapter: "收尾",
    minutes: "3 分",
    title: "AI 先整理，人再決定",
    notes: "回到開場的責任與信任。請大家帶走一件事：先挑一個步驟，不要一次自動化整份專業工作。",
    html: `
      <img class="slide-bg" src="${asset("legal-team-review.png")}" alt="">
      <div class="slide-content hero-copy">
        <p class="kicker">The principle</p>
        <h1>可信來源先進來，<br>AI 先整理，<br>人再決定。</h1>
        <div class="principles"><span>來源可追溯</span><span>內容可重跑</span><span>動作可審核</span></div>
      </div>`,
    className: "image-slide",
  },
];

let index = Math.max(0, Math.min(slides.length - 1, Number(location.hash.slice(1)) - 1 || 0));
let fragmentIndex = 0;
let startedAt = Date.now();
let clockTimer;
const showAllFragments = new URLSearchParams(location.search).get("all") === "1";

const slideEl = document.querySelector("#slide");
const stage = document.querySelector("#stage");
const progressBar = document.querySelector("#progress-bar");
const chapterLabel = document.querySelector("#chapter-label");
const currentSlide = document.querySelector("#current-slide");
const totalSlides = document.querySelector("#total-slides");
const notesPanel = document.querySelector("#notes-panel");
const notesTitle = document.querySelector("#notes-title");
const notesCopy = document.querySelector("#notes-copy");
const suggestedTime = document.querySelector("#suggested-time");
const elapsedTime = document.querySelector("#elapsed-time");
const nextTitle = document.querySelector("#next-title");
const tocDialog = document.querySelector("#toc-dialog");
const tocList = document.querySelector("#toc-list");
const demoOverlay = document.querySelector("#demo-overlay");
const demoFrame = document.querySelector("#demo-frame");
const demoLabel = document.querySelector("#demo-label");

totalSlides.textContent = slides.length;

function resizeStage() {
  const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
  stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function bindSlideActions() {
  document.querySelectorAll("[data-play-video]").forEach((button) => {
    button.addEventListener("click", async () => {
      const player = slideEl.querySelector("[data-transition-video]");
      if (!player) return;
      player.currentTime = 0;
      await player.play();
      button.textContent = "重新播放";
    });
  });
  document.querySelectorAll("[data-open-demo]").forEach((button) => {
    button.addEventListener("click", () => openDemo(button.dataset.openDemo));
  });
}

function render() {
  const item = slides[index];
  slideEl.className = `slide ${item.className || ""}`;
  slideEl.innerHTML = item.html;
  fragmentIndex = 0;
  chapterLabel.textContent = item.chapter;
  currentSlide.textContent = index + 1;
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  notesTitle.textContent = item.title;
  notesCopy.textContent = item.notes;
  suggestedTime.textContent = item.minutes;
  nextTitle.textContent = slides[index + 1]?.title || "講座結束";
  location.hash = String(index + 1);
  bindSlideActions();
  if (showAllFragments) {
    const items = fragments();
    items.forEach((fragment) => fragment.classList.add("visible"));
    fragmentIndex = items.length;
  }
}

function fragments() {
  return [...slideEl.querySelectorAll(".fragment")];
}

function next() {
  const items = fragments();
  if (fragmentIndex < items.length) {
    items[fragmentIndex].classList.add("visible");
    fragmentIndex += 1;
    return;
  }
  if (index < slides.length - 1) {
    index += 1;
    render();
  }
}

function previous() {
  if (fragmentIndex > 0) {
    fragmentIndex -= 1;
    fragments()[fragmentIndex]?.classList.remove("visible");
    return;
  }
  if (index > 0) {
    index -= 1;
    render();
    const items = fragments();
    items.forEach((item) => item.classList.add("visible"));
    fragmentIndex = items.length;
  }
}

function openDemo(view) {
  const labels = { radar: "每日法律雷達", line: "LINE 身分與排程", hours: "服務時數", billing: "帳單草稿" };
  demoLabel.textContent = labels[view] || "";
  demoFrame.src = `../?view=${view}`;
  demoOverlay.classList.add("open");
  demoOverlay.setAttribute("aria-hidden", "false");
}

function closeDemo() {
  demoOverlay.classList.remove("open");
  demoOverlay.setAttribute("aria-hidden", "true");
  demoFrame.src = "";
}

function buildToc() {
  tocList.innerHTML = slides.map((slide, slideIndex) => `
    <button class="toc-item" data-slide="${slideIndex}">
      <span>${String(slideIndex + 1).padStart(2, "0")}</span>
      <strong>${slide.title}</strong>
      <small>${slide.chapter}</small>
    </button>`).join("");
  tocList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-slide]");
    if (!button) return;
    index = Number(button.dataset.slide);
    tocDialog.close();
    render();
  });
}

document.querySelector("#next-button").addEventListener("click", next);
document.querySelector("#prev-button").addEventListener("click", previous);
document.querySelector("#toc-button").addEventListener("click", () => tocDialog.showModal());
document.querySelector("#toc-close").addEventListener("click", () => tocDialog.close());
document.querySelector("#notes-button").addEventListener("click", () => {
  notesPanel.classList.toggle("open");
  notesPanel.setAttribute("aria-hidden", notesPanel.classList.contains("open") ? "false" : "true");
});
document.querySelector("#notes-close").addEventListener("click", () => {
  notesPanel.classList.remove("open");
  notesPanel.setAttribute("aria-hidden", "true");
});
document.querySelector("#fullscreen-button").addEventListener("click", async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await document.documentElement.requestFullscreen();
});
document.querySelector("#demo-close").addEventListener("click", closeDemo);

window.addEventListener("keydown", (event) => {
  if (demoOverlay.classList.contains("open")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDemo();
    }
    return;
  }
  if (tocDialog.open) return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    next();
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    previous();
  }
  if (event.key.toLowerCase() === "p") document.querySelector("#notes-button").click();
  if (event.key.toLowerCase() === "f") document.querySelector("#fullscreen-button").click();
  if (event.key.toLowerCase() === "o") tocDialog.showModal();
});

window.addEventListener("resize", resizeStage);
window.addEventListener("hashchange", () => {
  const target = Number(location.hash.slice(1)) - 1;
  if (Number.isInteger(target) && target !== index && target >= 0 && target < slides.length) {
    index = target;
    render();
  }
});

clockTimer = window.setInterval(() => {
  const elapsed = formatTime(Date.now() - startedAt);
  document.querySelector("#clock").textContent = elapsed;
  elapsedTime.textContent = elapsed;
}, 1000);

buildToc();
resizeStage();
render();
