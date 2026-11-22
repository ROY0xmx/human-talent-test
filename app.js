(() => {
  "use strict";
  const STORAGE={history:"talentTestHistory",theme:"talentTestTheme"};
  const TEST_CONFIG={40:{label:"40题轻松版"},100:{label:"100题标准版"},200:{label:"200题深度版"}};
  let selectedVersion=100,currentQuestions=[],answers=[],currentIndex=0;

  const $=id=>document.getElementById(id);
  const screens=["homeScreen","testScreen","reportScreen","historyScreen"];

  function showScreen(id) {
    screens.forEach(name=>$(name).classList.toggle("active",name===id));
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function chooseVersion(version) {
    selectedVersion=Number(version);
    document.querySelectorAll(".version-card").forEach(card=>card.classList.toggle("selected",Number(card.dataset.version)===selectedVersion));
  }

  function startTest() {
    currentQuestions=window.TalentTest.banks[selectedVersion].map(q=>({...q,options:q.options.slice()}));
    answers=Array(currentQuestions.length).fill(null);
    currentIndex=0;
    showScreen("testScreen");
    renderQuestion();
  }

  function renderQuestion() {
    const question=currentQuestions[currentIndex];
    $("questionText").textContent=question.q;
    $("questionKicker").textContent=`第 ${currentIndex+1} 题 · 正在发现你的天赋`;
    $("progressText").textContent=`${currentIndex+1} / ${currentQuestions.length}`;
    $("progressBar").style.width=`${((currentIndex+1)/currentQuestions.length)*100}%`;
    $("prevBtn").disabled=currentIndex===0;

    const options=question.options && question.options.length===5
      ? question.options
      : ["完全不像我","比较不像我","不确定","比较像我","非常像我"];

    $("options").innerHTML=options.map((label,index)=>`
      <button class="option ${answers[currentIndex]===index?"selected":""}" type="button" data-option="${index}">
        <span class="option-index">${index+1}</span><span>${label}</span>
      </button>`).join("");

    $("options").querySelectorAll(".option").forEach(button=>{
      button.addEventListener("click",()=>{
        answers[currentIndex]=Number(button.dataset.option);
        $("options").querySelectorAll(".option").forEach((item,i)=>item.classList.toggle("selected",i===answers[currentIndex]));
        $("nextBtn").disabled=false;
      });
    });
    $("nextBtn").disabled=answers[currentIndex]===null;
  }

  function nextQuestion() {
    if (answers[currentIndex]===null) return;
    if (currentIndex<currentQuestions.length-1) {
      currentIndex++;
      renderQuestion();
    } else finishTest();
  }

  function previousQuestion() {
    if (currentIndex>0) {currentIndex--;renderQuestion();}
  }

  function finishTest() {
    if (answers.some(value=>value===null)) {
      const first=answers.findIndex(value=>value===null);
      currentIndex=first;
      renderQuestion();
      return;
    }
    const result=window.TalentTest.calculate(answers,currentQuestions);
    const config=TEST_CONFIG[selectedVersion];
    $("reportContent").innerHTML=window.TalentTest.buildReport(result,config.label);
    saveHistory(result);
    showScreen("reportScreen");
  }

  function saveHistory(result) {
    try {
      const history=JSON.parse(localStorage.getItem(STORAGE.history)||"[]");
      history.unshift({date:new Date().toISOString(),version:selectedVersion,answered:result.answered,scores:result.scores.map(s=>({name:s.name,score:s.score}))});
      localStorage.setItem(STORAGE.history,JSON.stringify(history.slice(0,30)));
    } catch (_) {}
  }

  function showHistory() {
    let history=[];
    try {history=JSON.parse(localStorage.getItem(STORAGE.history)||"[]");} catch (_) {}
    $("historyList").innerHTML=history.length ? history.map(item=>{
      const top=[...item.scores].sort((a,b)=>b.score-a.score)[0];
      return `<article class="history-item"><div><strong>${item.version}题测试</strong><span>${new Date(item.date).toLocaleString("zh-CN")}</span></div><b>${top?top.name:""}</b></article>`;
    }).join("") : `<p class="empty-history">还没有测试记录，完成一次测评后会在这里显示。</p>`;
    showScreen("historyScreen");
  }

  document.querySelectorAll(".version-card").forEach(card=>card.addEventListener("click",()=>chooseVersion(card.dataset.version)));
  $("startBtn").addEventListener("click",startTest);
  $("nextBtn").addEventListener("click",nextQuestion);
  $("prevBtn").addEventListener("click",previousQuestion);
  $("homeBtn").addEventListener("click",()=>showScreen("homeScreen"));
  $("historyBtn").addEventListener("click",showHistory);
  $("reportHistoryBtn").addEventListener("click",showHistory);
  $("restartBtn").addEvent("click",()=>showScreen("homeScreen"));
  $("clearHistoryBtn").addEventListener("click",()=>{localStorage.removeItem(STORAGE.history);showHistory();});

  $("themeBtn").addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem(STORAGE.theme,document.body.classList.contains("dark")?"dark":"light");
  });
  if (localStorage.getItem(STORAGE.theme)==="dark") document.body.classList.add("dark");
})();
