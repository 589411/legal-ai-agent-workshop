const slides = [
  {
    section: "開場",
    minutes: "3 分",
    title: "小型法律事務所上雲說明",
    className: "hero",
    notes:
      "開場先把焦點放在所長的真問題：不是追流行，也不是買工具，而是用小團隊可負擔的方式保護案件資料、客戶機密與工作效率。",
    html: `
      <p class="kicker">Google Workspace × 法律事務所 × 合規治理</p>
      <h1>小型法律事務所<br>可以怎麼上雲？</h1>
      <p class="lead">以 Business Plus 作為起點，把信箱、案件文件、行事曆、留存、權限與離職回收整理成一套可執行的工作環境。</p>
      <div class="meta-row"><span class="pill">給所長與行政決策者</span><span class="pill">15-30 分鐘說明版</span><span class="pill">可接工作坊實作</span></div>`,
  },
  {
    section: "問題定義",
    minutes: "2 分",
    title: "結論先講",
    notes:
      "這一頁先給判斷。小型律所通常不是被資安法或公會准駁直接卡住，而是要把個資、委外、保密、留存與權限控管補齊。講法要避免說成律師公會禁止或允許上雲。",
    html: `
      <p class="kicker">Decision</p>
      <div class="quote">一般小型民間律所，多半可以上雲；重點不是能不能用，而是能不能管得住。</div>
      <p class="lead">比較合理的說法是：在遵守律師保密義務與個資法的前提下，律所自行選擇雲端服務，並負責做到合理安全措施。</p>`,
  },
  {
    section: "問題定義",
    minutes: "3 分",
    title: "小型律所真正擔心什麼",
    notes:
      "不要從產品功能表開始。先把律所每天會碰到的資料風險講出來，讓後面每個設定都有理由。",
    html: `
      <p class="kicker">Risk map</p>
      <h1>風險不是雲端本身，而是資料失控。</h1>
      <div class="grid-4">
        <article class="card"><b>01</b><h3>案件資料</h3><p>散在個人 Gmail、私人硬碟、USB、手機相簿。</p></article>
        <article class="card"><b>02</b><h3>當事人個資</h3><p>身分證、財務、健康、家庭關係與聯絡紀錄。</p></article>
        <article class="card"><b>03</b><h3>證據文件</h3><p>版本難追、誤刪難救、交接時找不到來源。</p></article>
        <article class="card"><b>04</b><h3>客戶機密</h3><p>外部分享、離職未回收、帳號共用造成風險。</p></article>
      </div>`,
  },
  {
    section: "合規觀念",
    minutes: "4 分",
    title: "先確認資安法，再回到律所義務",
    notes:
      "資通安全管理法主要看是否為公務機關或特定非公務機關。一般民間小型律所通常不是直接納管對象，但仍受個資、契約、保密與職業倫理約束。若有人問律師公會有沒有禁止，較穩的回答是：不是公會准不准，而是律所能否證明自己做了合理安全措施。",
    html: `
      <p class="kicker">Compliance scope</p>
      <h1>資安法不是唯一問題。</h1>
      <div class="grid-2">
        <article class="card"><b>可能直接納管</b><h3>公務機關、特定非公務機關</h3><p>若承接政府專案、受政府控制，或服務特定受管制產業，需另查主管機關規範與委外要求。</p></article>
        <article class="card"><b>多數小型民間律所</b><h3>核心仍是保密與個資治理</h3><p>不是「律師公會禁止或允許上雲」，而是律所自行選擇工具，並對保密、個資與合理安全措施負責。</p></article>
      </div>
      <p class="source-note">工作假設：本簡報針對一般小型私人律師事務所；若涉及政府、金融、醫療、跨境或特別敏感案件，應另做專案評估。</p>`,
  },
  {
    section: "推薦方案",
    minutes: "4 分",
    title: "推薦起點：Business Plus",
    notes:
      "Google 官方功能頁目前列出 Plus 具備 5TB、eDiscovery、Vault、進階端點管理與加強安全管理。DLP、Context-aware access、資料區域等則屬 Enterprise 重點。",
    html: `
      <p class="kicker">Recommended plan</p>
      <h1>Business Plus 先把律所底座補齊。</h1>
      <div class="grid-3">
        <article class="card"><b>Vault</b><h3>留存與 eDiscovery</h3><p>支援信件與文件保留、搜尋、匯出，以及重大案件的訴訟保留。</p></article>
        <article class="card"><b>Admin</b><h3>帳號與裝置治理</h3><p>管理員角色、端點管理、停用帳號、撤銷裝置登入與稽核查詢。</p></article>
        <article class="card"><b>Drive</b><h3>案件文件集中</h3><p>以共用雲端硬碟承載案件資料，避免文件散落在個人帳號。</p></article>
      </div>
      <p class="source-note">依 Google Workspace 官方價格頁，Plus 包含 Vault、eDiscovery、5TB 儲存與進階端點管理；Enterprise 另列 DLP、Context-aware access、資料區域與更高階控管。</p>`,
  },
  {
    section: "推薦方案",
    minutes: "4 分",
    title: "版本選擇表",
    notes:
      "這張表的目的不是精算價格，而是幫小所判斷：Starter/Standard 可以當一般辦公工具，但若要把律所治理做到位，Plus 比較像最低合理標準。",
    html: `
      <p class="kicker">Plan comparison</p>
      <h1>小型律所不要只買信箱。</h1>
      <div class="matrix" role="table" aria-label="Google Workspace 版本比較">
        <div class="head">需求</div><div class="head">Starter</div><div class="head">Standard</div><div class="head">Plus</div><div class="head">Enterprise</div>
        <div>企業信箱與基本管理</div><div class="yes">可</div><div class="yes">可</div><div class="yes">可</div><div class="yes">可</div>
        <div>案件文件集中</div><div class="warn">有限</div><div class="yes">可</div><div class="yes">可</div><div class="yes">可</div>
        <div>Vault / 留存 / eDiscovery</div><div>不足</div><div>不足</div><div class="yes">建議</div><div class="yes">完整</div>
        <div>進階端點管理</div><div>不足</div><div>不足</div><div class="yes">可</div><div class="yes">更完整</div>
        <div>DLP / 資料區域 / 情境存取</div><div>不足</div><div>不足</div><div class="warn">有限</div><div class="yes">適合高敏感案件</div>
      </div>`,
  },
  {
    section: "導入架構",
    minutes: "5 分",
    title: "小所最小可行架構",
    notes:
      "這頁是核心架構圖。用三層講：人與帳號、案件資料、保留稽核。小所不要先做複雜系統，要先讓每份資料有家、有權限、有留存。",
    html: `
      <p class="kicker">Minimum viable cloud office</p>
      <h1>三層架構：帳號、案件、留存。</h1>
      <div class="diagram">
        <section class="lane"><strong>身分與帳號</strong><div class="node">自有網域信箱</div><div class="node">MFA / 2SV</div><div class="node">管理員分權</div><div class="node">離職即停用</div></section>
        <section class="lane"><strong>案件工作區</strong><div class="node blue">共用雲端硬碟</div><div class="node blue">案件群組權限</div><div class="node blue">外部分享白名單</div><div class="node blue">共享日曆與期限</div></section>
        <section class="lane"><strong>治理與證據</strong><div class="node gold">Vault 保留規則</div><div class="node gold">重大案件 Legal Hold</div><div class="node gold">稽核與調查紀錄</div><div class="node gold">事件通報流程</div></section>
      </div>`,
  },
  {
    section: "導入架構",
    minutes: "4 分",
    title: "資料分類先做四層",
    notes:
      "把資料分級講得簡單，不要變成 ISO 課。目標是讓律師與助理知道什麼能分享、什麼要限制、什麼需要律師核准。",
    html: `
      <p class="kicker">Data classification</p>
      <h1>分類越簡單，越容易落地。</h1>
      <div class="grid-4">
        <article class="card"><b>公開</b><h3>可公開取得</h3><p>法規、判決、主管機關公告、公開文章。</p></article>
        <article class="card"><b>內部</b><h3>所內作業</h3><p>範本、流程、會議紀錄、行政文件。</p></article>
        <article class="card"><b>機密</b><h3>案件與客戶</h3><p>當事人資料、證據、未公開契約、法律意見草稿。</p></article>
        <article class="card"><b>高度敏感</b><h3>需特別控管</h3><p>訴訟策略、健康財務資料、密碼、金流與重大商業秘密。</p></article>
      </div>`,
  },
  {
    section: "必做設定",
    minutes: "5 分",
    title: "六個必做設定",
    notes:
      "這頁可現場互動。請聽眾心中檢查自己事務所有沒有做。按每個項目可以打勾。",
    html: `
      <p class="kicker">Interactive checklist</p>
      <h1>上雲不是買完就結束。</h1>
      <div class="checklist" data-checklist>
        <button class="check-item"><i>✓</i><span><strong>所有帳號強制 MFA</strong><small>尤其管理員帳號，不用簡訊當唯一方式。</small></span></button>
        <button class="check-item"><i>✓</i><span><strong>案件使用共用雲端硬碟</strong><small>不要放在個人 My Drive 或私人 Gmail。</small></span></button>
        <button class="check-item"><i>✓</i><span><strong>啟用 Vault 保留</strong><small>Gmail、Drive、Chat/Meet 視需要納入。</small></span></button>
        <button class="check-item"><i>✓</i><span><strong>限制外部分享與下載</strong><small>用指定人員、白名單網域與律師核准。</small></span></button>
        <button class="check-item"><i>✓</i><span><strong>建立離職回收流程</strong><small>停用帳號、轉移文件、撤銷裝置與保留資料。</small></span></button>
        <button class="check-item"><i>✓</i><span><strong>寫成一頁內規</strong><small>個資、委外、留存、事件通報和 AI 使用邊界。</small></span></button>
      </div>`,
  },
  {
    section: "必做設定",
    minutes: "4 分",
    title: "外部分享的預設規則",
    notes:
      "小所常見事故是分享連結太鬆。把外部分享設計成例外而不是預設，能快速降低風險。",
    html: `
      <p class="kicker">Sharing policy</p>
      <h1>外部分享要像開庭一樣有紀錄。</h1>
      <div class="grid-3">
        <article class="card"><b>原則</b><h3>不分享整個案件硬碟</h3><p>對外只分享單一文件或資料夾，避免客戶看見無關資料。</p></article>
        <article class="card"><b>方式</b><h3>指定人員優先</h3><p>少用「知道連結的任何人」。必要時限制下載、列印與複製。</p></article>
        <article class="card"><b>紀錄</b><h3>誰核准、何時分享</h3><p>重大資料對外前由承辦律師確認，事後可查存取紀錄。</p></article>
      </div>`,
  },
  {
    section: "Vault",
    minutes: "5 分",
    title: "Vault 不是備份，而是治理工具",
    notes:
      "提醒：Vault 的定位是保留、搜尋、匯出與 legal hold，不要把它講成完整備份。若要災難復原或誤刪保護，仍可另評估第三方備份。",
    html: `
      <p class="kicker">Retention and eDiscovery</p>
      <h1>Vault 解決的是「保留、搜尋、匯出、訴訟保留」。</h1>
      <div class="grid-2">
        <article class="card"><b>適合</b><h3>法律保存與稽核</h3><ul><li>信件與文件保留年限</li><li>重大案件 Legal Hold</li><li>搜尋與匯出供內部調查</li></ul></article>
        <article class="card"><b>不要誤解</b><h3>它不等於完整備份</h3><ul><li>不取代權限設計</li><li>不取代版本管理教育</li><li>不取代必要時的第三方備份策略</li></ul></article>
      </div>`,
  },
  {
    section: "文件制度",
    minutes: "4 分",
    title: "三份文件就能開始",
    notes:
      "小所不要一開始寫一大本政策。先做可以真的用的三份一頁文件，讓人看得懂，也能持續更新。內部規章與委任契約可以明示：事務所會使用經評估合格的雲端服務，並依加密、權限、保留刪除與事件通報標準處理。",
    html: `
      <p class="kicker">Policy pack</p>
      <h1>制度要短，才會被使用。</h1>
      <div class="grid-3">
        <article class="card"><b>01</b><h3>個資與雲端使用政策</h3><p>資料類型、能否上雲、保存多久、何時刪除。</p></article>
        <article class="card"><b>02</b><h3>委外與契約揭露</h3><p>明示使用經評估合格之雲端服務，並審查資料處理、保密、事件通報、刪除返還與子處理者。</p></article>
        <article class="card"><b>03</b><h3>帳號與事件流程</h3><p>開帳號、調權限、離職回收、誤寄誤分享通報。</p></article>
      </div>`,
  },
  {
    section: "導入計畫",
    minutes: "5 分",
    title: "90 天導入路線",
    notes:
      "這頁是工作坊或顧問服務的自然入口。先讓聽眾看到事情可以分階段完成，不必一次變成大型 IT 專案。",
    html: `
      <p class="kicker">Implementation roadmap</p>
      <h1>不要大搬家，分階段上線。</h1>
      <div class="tabbar" data-tabs>
        <button data-tab="0" class="active">第 1-2 週</button>
        <button data-tab="1">第 3-4 週</button>
        <button data-tab="2">第 2 個月</button>
        <button data-tab="3">第 3 個月</button>
      </div>
      <section class="tab-panel" id="tab-panel"></section>`,
  },
  {
    section: "導入計畫",
    minutes: "4 分",
    title: "小所角色分工",
    notes:
      "小所人少，角色可兼任，但責任要分清楚。超級管理員不要拿來做日常操作，這點要特別提醒。",
    html: `
      <p class="kicker">Operating model</p>
      <h1>人可以少，權限不能亂。</h1>
      <div class="grid-4">
        <article class="card"><b>所長 / 合夥人</b><h3>政策負責</h3><p>決定資料分類、對外分享原則與重大例外。</p></article>
        <article class="card"><b>主要管理員</b><h3>日常管理</h3><p>帳號、群組、共用硬碟、基本安全設定。</p></article>
        <article class="card"><b>Vault 管理員</b><h3>留存與調閱</h3><p>保留規則、Legal Hold、匯出與調查紀錄。</p></article>
        <article class="card"><b>全體同仁</b><h3>使用責任</h3><p>不使用個人帳號、不私下轉存、發現問題即通報。</p></article>
      </div>`,
  },
  {
    section: "AI 邊界",
    minutes: "4 分",
    title: "上雲後，再談 AI",
    notes:
      "呼應主講座。AI 可以協助草擬、摘要、整理，但不能取代律師判斷，也不應在未分級資料上隨意啟用。",
    className: "dark",
    html: `
      <p class="kicker">Cloud first, AI second</p>
      <h1>沒有資料治理，就不要急著自動化。</h1>
      <div class="grid-3">
        <article class="card"><b>可以先做</b><h3>低風險輔助</h3><p>公開資料摘要、內部範本整理、會議紀錄草稿、格式校對。</p></article>
        <article class="card"><b>必須審核</b><h3>法律與客戶輸出</h3><p>法律意見、對外信件、案件策略與付款狀態仍由人確認。</p></article>
        <article class="card"><b>要先寫清楚</b><h3>AI 使用揭露</h3><p>委任契約或隱私聲明可揭露內部 AI 輔助的範圍與限制。</p></article>
      </div>`,
  },
  {
    section: "收束",
    minutes: "3 分",
    title: "給所長的一頁決策",
    notes:
      "最後收成三句話，並自然提到可以接工作坊或導入陪跑，但不強銷。",
    html: `
      <p class="kicker">One-page decision</p>
      <h1>小型律所上雲的判斷式</h1>
      <div class="timeline">
        <article class="phase"><span>01</span><h3>方案</h3><p class="lead">Business Plus 作為合理起點；高敏感或受管制需求再評估 Enterprise。</p></article>
        <article class="phase"><span>02</span><h3>架構</h3><p class="lead">共用雲端硬碟、MFA、管理員分權、Vault、外部分享限制。</p></article>
        <article class="phase"><span>03</span><h3>文件</h3><p class="lead">三份一頁內規：個資、委外、帳號與事件流程。</p></article>
        <article class="phase"><span>04</span><h3>下一步</h3><p class="lead">用工作坊盤點資料、完成設定、建立標準案件工作區。</p></article>
      </div>`,
  },
];

