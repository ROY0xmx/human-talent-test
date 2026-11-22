(() => {
  "use strict";
  const STORE = { history: "talentTestHistory", draft: "talentTestDraft", theme: "talentTestTheme" };
  const CONFIG = { 40: { label: "轻松体验" }, 100: { label: "标准测评" }, 200: { label: "深度探索" } };
  const $ = id => document.getElementById(id);
  const screens = ["homeScreen", "testScreen", "reportScreen", "historyScreen"];
  let selectedVersion = 100;
  let questions = [];
  let answers = [];
  let currentIndex = 0;
  let latestResult = null;

  function readJSON(key, fallback) {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  }
  function showScreen(id) {
    screens.forEach(name => $(name).classList.toggle("active", name === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function chooseVersion(value) {
    const version = Number(value);
    if (!CONFIG[version]) return;
    selectedVersion = version;
    document.querySelectorAll(".version-card").forEach(card => {
      const active = Number(card.dataset.version) === version;
      card.classList.toggle("selected", active);
      card.setAttribute("aria-pressed", String(active));
    });
  }
  function startTest() {
    const draft = readJSON(STORE.draft, null);
    if (draft && Number(draft.version) === selectedVersion && Array.isArray(draft.answers) && draft.answers.length === selectedVersion && draft.answers.some(Number.isInteger)) {
      const resume = window.confirm(`发现一份未完成的 ${selectedVersion} 题测评（第 ${Math.min(Number(draft.index) + 1, selectedVersion)} 题）。\n\n确定：继续上次进度\n取消：重新开始`);
      if (resume) {
        questions = window.TalentTest.getQuestions(selectedVersion);
        answers = draft.answers.map(value => Number.isInteger(value) && value >= 0 && value <= 4 ? value : null);
        currentIndex = Math.max(0, Math.min(Number(draft.index) || 0, questions.length - 1));
        showScreen("testScreen"); renderQuestion(); return;
      }
    }
    questions = window.TalentTest.getQuestions(selectedVersion);
    answers = Array(questions.length).fill(null);
    currentIndex = 0;
    persistDraft();
    showScreen("testScreen");
    renderQuestion();
  }
  function persistDraft() {
    const saved = writeJSON(STORE.draft, { version: selectedVersion, answers, index: currentIndex, updatedAt: new Date().toISOString() });
    $("saveHint").textContent = saved ? "进度已自动保存" : "无法保存进度，可继续完成测评";
  }
  function renderQuestion() {
    const question = questions[currentIndex];
    if (!question) return;
    $("questionText").textContent = question.q;
    $("questionKicker").textContent = `第 ${currentIndex + 1} 题 · 正在发现你的天赋`;
    $("progressText").textContent = `${currentIndex + 1} / ${questions.length}`;
    const percent = Math.round(((currentIndex + 1) / questions.length) * 100);
    $("progressBar").style.width = `${percent}%`;
    $("progressTrack").setAttribute("aria-valuenow", String(percent));
    $("prevBtn").disabled = currentIndex === 0;
    $("options").innerHTML = question.options.map((label, index) => {
      const active = answers[currentIndex] === index;
      return `<button class="option${active ? " selected" : ""}" type="button" data-option="${index}" aria-pressed="${active}"><span class="option-index">${index + 1}</span><span>${escapeHTML(label)}</span><span class="option-radio" aria-hidden="true"></span></button>`;
    }).join("");
    $("options").querySelectorAll(".option").forEach(button => button.addEventListener("click", () => {
      answers[currentIndex] = Number(button.dataset.option);
      $("options").querySelectorAll(".option").forEach((item, index) => {
        const active = index === answers[currentIndex];
        item.classList.toggle("selected", active); item.setAttribute("aria-pressed", String(active));
      });
      updateNextButton(); persistDraft();
    }));
    updateNextButton();
  }
  function updateNextButton() {
    const final = currentIndex === questions.length - 1;
    $("nextBtn").disabled = answers[currentIndex] === null;
    $("nextBtn").innerHTML = final ? "查看测评结果 <span aria-hidden=\"true\">→</span>" : "下一题 <span aria-hidden=\"true\">→</span>";
  }
  function nextQuestion() {
    if (answers[currentIndex] === null) return;
    if (currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else finishTest();
  }
  function previousQuestion() {
    if (currentIndex > 0) { currentIndex--; renderQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }
  function finishTest() {
    latestResult = window.TalentTest.calculate(answers, questions);
    saveHistory(latestResult);
    try { localStorage.removeItem(STORE.draft); } catch (_) {}
    renderReport(latestResult, selectedVersion);
    showScreen("reportScreen");
  }
  function saveHistory(result) {
    const history = readJSON(STORE.history, []);
    const safeHistory = Array.isArray(history) ? history : [];
    safeHistory.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, date: new Date().toISOString(), version: selectedVersion, scores: result.scores.map(item => ({ name: item.name, score: item.score })) });
    writeJSON(STORE.history, safeHistory.slice(0, 30));
  }
  function renderReport(result, version) {
    const ranked = [...result.scores].sort((a, b) => b.score - a.score);
    const top = ranked.slice(0, 3);
    const cards = top.map((talent, index) => `<article class="strength-card strength-${index + 1}"><span class="strength-rank">0${index + 1}</span><span class="strength-icon">${escapeHTML(talent.icon)}</span><div><span class="strength-label">${index === 0 ? "你的闪光优势" : index === 1 ? "稳定的潜能" : "值得探索"}</span><h3>${escapeHTML(talent.name)}</h3><p>${escapeHTML(talent.desc)}</p></div><strong class="strength-score">${talent.score}<small>分</small></strong></article>`).join("");
    const bars = ranked.map((talent, index) => `<div class="score-row"><span class="score-name">${escapeHTML(talent.name)}</span><div class="score-track"><i style="width:${talent.score}%"></i></div><b>${talent.score}</b>${index < 3 ? `<span class="top-mark">TOP ${index + 1}</span>` : ""}</div>`).join("");
    const tags = [...new Set(top.flatMap(talent => talent.jobs.slice(0, 3)))].map(job => `<span class="career-tag">${escapeHTML(job)}</span>`).join("");
    const reflections = top.map(talent => `<li><strong>${escapeHTML(talent.name)}：</strong>这周找一个真实场景，有意识地运用这项优势，并记下它带来的变化。</li>`).join("");
    $("reportContent").innerHTML = `<div class="report-hero"><span class="eyebrow">✦ ${CONFIG[version].label} · 天赋解析</span><h1 id="reportTitle">你的优势组合</h1><p>你完成了 ${result.answered} 题自我探索。这里没有固定标签，只有了解自己的新线索。</p><div class="report-summary"><span class="summary-icon">✧</span><div><strong>${escapeHTML(top[0].name)} × ${escapeHTML(top[1].name)}</strong><span>这是你本次测评中最突出的优势组合</span></div></div></div><section class="report-section"><div class="section-heading"><div><span class="eyebrow">YOUR TOP STRENGTHS</span><h2>你的前三项优势</h2></div><span class="section-aside">分数越高，表示自我认同程度越高</span></div><div class="strength-list">${cards}</div></section><section class="report-section score-section"><div class="section-heading"><div><span class="eyebrow">A CLOSER LOOK</span><h2>十项天赋全景</h2></div></div><div class="score-chart">${bars}</div></section><section class="report-section"><div class="section-heading"><div><span class="eyebrow">IDEAS TO EXPLORE</span><h2>可以尝试的方向</h2></div></div><p class="section-copy">这些只是灵感，不是职业定论。结合兴趣、价值观与现实体验，找到适合自己的路。</p><div class="career-tags">${tags}</div></section><section class="reflection-card"><span class="eyebrow">A SMALL NEXT STEP</span><h2>把发现带进生活</h2><ul>${reflections}</ul><p>天赋不是固定不变的标签。练习、环境与兴趣都会影响表现；如果结果与你的感受不一致，也值得带着好奇再观察。</p></section><p class="report-disclaimer">本结果基于自我报告，仅供个人探索与娱乐参考，不构成心理诊断、能力鉴定或职业建议。</p>`;
  }
  function showHistory() {
    const raw = readJSON(STORE.history, []);
    const history = Array.isArray(raw) ? raw : [];
    $("historyList").innerHTML = history.length ? history.map((item, index) => {
      const scores = Array.isArray(item.scores) ? item.scores : [];
      const first = [...scores].sort((a, b) => Number(b.score) - Number(a.score))[0];
      const date = new Date(item.date);
      const dateText = Number.isNaN(date.getTime()) ? "日期未知" : date.toLocaleString("zh-CN", { dateStyle: "medium", timeStyle: "short" });
      const version = CONFIG[Number(item.version)] ? Number(item.version) : 100;
      return `<article class="history-item"><span class="history-date-icon" aria-hidden="true">✦</span><div class="history-item-info"><strong>${version} 题 · ${CONFIG[version].label}</strong><span>${escapeHTML(dateText)}</span><span>首位天赋：${escapeHTML(first?.name || "暂无")} · ${Number(first?.score) || 0} 分</span></div><button class="secondary-btn history-view-btn" type="button" data-history-index="${index}">查看结果 →</button></article>`;
    }).join("") : `<div class="empty-history"><span aria-hidden="true">✧</span><h2>还没有测试记录</h2><p>完成一次测评后，你的探索轨迹会出现在这里。</p><button class="primary-btn" type="button" id="emptyStartBtn">开始第一次探索 →</button></div>`;
    $("historyList").querySelectorAll("[data-history-index]").forEach(button => button.addEventListener("click", () => showSavedReport(Number(button.dataset.historyIndex))));
    const emptyStart = $("emptyStartBtn"); if (emptyStart) emptyStart.addEventListener("click", () => { showScreen("homeScreen"); startTest(); });
    showScreen("historyScreen");
  }
  function showSavedReport(index) {
    const history = readJSON(STORE.history, []);
    const item = Array.isArray(history) ? history[index] : null;
    if (!item || !Array.isArray(item.scores)) return;
    const scores = window.TalentTest.talents.map((talent, talentIndex) => {
      const saved = item.scores.find(score => score.name === talent.name);
      return { ...talent, index: talentIndex, score: Math.max(0, Math.min(100, Number(saved?.score) || 0)) };
    });
    const version = CONFIG[Number(item.version)] ? Number(item.version) : 100;
    latestResult = { scores, answered: version, total: version };
    renderReport(latestResult, version); showScreen("reportScreen");
  }
  async function shareResult() {
    const ranked = [...(latestResult?.scores || [])].sort((a, b) => b.score - a.score);
    if (!ranked.length) return;
    const summary = `我的天赋探索结果：${ranked.slice(0, 3).map((item, index) => `${index + 1}. ${item.name}（${item.score}分）`).join("、")}。\n这是一份自我探索参考，不是能力诊断或职业定论。`;
    try {
      await navigator.clipboard.writeText(summary);
      $("copyFeedback").textContent = "摘要已复制，可以分享给朋友啦。";
    } catch (_) {
      const field = document.createElement("textarea"); field.value = summary; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select();
      const copied = document.execCommand("copy"); field.remove();
      $("copyFeedback").textContent = copied ? "摘要已复制，可以分享给朋友啦。" : summary;
    }
  }
  function toggleTheme() {
    const dark = document.body.classList.toggle("dark");
    $("themeIcon").textContent = dark ? "☀" : "☾";
    $("themeBtn").setAttribute("aria-label", dark ? "切换浅色模式" : "切换深色模式");
    try { localStorage.setItem(STORE.theme, dark ? "dark" : "light"); } catch (_) {}
  }

  document.querySelectorAll(".version-card").forEach(card => card.addEventListener("click", () => chooseVersion(card.dataset.version)));
  $("startBtn").addEventListener("click", startTest);
  $("nextBtn").addEventListener("click", nextQuestion);
  $("prevBtn").addEventListener("click", previousQuestion);
  $("homeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("quizHomeBtn").addEventListener("click", () => { persistDraft(); showScreen("homeScreen"); });
  $("historyBtn").addEventListener("click", showHistory);
  $("historyHomeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("reportHistoryBtn").addEventListener("click", showHistory);
  $("restartBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("shareBtn").addEventListener("click", shareResult);
  $("themeBtn").addEventListener("click", toggleTheme);
  $("clearHistoryBtn").addEventListener("click", () => {
    if (!readJSON(STORE.history, []).length || window.confirm("确定清空所有测试记录吗？此操作无法撤销。")) {
      try { localStorage.removeItem(STORE.history); } catch (_) {} showHistory();
    }
  });
  document.addEventListener("keydown", event => {
    if (!$('testScreen').classList.contains("active") || event.altKey || event.ctrlKey || event.metaKey) return;
    if (/^[1-5]$/.test(event.key)) { const option = $("options").querySelector(`[data-option="${Number(event.key) - 1}"]`); if (option) option.click(); }
    else if (event.key === "ArrowRight" && !$("nextBtn").disabled) nextQuestion();
    else if (event.key === "ArrowLeft" && currentIndex > 0) previousQuestion();
  });
  try { if (localStorage.getItem(STORE.theme) === "dark") { document.body.classList.add("dark"); $("themeIcon").textContent = "☀"; $("themeBtn").setAttribute("aria-label", "切换浅色模式"); } } catch (_) {}
})();
