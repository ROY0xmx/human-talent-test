(() => {
  "use strict";
  const STORAGE = { history: "talentTestHistory", theme: "talentTestTheme" };
  const CONFIG = {
    40: { label: "轻松体验", reportLength: 1000 },
    100: { label: "标准测评", reportLength: 4000 },
    200: { label: "深度探索", reportLength: 8000 }
  };
  const $ = id => document.getElementById(id);
  const screens = ["homeScreen", "testScreen", "reportScreen", "historyScreen"];
  let selectedVersion = 100;
  let currentQuestions = [];
  let answers = [];
  let currentIndex = 0;

  function showScreen(id) {
    screens.forEach(name => $(name).classList.toggle("active", name === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseVersion(version) {
    const parsed = Number(version);
    if (!CONFIG[parsed]) return;
    selectedVersion = parsed;
    document.querySelectorAll(".version-card").forEach(card => {
      const selected = Number(card.dataset.version) === selectedVersion;
      card.classList.toggle("selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
  }

  function startTest() {
    currentQuestions = window.TalentTest.banks[selectedVersion].map(question => ({ ...question, options: question.options.slice() }));
    answers = Array(currentQuestions.length).fill(null);
    currentIndex = 0;
    showScreen("testScreen");
    renderQuestion();
  }

  function renderQuestion() {
    const question = currentQuestions[currentIndex];
    $("questionText").textContent = question.q;
    $("questionKicker").textContent = `第 ${currentIndex + 1} 题 · 正在发现你的天赋`;
    $("progressText").textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    $("progressBar").style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;
    $("prevBtn").disabled = currentIndex === 0;
    $("options").innerHTML = question.options.map((label, index) => `
      <button class="option ${answers[currentIndex] === index ? "selected" : ""}" type="button" data-option="${index}" aria-pressed="${answers[currentIndex] === index}">
        <span class="option-index">${index + 1}</span><span>${label}</span>
      </button>`).join("");
    $("options").querySelectorAll(".option").forEach(button => button.addEventListener("click", () => {
      answers[currentIndex] = Number(button.dataset.option);
      $("options").querySelectorAll(".option").forEach((item, index) => {
        const selected = index === answers[currentIndex];
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      $("nextBtn").disabled = false;
      $("nextBtn").textContent = currentIndex === currentQuestions.length - 1 ? "查看测评结果 →" : "下一题 →";
    }));
    $("nextBtn").disabled = answers[currentIndex] === null;
    $("nextBtn").textContent = currentIndex === currentQuestions.length - 1 ? "查看测评结果 →" : "下一题 →";
  }

  function nextQuestion() {
    if (answers[currentIndex] === null) return;
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else finishTest();
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  }

  function finishTest() {
    const result = window.TalentTest.calculate(answers, currentQuestions);
    const config = CONFIG[selectedVersion];
    $("reportContent").innerHTML = window.TalentTest.buildReport(result, config);
    saveHistory(result);
    showScreen("reportScreen");
  }

  function saveHistory(result) {
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE.history) || "[]");
      history.unshift({ date: new Date().toISOString(), version: selectedVersion, scores: result.scores.map(score => ({ name: score.name, score: score.score })) });
      localStorage.setItem(STORAGE.history, JSON.stringify(history.slice(0, 50)));
    } catch (_) {
      // Private browsing or a full storage quota should not prevent viewing results.
    }
  }

  function showSavedReport(index) {
    let history = [];
    try { history = JSON.parse(localStorage.getItem(STORAGE.history) || "[]"); } catch (_) {}
    const item = history[index];
    if (!item || !Array.isArray(item.scores)) return;
    const scores = window.TalentTest.talents.map((talent, talentIndex) => {
      const saved = item.scores.find(score => score.name === talent.name);
      return { ...talent, index: talentIndex, score: saved ? Number(saved.score) : 0 };
    });
    const version = CONFIG[Number(item.version)] ? Number(item.version) : 100;
    $("reportContent").innerHTML = window.TalentTest.buildReport({ scores, answered: version, total: version }, CONFIG[version]);
    showScreen("reportScreen");
  }

  function showHistory() {
    let history = [];
    try { history = JSON.parse(localStorage.getItem(STORAGE.history) || "[]"); } catch (_) {}
    $("historyList").innerHTML = history.length ? history.map((item, index) => {
      const top = [...(item.scores || [])].sort((a, b) => b.score - a.score)[0];
      const date = new Date(item.date);
      const dateText = Number.isNaN(date.getTime()) ? "日期未知" : date.toLocaleString("zh-CN");
      const versionLabel = CONFIG[Number(item.version)] ? CONFIG[Number(item.version)].label : "天赋测评";
      return `<article class="history-item"><div class="history-item-info"><strong>${Number(item.version) || 0} 题 · ${versionLabel}</strong><span>${dateText}</span><span>首位天赋：${escapeHtml(top ? top.name : "暂无")}</span></div><button class="secondary-btn history-view-btn" type="button" data-history-index="${index}">查看解析 →</button></article>`;
    }).join("") : `<p class="empty-history">还没有测试记录，完成一次测评后会在这里显示。</p>`;
    $("historyList").querySelectorAll("[data-history-index]").forEach(button => button.addEventListener("click", () => showSavedReport(Number(button.dataset.historyIndex))));
    showScreen("historyScreen");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]));
  }

  document.querySelectorAll(".version-card").forEach(card => card.addEventListener("click", () => chooseVersion(card.dataset.version)));
  $("startBtn").addEventListener("click", startTest);
  $("nextBtn").addEventListener("click", nextQuestion);
  $("prevBtn").addEventListener("click", previousQuestion);
  $("homeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("quizHomeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("historyBtn").addEventListener("click", showHistory);
  $("historyHomeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("reportHistoryBtn").addEventListener("click", showHistory);
  $("restartBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("clearHistoryBtn").addEventListener("click", () => {
    try { localStorage.removeItem(STORAGE.history); } catch (_) {}
    showHistory();
  });
  $("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    try { localStorage.setItem(STORAGE.theme, document.body.classList.contains("dark") ? "dark" : "light"); } catch (_) {}
  });
  try { if (localStorage.getItem(STORAGE.theme) === "dark") document.body.classList.add("dark"); } catch (_) {}
})();