const tabData = [
  {
    title: "基礎設定",
    items: ["確認網域與帳號名單", "購買或試用 Business Plus", "建立超級管理員與備援管理員", "強制 MFA / 2SV"],
  },
  {
    title: "案件架構",
    items: ["建立群組與共用雲端硬碟", "設定外部分享限制", "建立全所行事曆與案件期限日曆", "搬移一個低風險案件做試點"],
  },
  {
    title: "留存與制度",
    items: ["設定 Vault 保留規則", "建立重大案件 Legal Hold 範本", "完成三份一頁政策文件", "完成離職回收流程演練"],
  },
  {
    title: "教育與檢討",
    items: ["全所 1-2 小時教育訓練", "檢查帳號與權限是否正確", "回顧誤分享與例外流程", "決定是否導入 AI 或進階控管"],
  },
];

let current = Number.parseInt(location.hash.replace("#", ""), 10) || 1;
current = Math.min(Math.max(current, 1), slides.length);

const stage = document.querySelector("#stage");
const progressBar = document.querySelector("#progress-bar");
const currentSlide = document.querySelector("#current-slide");
const totalSlides = document.querySelector("#total-slides");
const sectionLabel = document.querySelector("#section-label");
const notesPanel = document.querySelector("#notes-panel");
const notesTitle = document.querySelector("#notes-title");
const notesCopy = document.querySelector("#notes-copy");
const suggestedTime = document.querySelector("#suggested-time");
const tocDialog = document.querySelector("#toc-dialog");
const tocList = document.querySelector("#toc-list");
const clock = document.querySelector("#clock");

