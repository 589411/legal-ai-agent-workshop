const DATA_FILES = [
  "appointments",
  "clients",
  "legal-updates",
  "line-users",
  "payments",
  "rates",
  "time-records",
];

const data = Object.fromEntries(
  await Promise.all(
    DATA_FILES.map(async (name) => {
      const response = await fetch(`/data/${name}.json`);
      if (!response.ok) throw new Error(`無法讀取 ${name}.json`);
      return [name, await response.json()];
    }),
  ),
);

const state = {
  view: "overview",
  radarFilter: "all",
  role: "client",
  appointmentApproved: false,
  approvedRadar: new Set(),
  fixedEntries: new Set(),
  approvedInvoices: new Set(),
};

const app = document.querySelector("#app-content");
const toast = document.querySelector("#toast");
const money = (value) => new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
}).format(value);

function clientById(id) {
  return data.clients.clients.find((client) => client.id === id);
}

function matterById(clientId, matterId) {
  return clientById(clientId)?.matters.find((matter) => matter.id === matterId);
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function pageHead(eyebrow, title, subtitle) {
  return `
    <header class="page-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
      <div class="date-block">
        <strong>2026.06.24</strong>
        <span>星期三 · 台北</span>
      </div>
    </header>
  `;
}

function overviewView() {
  const billableHours = data["time-records"].records
    .filter((entry) => entry.billable)
    .reduce((sum, entry) => sum + entry.hours, 0);
  return `
    ${pageHead("Firm Operations", "今日工作總覽", "把分散的資訊、對話與紀錄，整理成可以確認的工作。")}
    <section class="metric-grid">
      <div class="metric"><span>待審法律更新</span><strong>${data["legal-updates"].items.filter((item) => item.needsReview).length}</strong><small class="warn">2 則高風險</small></div>
      <div class="metric"><span>待確認預約</span><strong>${state.appointmentApproved ? 0 : 1}</strong><small>${state.appointmentApproved ? "已建立行事曆" : "等待秘書核准"}</small></div>
      <div class="metric"><span>本月可請款時數</span><strong>${billableHours.toFixed(1)}h</strong><small class="warn">${Math.max(0, 3 - state.fixedEntries.size)} 項需確認</small></div>
      <div class="metric"><span>帳單草稿</span><strong>2</strong><small>尚未對外寄送</small></div>
    </section>

    <div class="section-title"><h2>一條可稽核的工作流</h2><span>每一步都有人工確認點</span></div>
    <section class="workflow">
      <div class="flow-step"><span class="step-number">01 · 輸入</span><strong>蒐集資料</strong><p>來源、LINE 訊息、Time Record 進入工作台。</p></div>
      <div class="flow-step"><span class="step-number">02 · 整理</span><strong>AI 分類摘要</strong><p>去重、辨識身分、彙整時數、找出異常。</p></div>
      <div class="flow-step"><span class="step-number">03 · 草稿</span><strong>產生待辦</strong><p>候選時間、法律摘要與帳單都先是草稿。</p></div>
      <div class="flow-step"><span class="step-number">04 · 決定</span><strong>專業人員確認</strong><p>律師、秘書或會計依權限核准與補正。</p></div>
      <div class="flow-step"><span class="step-number">05 · 行動</span><strong>送出並留痕</strong><p>確認後才通知客戶、建立日曆或寄送帳單。</p></div>
    </section>

    <div class="section-title"><h2>今日提醒</h2></div>
    <div class="notice">
      <strong>!</strong>
      <div><strong>保密義務不因使用 AI 而改變</strong><p>這套展示只使用模擬資料。真實導入時，需先決定資料可否進入工具、誰能看到，以及哪些動作一定要人工核准。</p></div>
    </div>
  `;
}

function radarView() {
  const items = data["legal-updates"].items.filter((item) => {
    if (state.radarFilter === "high") return item.riskLevel === "high";
    if (state.radarFilter === "review") return item.needsReview;
    return true;
  });
  return `
    ${pageHead("Daily Briefing", "每日法律雷達", "像每日靈糧一樣建立固定節奏：每天整理、閱讀、確認，再決定是否分享。")}
    <div class="toolbar">
      <div class="segmented" data-control="radar-filter">
        <button class="segment ${state.radarFilter === "all" ? "active" : ""}" data-filter="all">全部 4</button>
        <button class="segment ${state.radarFilter === "high" ? "active" : ""}" data-filter="high">高風險 2</button>
        <button class="segment ${state.radarFilter === "review" ? "active" : ""}" data-filter="review">待確認 3</button>
      </div>
      <button class="secondary" data-action="line-summary">產生 LINE 摘要</button>
    </div>
    <section class="radar-list">
      ${items.map((item) => `
        <article class="radar-row">
          <div class="risk-bar ${item.riskLevel}"></div>
          <div>
            <h3>${item.title}</h3>
            <span class="meta">${item.category} · ${item.sourceType} · ${item.sourceDate}</span>
          </div>
          <p class="radar-summary">${item.lawyerSummary}</p>
          <div class="row-actions">
            <span class="tag ${item.riskLevel}">${item.riskLevel === "high" ? "高風險" : "中風險"}</span>
            <div style="height:8px"></div>
            <button class="${state.approvedRadar.has(item.id) ? "secondary" : "primary"}" data-action="approve-radar" data-id="${item.id}">
              ${state.approvedRadar.has(item.id) ? "已確認" : "律師確認"}
            </button>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function conversation(role) {
  if (role === "guest") {
    return `
      <div class="bubble user">你們有提供法律諮詢嗎？<small>12:31</small></div>
      <div class="bubble">您好，我可以提供一般預約資訊。為保護當事人資料，我不能查詢任何案件內容。若您已是客戶，請由秘書協助完成身分確認。<small>AI 助理 · 12:31</small></div>
    `;
  }
  if (role === "secretary") {
    return `
      <div class="bubble user">今天有哪些待確認預約？<small>12:32</small></div>
      <div class="bubble">目前有 1 件：林先生「AI 供應商合約審閱」，候選時間為 6/29 10:00 或 15:00。請在右側工作卡確認。<small>AI 助理 · 12:32</small></div>
    `;
  }
  return `
    <div class="bubble user">我想約下週跟律師討論 AI 供應商合約。<small>12:29</small></div>
    <div class="bubble">林先生您好，我找到您目前的案件「AI 供應商合約審閱」。我先整理兩個候選時間：6/29 10:00、6/29 15:00。秘書確認後才會正式建立預約。<small>AI 助理 · 12:29</small></div>
    ${state.appointmentApproved ? '<div class="bubble">預約已由陳秘書確認：6/29 10:00，周律師。行事曆邀請已建立。<small>系統通知 · 12:35</small></div>' : ""}
  `;
}

function lineView() {
  return `
    ${pageHead("Identity & Scheduling", "LINE 排程與身分分流", "同一個 Agent，依身分只提供該使用者有權看到的資訊。")}
    <div class="split-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>LINE 對話模擬</h2>
          <span class="tag ok">${state.role === "client" ? "已識別客戶" : state.role === "secretary" ? "內部人員" : "未識別"}</span>
        </div>
        <div class="panel-body">
          <div class="segmented role-switch" data-control="role">
            <button class="segment ${state.role === "client" ? "active" : ""}" data-role="client">林先生</button>
            <button class="segment ${state.role === "guest" ? "active" : ""}" data-role="guest">訪客</button>
            <button class="segment ${state.role === "secretary" ? "active" : ""}" data-role="secretary">陳秘書</button>
          </div>
        </div>
        <div class="chat">${conversation(state.role)}</div>
        <form class="chat-compose" id="chat-form">
          <input aria-label="模擬訊息" value="${state.role === "client" ? "我想改約其他時間" : "請問如何預約？"}" />
          <button class="primary" type="submit">送出</button>
        </form>
      </section>

      <section class="panel approval-card">
        <div class="panel-head"><h2>秘書確認卡</h2><span class="tag ${state.appointmentApproved ? "ok" : ""}">${state.appointmentApproved ? "已核准" : "待確認"}</span></div>
        <div class="panel-body">
          <dl>
            <dt>客戶</dt><dd>林先生 · 光禾科技</dd>
            <dt>案件</dt><dd>AI 供應商合約審閱</dd>
            <dt>主辦律師</dt><dd>周律師</dd>
            <dt>需求</dt><dd>討論合約談判與資料條款</dd>
            <dt>候選時間</dt><dd>6/29 10:00 · 6/29 15:00</dd>
            <dt>確認事項</dt><dd>律師是否需先看新版合約</dd>
          </dl>
          <div class="button-row">
            <button class="primary" data-action="approve-appointment" ${state.appointmentApproved ? "disabled" : ""}>核准 6/29 10:00</button>
            <button class="secondary" data-action="request-more">請客戶補資料</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function recordWarnings(entry, index) {
  const warnings = [];
  if (entry.description.length < 6 && !state.fixedEntries.has(index)) warnings.push("描述過短");
  if (entry.hours > 3 && !state.fixedEntries.has(index)) warnings.push("單筆超過 3 小時");
  if (!entry.billable && !state.fixedEntries.has(index)) warnings.push("不請款");
  return warnings;
}

function displayDescription(entry, index) {
  if (state.fixedEntries.has(index) && entry.description === "電話") {
    return "與客戶電話確認合約修訂範圍";
  }
  return entry.description;
}

function hoursView() {
  const records = data["time-records"].records;
  const total = records.reduce((sum, entry) => sum + entry.hours, 0);
  const billable = records.filter((entry) => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const nonBillable = total - billable;
  return `
    ${pageHead("Time Records", "服務時數彙整", "先確認服務紀錄是否完整，再談費率與帳單。")}
    <section class="summary-strip">
      <div><span>總服務時數</span><strong>${total.toFixed(1)} 小時</strong></div>
      <div><span>可請款時數</span><strong>${billable.toFixed(1)} 小時</strong></div>
      <div><span>內部 / 不請款</span><strong>${nonBillable.toFixed(1)} 小時</strong></div>
    </section>
    <div class="table-wrap">
      <table>
        <thead><tr><th>日期</th><th>律師</th><th>客戶 / 案件</th><th>服務內容</th><th>時數</th><th>狀態</th><th></th></tr></thead>
        <tbody>
          ${records.map((entry, index) => {
            const client = clientById(entry.clientId);
            const matter = matterById(entry.clientId, entry.matterId);
            const warnings = recordWarnings(entry, index);
            return `<tr>
              <td>${entry.date.slice(5).replace("-", "/")}</td>
              <td>${entry.lawyer}</td>
              <td>${client.name}<br><span class="meta">${matter.name}</span></td>
              <td class="${warnings.some((w) => w.includes("描述")) ? "description-warning" : ""}">${displayDescription(entry, index)}</td>
              <td class="hours">${entry.hours.toFixed(1)}h</td>
              <td>${warnings.length ? warnings.map((w) => `<span class="tag ${w === "不請款" ? "" : "high"}">${w}</span>`).join(" ") : `<span class="tag ok">${entry.billable ? "可進帳單" : "已確認不請款"}</span>`}</td>
              <td>${warnings.length ? `<button class="secondary" data-action="fix-entry" data-index="${index}">${warnings.includes("描述過短") ? "補正" : "確認"}</button>` : ""}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
    <div class="section-title"><h2>人工確認點</h2><span>資料完整性 · 可請款性 · 客戶可理解性</span></div>
    <div class="notice"><strong>✓</strong><div><strong>Agent 只標示問題，不自行改寫事實</strong><p>「電話」需由承辦人補上實際服務內容；3.5 小時紀錄需確認是否正確或應拆分。所有修正保留操作者與時間。</p></div></div>
  `;
}

function invoiceFor(clientId) {
  const records = data["time-records"].records.filter((entry) => entry.clientId === clientId);
  const client = clientById(clientId);
  const matter = client.matters[0];
  const rates = new Map(data.rates.lawyerRates.map((item) => [item.lawyer, item.hourlyRate]));
  const total = records.reduce((sum, entry) => sum + (entry.billable ? entry.hours * rates.get(entry.lawyer) : 0), 0);
  const warnings = records.filter((entry) =>
    (entry.description.length < 6 || entry.hours > 3 || !entry.billable)
      && !state.fixedEntries.has(data["time-records"].records.indexOf(entry)),
  );
  const approved = state.approvedInvoices.has(clientId);
  return `
    <article class="invoice">
      <div class="invoice-top">
        <div><span class="meta">帳單草稿 · ${clientId === "client-lin" ? "DRAFT-0626-01" : "DRAFT-0626-02"}</span><h2>${client.company}</h2><span class="meta">${matter.name}</span></div>
        <div class="invoice-total"><span>草稿金額</span><strong>${money(total)}</strong></div>
      </div>
      <div class="invoice-lines">
        ${records.map((entry) => {
          const recordIndex = data["time-records"].records.indexOf(entry);
          return `<div class="invoice-line"><span>${entry.date.slice(5)}</span><span>${displayDescription(entry, recordIndex)}</span><span>${entry.hours}h</span><span>${entry.billable ? money(entry.hours * rates.get(entry.lawyer)) : "不請款"}</span></div>`;
        }).join("")}
      </div>
      ${warnings.length ? `<div class="invoice-warning">尚有 ${warnings.length} 筆服務紀錄需確認，帳單不可寄出。</div>` : ""}
      <div class="invoice-footer">
        <span class="tag ${approved ? "ok" : ""}">${approved ? "律師已核准 · 待寄送" : "草稿 · 未寄送"}</span>
        <div class="button-row">
          <button class="secondary" data-action="preview-invoice">預覽</button>
          <button class="primary" data-action="approve-invoice" data-client="${clientId}" ${warnings.length || approved ? "disabled" : ""}>律師核准</button>
        </div>
      </div>
    </article>
  `;
}

function billingView() {
  return `
    ${pageHead("Billing Review", "帳單草稿", "AI 完成計算與格式化，但寄送與付款狀態仍由人負責。")}
    <div class="toolbar">
      <div class="notice" style="flex:1"><strong>!</strong><div><strong>尚未連接 Email 或會計系統</strong><p>現場展示不會真的寄信，也不會變更付款狀態。</p></div></div>
    </div>
    <section class="invoice-list">
      ${invoiceFor("client-lin")}
      ${invoiceFor("client-chen")}
    </section>
  `;
}

const views = {
  overview: overviewView,
  radar: radarView,
  line: lineView,
  hours: hoursView,
  billing: billingView,
};

function render() {
  app.innerHTML = views[state.view]();
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  app.focus({ preventScroll: true });
}

document.querySelector("#main-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view;
  render();
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  state.view = "overview";
  state.radarFilter = "all";
  state.role = "client";
  state.appointmentApproved = false;
  state.approvedRadar.clear();
  state.fixedEntries.clear();
  state.approvedInvoices.clear();
  render();
  notify("展示已重設");
});

app.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.radarFilter = filter.dataset.filter;
    render();
    return;
  }
  const role = event.target.closest("[data-role]");
  if (role) {
    state.role = role.dataset.role;
    render();
    return;
  }
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "approve-radar") {
    state.approvedRadar.add(action.dataset.id);
    render();
    notify("已記錄律師確認，尚未對外分享");
  }
  if (action.dataset.action === "line-summary") notify("已產生 5 行 LINE 摘要草稿，等待律師確認");
  if (action.dataset.action === "approve-appointment") {
    state.appointmentApproved = true;
    state.role = "client";
    render();
    notify("秘書已核准，模擬建立行事曆邀請");
  }
  if (action.dataset.action === "request-more") notify("已產生補件訊息草稿，尚未送出");
  if (action.dataset.action === "fix-entry") {
    state.fixedEntries.add(Number(action.dataset.index));
    render();
    notify("已模擬補正並留下修改紀錄");
  }
  if (action.dataset.action === "preview-invoice") notify("帳單預覽已檢查：此展示不會寄送 Email");
  if (action.dataset.action === "approve-invoice") {
    state.approvedInvoices.add(action.dataset.client);
    render();
    notify("律師已核准，下一步才可交由秘書寄送");
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "chat-form") return;
  event.preventDefault();
  notify(state.role === "guest" ? "訪客只能取得一般資訊" : "訊息已整理成待確認事項");
});

render();
