window.TalentTest = (() => {
  "use strict";

  const talents = [
    { name: "语言", icon: "▤", desc: "理解、组织并表达语言信息的能力。", jobs: ["编辑与文案策划", "教师与培训师", "记者与内容创作者", "律师与沟通顾问"], strength: "你善于用词语理解世界，也能把复杂想法讲清楚。阅读、写作、叙事和讨论可能为你带来能量。", growth: "练习根据听众调整表达方式，并把灵感沉淀成文章、演讲或作品。留意倾听和提问，让表达成为双向连接。" },
    { name: "逻辑", icon: "▧", desc: "发现规律、分析信息并推理解决问题的能力。", jobs: ["数据分析师", "软件与系统工程师", "科研人员", "财务与策略顾问"], strength: "你倾向于拆解问题、寻找证据和辨认规律。面对复杂任务时，结构化思考能帮助你厘清变量并做出可解释的判断。", growth: "尝试把推理过程写出来，主动寻找反例，并在分析之后设定行动期限。也可以练习用直观例子向非专业伙伴说明结论。" },
    { name: "空间", icon: "◆", desc: "在脑海中想象、转换和组织视觉空间信息的能力。", jobs: ["建筑与室内设计师", "工业与产品设计师", "摄影与影视制作", "地图与游戏设计师"], strength: "你对形状、布局、方向和整体画面较敏感，能在脑中预演空间关系，也容易从视觉草图中发现新的方案。", growth: "用草图、模型或照片记录想法，反复比较不同布局。遇到抽象任务时把信息可视化，并通过实地观察校准想象。" },
    { name: "音乐", icon: "♫", desc: "感知、记忆和创造节奏、音高与旋律的能力。", jobs: ["音乐教育与表演", "作曲与声音设计", "音频制作与播客", "音乐治疗与活动策划"], strength: "你可能更容易捕捉节奏、音色和声音情绪，并通过旋律记忆或表达信息。声音环境也会明显影响你的专注和状态。", growth: "持续练习一种乐器或声音工具，记录灵感并完成短作品。与他人合作时沟通节奏、风格和反馈方式，帮助创意落地。" },
    { name: "身体", icon: "♟", desc: "通过动作、协调和动手实践学习与解决问题的能力。", jobs: ["运动与体能教练", "康复与职业治疗", "舞蹈与表演艺术", "手工制作与技能培训"], strength: "你往往在亲身尝试、移动和操作中学得更快。身体感觉、动作协调或手上功夫，可能是你理解和呈现想法的重要渠道。", growth: "为长期目标设计循序渐进的训练，留意休息与安全。学习新技能时先做小实验，再复盘动作和感受，把经验转化成方法。" },
    { name: "人际", icon: "♧", desc: "理解他人、建立关系并促进协作的能力。", jobs: ["心理与职业咨询", "人力资源与人才发展", "客户成功与销售", "社区运营与项目协调"], strength: "你比较容易察觉他人的立场和互动氛围，能够建立信任、协调分歧，并让团队成员感到被看见。", growth: "在照顾他人感受的同时明确自己的边界。多用开放式问题确认需求，协作后复盘哪些沟通方式真正推动了结果。" },
    { name: "内省", icon: "◉", desc: "觉察自身情绪、动机和价值观，并据此调整方向的能力。", jobs: ["研究与写作", "教练与个人发展", "心理健康服务", "独立创作与专业顾问"], strength: "你愿意观察自己的感受与动机，也能从独处和反思中获得方向。了解自己的节奏，有助于设定真实而持久的目标。", growth: "用简短日志记录情绪、选择和结果，避免反思停留在自我批评。把洞察转成一个具体实验，并请可信任的人提供外部视角。" },
    { name: "自然", icon: "♧", desc: "观察自然环境、辨别生物与分类变化的能力。", jobs: ["生态与环境保护", "园艺与景观设计", "农业与食品科学", "自然教育与户外导览"], strength: "你容易注意环境细节、生命变化和不同事物之间的联系。亲近自然或进行实地观察，可能帮助你恢复专注并激发问题意识。", growth: "开展有记录的观察项目，学习辨识与分类方法，并把兴趣连接到真实的环境议题。户外工作时也要兼顾安全、季节与团队协作。" },
    { name: "创造", icon: "♙", desc: "提出新想法、组合资源并尝试不同解决方案的能力。", jobs: ["产品创新与创业", "广告与创意策划", "游戏与体验设计", "研发与跨领域项目"], strength: "你乐于探索可能性，能把看似无关的素材重新组合。开放任务和允许试错的环境，通常更容易让你的点子成长为新方案。", growth: "给创意设定原��期限和评价标准，先做可测试的小版本。完成后收集用户反馈，在发散想象与持续交付之间找到节奏。" },
    { name: "美学", icon: "●", desc: "感知形式、色彩、比例与体验质感并作出审美判断的能力。", jobs: ["视觉与品牌设计", "时尚与空间陈列", "用户体验与界面设计", "艺术策展与内容制作"], strength: "你对色彩、比例、质感和氛围有敏锐感受，容易发现体验中不协调的细节，也愿意打磨呈现方式。", growth: "建立灵感档案并说明每个选择背后的理由。尝试在审美标准、使用需求和制作成本间做取舍，提升设计方案的可用性。" }
  ];

  const stems = [
    ["我喜欢用故事、文字或谈话表达自己的想法。", "读到新内容时，我会留意措辞和表达方式。", "我能把复杂的事情讲得比较清楚。", "我享受写作、阅读、辩论或讲述经历。"],
    ["遇到难题时，我会先拆解条件再逐步推理。", "我喜欢寻找数字、信息或现象背后的规律。", "我会用证据检查自己的判断是否可靠。", "安排任务时，我倾向于建立清晰的步骤和结构。"],
    ["我能想象物品移动或组合后的样子。", "我会留意空间布局、方向和视觉结构。", "看地图或图示通常能帮助我理解信息。", "我喜欢通过画图、模型或视觉方案表达想法。"],
    ["我容易记住旋律、节奏或声音细节。", "音乐会明显影响我的情绪或专注状态。", "我喜欢唱歌、演奏或尝试声音创作。", "我能听出不同声音之间的节奏和变化。"],
    ["我通过亲手操作往往学得更快。", "我喜欢运动、舞蹈或需要身体协调的活动。", "我擅长使用工具或完成精细的动手任务。", "长时间坐着不动会让我难以集中注意力。"],
    ["我能察觉他人的情绪或谈话中的气氛变化。", "朋友遇到困难时，我愿意倾听并理解他们。", "我善于协调不同意见，让大家继续合作。", "我喜欢与人交流，并从互动中获得能量。"],
    ["我会花时间思考自己的感受和真实需要。", "我知道什么样的目标对自己最有意义。", "独处和复盘能帮助我恢复状态或找到方向。", "我愿意从经验中认识自己的长处和局限。"],
    ["我会关注植物、动物或环境中的细微变化。", "在自然环境里观察和活动让我感到��展。", "我喜欢辨认、收集或整理自然相关的信息。", "我会留意人类活动对环境造成的影响。"],
    ["我常会想到不止一种解决问题的方法。", "我喜欢尝试新点子，而不是总沿用旧做法。", "我能把不同领域的想法组合成新方案。", "面对开放任务，我通常愿意先做一个小实验。"],
    ["我会注意色彩、比例和细节是否协调。", "我喜欢改善物品或空间的视觉呈现。", "我能感觉到设计或环境带来的氛围差异。", "我愿意花时间打磨作品的质感和完成度。"]
  ];
  const options = ["完全不像我", "比较不像我", "不确定", "比较像我", "非常像我"];
  const banks = {};
  [40, 100, 200].forEach(length => {
    banks[length] = Array.from({ length }, (_, index) => {
      const talentIndex = index % talents.length;
      const pool = stems[talentIndex];
      const round = Math.floor(index / talents.length);
      return { q: pool[round % pool.length], t: talentIndex, options: options.slice() };
    });
  });

  function calculate(answers, questions) {
    const totals = Array(talents.length).fill(0);
    const counts = Array(talents.length).fill(0);
    questions.forEach((question, index) => {
      const value = answers[index];
      if (!Number.isInteger(value) || value < 0 || value > 4 || question.t < 0 || question.t >= talents.length) return;
      totals[question.t] += value;
      counts[question.t]++;
    });
    const scores = talents.map((talent, index) => ({ ...talent, index, score: counts[index] ? Math.round((totals[index] / (counts[index] * 4)) * 100) : 0 }));
    return { scores, answered: answers.filter(Number.isInteger).length, total: questions.length };
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  }

  function makeDetailedText(ranked, targetLength) {
    const top = ranked.slice(0, targetLength <= 1000 ? 3 : targetLength <= 4000 ? 5 : 10);
    const sections = top.map((talent, index) => {
      const level = talent.score >= 75 ? "表现突出" : talent.score >= 55 ? "具备稳定基础" : "值得进一步探索";
      return `第${index + 1}项优势：${talent.name}（${talent.score}分，${level}）。${talent.strength} 这项能力可能在你主动选择相关任务、愿意持续投入并能获得正向反馈时表现得更明显。适合留意自己什么时候进入专注状态、哪些活动让你感到有成就感，以及身边的人经常向你寻求哪类帮助。职业方向参考：${talent.jobs.join("、")}。这些方向只是探索起点，不代表分数能决定职业；请结合兴趣、技能、价值观、机会和生活条件综合判断。成长建议：${talent.growth} 可以先选一个低风险的小任务实践两周，记录过程、结果和感受，再决定是否继续投入。`;
    });
    const reflections = [
      "把优势放进真实情境中验证：选择一项近期工作、学习或生活任务，尝试有意识地运用这项能力，并记录它为结果带来的具体变化。",
      "职业探索可以从访谈和体验开始：找一位从事相关工作的从业者了解日常任务、所需训练和挑战，再用短期项目测试自己是否喜欢工作的过程。",
      "天赋并非固定标签。训练、环境、支持和兴趣都会影响表现；如果分数与自我感受不一致，可以回想答题时的具体情境，并在不同阶段重新测评。",
      "设计下一步行动时，设定一个可观察的小目标，例如完成一份作品、参加一次协作或练��一个技能。完成后复盘哪些条件让优势更容易发挥，以及需要补充什么能力。"
    ];
    let text = `你的测评完成了 ${ranked.length ? "" : ""}十项天赋观察。以下结果是一份自我探索参考，不是能力诊断或职业定论。分数反映本次自我报告的倾向，建议与真实经历、外部反馈和长期兴趣一起理解。\n\n${sections.join("\n\n")}`;
    let cycle = 0;
    while (text.length < targetLength) {
      text += `\n\n进一步思考 ${cycle + 1}：${reflections[cycle % reflections.length]}${top.length ? ` 你可以特别关注${top[cycle % top.length].name}在本周的一次具体表现。` : ""}`;
      cycle++;
    }
    return text.slice(0, targetLength);
  }

  function buildReport(result, config) {
    const ranked = [...result.scores].sort((a, b) => b.score - a.score);
    const targetLength = config.reportLength;
    const analysis = makeDetailedText(ranked, targetLength);
    const leaders = ranked.slice(0, 3);
    const cards = leaders.map((talent, index) => `<article class="dimension"><span class="dimension-rank">${index + 1}</span><span class="dimension-icon">${escapeHtml(talent.icon)}</span><strong>${escapeHtml(talent.name)}</strong><b>${talent.score}</b></article>`).join("");
    const bars = ranked.map(talent => `<div class="score-row"><span>${escapeHtml(talent.name)}</span><div class="score-track"><i style="width:${talent.score}%"></i></div><b>${talent.score}</b></div>`).join("");
    const careerTags = [...new Set(leaders.flatMap(talent => talent.jobs.slice(0, 3)))].map(job => `<span class="career-tag">${escapeHtml(job)}</span>`).join("");
    return `<section class="report-head"><span class="eyebrow">✦ ${escapeHtml(config.label)} · 天赋解析</span><h1>你的优势组合</h1><p>结果是自我探索的线索，不是给你设限的标签。</p></section><div class="top-dimensions">${cards}</div><section class="report-section"><h2>十项天赋得分</h2><div class="score-list">${bars}</div></section><section class="report-section career-section"><h2>职业方向参考</h2><p>从你��前三项优势延伸出的探索方向，可结合兴趣和现实条件进一步了解：</p><div class="career-tags">${careerTags}</div><p class="report-note">职业建议仅供启发，不构成职业测评或就业保证。具体选择还需考虑专业训练、工作内容、价值偏好与机会。</p></section><section class="report-section analysis-section"><div class="analysis-title"><div><h2>具体分析与行动建议</h2><p>${escapeHtml(config.label)}：约 ${targetLength} 字深度解析</p></div><span class="analysis-length">${targetLength} 字</span></div><div class="analysis-copy">${escapeHtml(analysis).replace(/\n/g, "<br>")}</div></section>`;
  }

  return { talents, banks, calculate, buildReport };
})();
