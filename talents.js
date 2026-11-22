(() => {
  "use strict";
  const talents = [
    { name: "语言", icon: "文", desc: "理解、组织并表达语言信息的能力。", jobs: ["编辑与文案策划", "教师与培训师", "记者与内容创作者", "律师与沟通顾问"], strength: "你可能擅长用词语整理想法、传递信息，也能从表达中发现细节。" },
    { name: "逻辑", icon: "∑", desc: "发现规律、分析信息并推理解决问题的能力。", jobs: ["数据分析师", "软件与系统工程师", "科研人员", "财务与策略顾问"], strength: "你可能喜欢拆解复杂问题、寻找规律，并用证据一步步验证判断。" },
    { name: "空间", icon: "◇", desc: "在脑海中想象、转换和组织视觉空间信息的能力。", jobs: ["建筑与室内设计师", "工业与产品设计师", "摄影与影视制作", "地图与可视化设计"], strength: "你可能善于在脑海里转换画面、理解空间关系，并用视觉方式思考。" },
    { name: "音乐", icon: "♫", desc: "感知、记忆和创造节奏、音高与旋律的能力。", jobs: ["音乐教育与表演", "作曲与声音设计", "音频制作与播客", "音乐治疗与研究"], strength: "你可能对声音、节奏与旋律敏锐，也容易通过音乐捕捉情绪和氛围。" },
    { name: "身体", icon: "↗", desc: "通过动作、协调和动手实践学习与解决问题的能力。", jobs: ["运动与体能教练", "康复与职业治疗", "舞蹈与表演艺术", "手工与工艺创作"], strength: "你可能通过亲身尝试学得更快，也擅长协调动作、工具与身体感受。" },
    { name: "人际", icon: "♡", desc: "理解他人、建立关系并促进协作的能力。", jobs: ["心理与职业咨询", "人力资源与人才发展", "客户成功与销售", "社区与团队运营"], strength: "你可能能察觉他人的感受与需要，乐于倾听、沟通并促进彼此合作。" },
    { name: "内省", icon: "◉", desc: "觉察自身情绪、动机和价值观，并据此调整方向的能力。", jobs: ["研究与写作", "教练与个人发展", "心理健康服务", "独立创作与创业"], strength: "你可能愿意观察自己的感受与动机，并在独处和复盘中找到方向。" },
    { name: "自然", icon: "❋", desc: "观察自然环境、辨别生物与分类变化的能力。", jobs: ["生态与环境保护", "园艺与景观设计", "农业与食品科学", "自然教育与研究"], strength: "你可能善于留意自然环境中的细微变化，并乐于观察、辨认和归纳。" },
    { name: "创造", icon: "✳", desc: "提出新想法、组合资源并尝试不同解决方案的能力。", jobs: ["产品创新与创业", "广告与创意策划", "游戏与体验设计", "新媒体与内容创作"], strength: "你可能喜欢打破惯例、组合不同想法，并为开放问题寻找新路径。" },
    { name: "美学", icon: "✧", desc: "感知形式、色彩、比例与体验质感并作出审美判断的能力。", jobs: ["视觉与品牌设计", "时尚与空间陈列", "用户体验与界面设计", "艺术与文化策划"], strength: "你可能对色彩、比例和氛围敏感，也享受把细节调整得更协调。" }
  ];
  const stems = [
    ["我喜欢用故事、文字或谈话表达自己的想法。", "读到新内容时，我会留意措辞和表达方式。", "我能把复杂的事情讲得比较清楚。", "我享受写作、阅读或参与有深度的对话。", "我会主动斟酌怎样表达，才能让别人更容易理解。", "写下想法能帮我理清思路。"],
    ["遇到难题时，我会先拆解条件再逐步推理。", "我喜欢寻找数字、信息或现象背后的规律。", "我会用证据检查自己的判断是否可靠。", "安排任务时，我倾向先建立清楚的步骤。", "我享受解谜、分析或优化一个系统。", "面对不同说法，我会比较依据和逻辑。"],
    ["我能想象物品移动或组合后的样子。", "我会留意空间布局、方向和视觉结构。", "看地图或图示通常能帮助我理解信息。", "我喜欢通过画图、模型或草图表达想法。", "整理房间或摆放物品时，我会考虑整体布局。", "我能在脑中想象从不同角度观察一个物体。"],
    ["我容易记住旋律、节奏或声音细节。", "音乐会明显影响我的情绪或专注状态。", "我喜欢唱歌、演奏或尝试声音创作。", "我能听出不同声音之间的变化。", "听过几次的旋律常会留在我脑海里。", "我会用节奏或音乐帮助自己进入状态。"],
    ["我通过亲手操作往往学得更快。", "我喜欢运动、舞蹈或需要身体协调的活动。", "我擅长使用工具或完成精细的动手任务。", "长时间坐着不动会让我难以集中。", "遇到新事物，我常想亲自试一试。", "我能通过动作示范来表达或学习。"],
    ["我能察觉他人的情绪或谈话中的气氛变化。", "朋友遇到困难时，我愿意倾听并理解他们。", "我善于协调不同意见，让大家继续合作。", "我喜欢与人一起完成目标。", "我会留意别人是否被忽略，并尝试让他们参与。", "我常能根据对象调整沟通方式。"],
    ["我会花时间思考自己的感受和真实需要。", "我知道什么样的目标对自己最有意义。", "独处和复盘能帮助我恢复状态或找到方向。", "我愿意从经验中总结自己学到了什么。", "我能分辨哪些选择符合自己的价值观。", "我对自己的情绪变化通常比较敏感。"],
    ["我会关注植物、动物或环境中的细微变化。", "在自然环境里观察和活动让我感到舒展。", "我喜欢辨认、收集或整理自然相关的信息。", "我会好奇一种食物、植物或天气现象从何而来。", "我乐于照料植物或观察动物的习性。", "我会留意季节、生态或周边环境的变化。"],
    ["我常会想到不止一种解决问题的方法。", "我喜欢尝试新点子，而不是总沿用旧做法。", "我能把不同领域的想法组合成新方案。", "面对开放任务，我享受探索多种可能性。", "即使方案不成熟，我也愿意先做个小实验。", "我常会想象事情还可以有哪些不同做法。"],
    ["我会注意色彩、比例和细节是否协调。", "我喜欢改善物品或空间的视觉呈现。", "我能感觉到设计或环境带来的氛围差异。", "我愿意花时间打磨作品的视觉细节。", "我会留意日常物品的材质、造型与质感。", "对我来说，形式和体验也会影响一件事的品质。"]
  ];
  const options = ["完全不像我", "比较不像我", "不确定", "比较像我", "非常像我"];
  function getQuestions(length) {
    const total = Number(length);
    if (![40, 100, 200].includes(total)) throw new RangeError("测评题量必须为 40、100 或 200 题。");
    const questions = Array.from({ length: total }, (_, index) => {
      const talentIndex = index % talents.length;
      const round = Math.floor(index / talents.length);
      const pool = stems[talentIndex];
      let q = pool[round % pool.length];
      if (round >= pool.length) {
        const contexts = ["在学习或工作中，", "和朋友相处时，", "面对日常选择时，", "回想最近的经历，", "在新的环境里，", "当我有自由安排时间时，", "遇到不熟悉的任务，", "在团队合作中，"];
        q = contexts[Math.floor(round / pool.length) % contexts.length] + q.charAt(0).toLowerCase() + q.slice(1);
      }
      return { q, t: talentIndex, options: options.slice() };
    });
    // Shuffle questions while keeping a balanced spread across all ten dimensions.
    for (let i = questions.length - 1; i > 0; i--) {
      const j = (i * 7 + Math.floor(i / 3) * 11) % (i + 1);
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }
  function calculate(answers, questions) {
    const totals = Array(talents.length).fill(0), counts = Array(talents.length).fill(0);
    questions.forEach((question, index) => {
      const value = answers[index];
      if (!Number.isInteger(value) || value < 0 || value > 4 || !Number.isInteger(question.t) || question.t < 0 || question.t >= talents.length) return;
      totals[question.t] += value; counts[question.t]++;
    });
    const scores = talents.map((talent, index) => ({ ...talent, index, score: counts[index] ? Math.round((totals[index] / (counts[index] * 4)) * 100) : 0 }));
    return { scores, answered: answers.filter(Number.isInteger).length, total: questions.length };
  }
  window.TalentTest = { talents, getQuestions, calculate };
})();
