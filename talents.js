window.TalentTest = (() => {
  "use strict";

  const talents = [
    {name:"创造力",icon:"💡",desc:"善于产生新想法、发现新可能，并把平凡事物重新组合。",advice:"给自己一段不评价的自由创造时间，允许先做出粗糙版本。",industries:["创意设��","产品创新","内容创作"]},
    {name:"洞察力",icon:"🧭",desc:"能够发现规律、看见细节，并理解事情背后的联系。",advice:"遇到复杂问题时先列事实，再寻找模式，最后提出假设。",industries:["数据分析","咨询研究","战略规划"]},
    {name:"共情力",icon:"🤝",desc:"能体会他人的感受，理解立场并建立真诚连接。",advice:"先倾听和确认感受，再询问对方需要什么支持。",industries:["教育培训","心理咨询","客户服务"]},
    {name:"行动力",icon:"⚡",desc:"愿意开始、推进并完成事情，不容易停在想法阶段。",advice:"把目标缩小到今天能完成的十分钟行动。",industries:["项目管理","运营执行","创业经营"]},
    {name:"学习力",icon:"🌱",desc:"对未知保持好奇，能快速吸收、复盘并持续成长。",advice:"选择一个主题，用新知识立刻做一次小实践。",industries:["教育科研","技能学习","技术研发"]},
    {name:"表达力",icon:"🎙️",desc:"善于组织语言，用清晰、有感染力的方式传递观点。",advice:"练习用一个核心观点、三个例子和一句总结表达。",industries:["演讲主持","传播营销","写作编辑"]},
    {name:"韧性",icon:"🛡️",desc:"在挫折、压力或变化中仍能调整状态并继续前进。",advice:"把困难分成可控、可协商和暂时不能改变的三部分。",industries:["管理运营","医疗援助","风险应对"]},
    {name:"领导力",icon:"⭐",desc:"能够整合方向、影响协作，并帮助团队发挥潜力。",advice:"先明确共同目标，再为每个人分配适合的角色。",industries:["企业管理","团队建设","公共事务"]},
    {name:"审美感",icon:"🎨",desc:"对结构、色彩、形式和体验细节有敏锐的判断力。",advice:"每天收集三个让你感觉舒适或新颖的视觉细节。",industries:["视觉设计","建筑艺术","品牌体验"]},
    {name:"合作力",icon:"🌏",desc:"善于倾听差异、建立信任，并和不同的人共同完成目标。",advice:"遇到分歧时先找共同点，再讨论可交换的方案。",industries:["跨部门协作","社区服务","国际交流"]}
  ];

  const stems = [
    ["遇到新问题时，我会先提出很多可能的解��方案。","我喜欢把熟悉的事物用新方式组合。","我常能从别人的想法中延伸出新点子。","不同领域的内容常能激发我的新思路。","我愿意尝试没有标准答案的方法。"],
    ["我常能察觉别人没有说明的原因或担忧。","我善于从零散信息中找出规律。","遇到复杂局面，我会先拆解关键变量。","我能快速发现一个方案中容易忽略的细节。","我喜欢追问事情背后的真正联系。"],
    ["别人向我倾诉时，我能较好理解他们的感受。","我会留意对方的语气、表情和情绪变化。","我能站在不同立场理解冲突。","朋友遇到困难时，我知道如何陪伴和支持。","我能敏锐感受到团队中的情绪变化。"],
    ["我倾向马上开始，而不是只停留在讨论。","我能把模糊目标拆成具体步骤。","遇到拖延时，我可以先完成最小版本。","我愿意承担并推动一件事向前。","拿到任务后，我会尽快安排第一步。"],
    ["我对陌生领域的知识保持好奇。","我会主动复盘自己做错的地方。","我能把新知识运用到实际生活中。","我喜欢向擅长的人请教。","我愿意承认自己的不足并持续改进。"],
    ["我能较清楚地表达复杂想法。","我会根据听众调整自己的语言。","别人常能理解我想说明的重点。","我善于用故事吸引人的注意力。","我能在公开表达时保持自然。"],
    ["遇到挫折时，我能很快恢复状态。","压力较大时，我仍能保持基本节奏。","我会把失败当作暂时状态，而不是永久结论。","计划改变后，我能迅速调整。","困难持续时，我仍愿意寻找新的突破口。"],
    ["我能够为群体设定清晰方向。","我会主动协调不同人的资源和任务。","我能在关键时刻做出负责任的决定。","我可以激励别人相信共同目标。","我善于分配角色并发挥团队优势。"],
    ["我会注意环境、颜色、比例等视觉细节。","我能分辨一件作品是协调还是杂乱。","我喜欢把日常物品整理得更美观。","我会根据氛围选择合适的形式与风格。","我能从平凡事物中发现审美价值。"],
    ["我能与性格、背景不同的人合作。","我会主动寻找双方都能接受的方案。","我能包容不同意见而不立刻否定。","我会在团队中分享信息和资源。","我相信共同完成比单独获胜更有意义。"]
  ];

  const answerOptions = ["完全不像我","比较不像我","不确定","比较像我","非常像我"];
  const banks = {};

  [40,100,200].forEach(length => {
    const questions = [];
    for (let i = 0; i < length; i++) {
      const t = i % 10;
      const pool = stems[t];
      questions.push({
        q: pool[Math.floor(i / 10) % pool.length] || pool[i % pool.length],
        t,
        options: answerOptions.slice()
      });
    }
    banks[length] = questions;
  });

  function calculate(answers, questions) {
    const totals = Array(10).fill(0), counts = Array(10).fill(0);
    let answered = 0;
    questions.forEach((q,i) => {
      const v = answers[i];
      if (!Number.isInteger(v) || v < 0 || v > 4 || q.t < 0 || q.t > 9) return;
      totals[q.t] += v;
      counts[q.t] += 1;
      answered++;
    });
    const scores = talents.map((talent,index) => {
      const average = counts[index] ? totals[index] / counts[index] : 0;
      return {...talent,index,score:Math.round(average * 25)};
    });
    return {scores,answered,total:questions.length};
  }

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }

  function buildReport(result, version) {
    const ranked = [...result.scores].sort((a,b) => b.score-a.score);
    const top = ranked.slice(0,3);
    const topCards = top.map((item,index) => `<article class="dimension"><span>${index+1}</span><strong>${escapeHtml(item.name)}</strong><b>${item.score}</b></article>`).join("");
    return `<section class="report-head"><span class="eyebrow">天赋解析</span><h1>你最突出的天赋</h1></section><div class="top-dimensions">${topCards}</div><section class="score-list"><h2>${escapeHtml(version)}结果</h2>${ranked.map(item => `<div class="score-row"><span>${escapeHtml(item.name)}</span><div><i style="width:${item.score}%"></i></div><strong>${item.score}</strong></div>`).join("")}</section>`;
  }

  return {talents,banks,calculate,buildReport};
})();