totalSlides.textContent = slides.length;

function render() {
  const slide = slides[current - 1];
  stage.innerHTML = `<article class="slide ${slide.className || ""}">${slide.html}</article>`;
  currentSlide.textContent = current;
  sectionLabel.textContent = slide.section;
  progressBar.style.width = `${(current / slides.length) * 100}%`;
  notesTitle.textContent = slide.title;
  notesCopy.textContent = slide.notes;
  suggestedTime.textContent = slide.minutes;
  location.hash = String(current);
  bindSlideInteractions();
}

function bindSlideInteractions() {
  document.querySelectorAll("[data-checklist] .check-item").forEach((item) => {
    item.addEventListener("click", () => item.classList.toggle("done"));
  });

  const tabs = document.querySelector("[data-tabs]");
  const panel = document.querySelector("#tab-panel");
  if (tabs && panel) {
    const show = (index) => {
      tabs.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.tab === String(index)));
      const phase = tabData[index];
      panel.innerHTML = `<h2>${phase.title}</h2><ul>${phase.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    };
    tabs.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => show(Number.parseInt(button.dataset.tab, 10)));
    });
    show(0);
  }
}

function next() {
  if (current < slides.length) {
    current += 1;
    render();
  }
}

function prev() {
  if (current > 1) {
    current -= 1;
    render();
  }
}

document.querySelector("#next-button").addEventListener("click", next);
document.querySelector("#prev-button").addEventListener("click", prev);
document.querySelector("#notes-button").addEventListener("click", () => notesPanel.classList.add("open"));
document.querySelector("#notes-close").addEventListener("click", () => notesPanel.classList.remove("open"));
document.querySelector("#fullscreen-button").addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") next();
  if (event.key === "ArrowLeft") prev();
  if (event.key.toLowerCase() === "p") notesPanel.classList.toggle("open");
  if (event.key.toLowerCase() === "o") tocDialog.showModal();
  if (event.key.toLowerCase() === "f") document.querySelector("#fullscreen-button").click();
});

document.querySelector("#toc-button").addEventListener("click", () => tocDialog.showModal());
document.querySelector("#toc-close").addEventListener("click", () => tocDialog.close());

tocList.innerHTML = slides
  .map(
    (slide, index) =>
      `<button data-slide="${index + 1}"><small>${String(index + 1).padStart(2, "0")} · ${slide.section}</small><strong>${slide.title}</strong></button>`,
  )
  .join("");

tocList.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    current = Number.parseInt(button.dataset.slide, 10);
    tocDialog.close();
    render();
  });
});

setInterval(() => {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("zh-TW", {hour: "2-digit", minute: "2-digit"});
}, 1000);

render();
