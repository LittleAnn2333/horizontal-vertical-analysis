# 横纵分析 · Horizontal-Vertical Analysis

> 一个 skill,用"横纵分析框架 + 金融视角"双层方法论,把杂乱的股票研究素材结构化成一份既好读又严谨的 Word 研究报告。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v3.0-blue.svg)](./CHANGELOG.md)
[![Skill Format](https://img.shields.io/badge/format-Claude%20Skill-orange.svg)](https://docs.claude.com/)

---

## 这是什么

一份给 [Claude](https://claude.ai) 用的 skill,专门做**上市公司深度研究**。融合两种方法论:

- **横纵分析框架** —— Saussure 语言学的"历时-共时"思想 + 商学院案例研究法。强项是讲清楚一家公司"为什么长成今天这样"的因果链。
- **金融视角** —— 卖方研究的财务/产业链/估值分析模块。强项是把"账本上到底多少"讲精确。

最终产出 18-25 页的 Word 研究报告,**既保留叙事力又保留数据密度**。

---

## 它能解决什么问题

如果你做股票研究,通常的工作流是这样的:

1. ✅ 你已经能从金融工具(同花顺/Choice/Wind 等)里拿到大量原始数据
2. ✅ 你已经看过几篇卖方研报
3. ✅ 你已经追踪了最近的产业新闻
4. ❌ **但你卡在了"把这些杂乱素材结构化成一份能讲清楚因果、能给出判断、能传递给同事的产物"这一步**

这个 skill 解决的就是第 4 步。它**不接入任何数据 API**,完全基于你已有的素材做深加工。

---

## 产出长什么样

样例报告见 [`examples/virtual-company-X/output-report.docx`](./examples/virtual-company-X/output-report.docx)(虚构公司,纯演示用)。

每份报告固定 9 章结构:

1. **一句话定义**
2. **纵向分析** —— 阶段叙述 + 5 个关键决策时刻清单化
3. **横向分析** —— 产业链位置 + 三层对手 + 估值对照表
4. **业务与财务底盘** —— 分板块/财务/客户供应商/现金流
5. **核心竞争力与护城河** —— 每个护城河按"类型/性质/路径/持续性/证据"五要素展开
6. **横纵交汇** —— 决策路径 + 短期/长期逻辑 + 三剧本+估值算式
7. **调研提纲与跟踪指标**
8. **风险提示**
9. **信源与打折清单** —— 5 列含重要性标签(🔴 支柱 / 🟡 辅助 / 🟢 背景)

---

## 工作流

```
Step 1: 素材体检(Tier 分级)
   ↓
Step 2: 公开信息补全(可选)
   ↓
Step 3: 内部结构化分析
   ↓
Step 3.5: 分析骨架预览(给用户确认) ← 不要跳过这一步
   ↓
Step 4: 生成 Word 报告
```

**Step 1 和 Step 3.5 是本 skill 最有价值的两个设计点**——前者避免"数据缺口导致结论方向写反",后者让用户在最低成本的时间点介入推理过程。详细见 [`docs/workflow.md`](./docs/workflow.md)。

---

## 快速开始

### 方式 A:在 Claude.ai 上装载 skill(推荐)

1. 下载 [`stock-deep-research.skill`](./stock-deep-research.skill) 文件
2. 在 Claude.ai 进入 **Customize → Skills**,上传该文件
3. 开个新对话,试一句:
   > 帮我研究一下 [某公司],这是我的素材...
   > [然后粘贴你收集的资料]
4. Claude 会自动触发 5 步工作流,最终给你一份 .docx 报告

### 方式 B:命令行直接跑 generate_report.js

如果你已经有了完整的 JSON 数据(参考 [`examples/virtual-company-X/input-data.json`](./examples/virtual-company-X/input-data.json) 的结构),可以直接跑脚本:

```bash
git clone https://github.com/LittleAnn2333/horizontal-vertical-analysis.git
cd horizontal-vertical-analysis

# 安装 docx 依赖
npm install -g docx

# 跑示例
node stock-deep-research/scripts/generate_report.js \
  --data examples/virtual-company-X/input-data.json \
  --output /tmp/my-test-report.docx
```

打开 `/tmp/my-test-report.docx` 应该能看到一份完整的 9 章报告。

---

## 项目结构

```
horizontal-vertical-analysis/
├── stock-deep-research/        # skill 主体
│   ├── SKILL.md                # 主指令(Claude 读取)
│   ├── README.md               # skill 自身说明
│   ├── references/             # 引用文档
│   │   ├── framework.md        # 横纵分析框架完整说明
│   │   ├── financial_lens.md   # 金融视角分析维度清单
│   │   ├── input_checklist.md  # 用户准备素材的指南
│   │   └── material_tiers.md   # 素材分级判断清单
│   └── scripts/
│       └── generate_report.js  # Word 报告生成脚本
│
├── stock-deep-research.skill   # 打包好的 .skill 文件(给不看源码的人直接用)
│
├── examples/
│   ├── README.md
│   └── virtual-company-X/      # 虚构公司完整样例
│       ├── input-data.json
│       └── output-report.docx
│
├── docs/                       # 详细文档
│   ├── workflow.md             # 五步工作流详解
│   ├── tier-system.md          # 素材分级体系
│   └── design-principles.md    # 设计原则与方法论
│
├── README.md                   # 本文件
├── LICENSE                     # MIT
├── CHANGELOG.md                # 版本变更历史
├── CONTRIBUTING.md             # 贡献指南
└── .gitignore
```

---

## 设计原则

这个项目背后有几个值得展开的设计决策(详见 [`docs/design-principles.md`](./docs/design-principles.md)):

1. **这是一个框架项目,不是数据接入项目** —— 我们解决"数据加工"而不是"数据收集"
2. **融合叙事力与金融严谨** —— 避免"太干瘪(像研报数据库)"或"太空(像公众号软文)"
3. **不出具体目标价,但要给可调试的估值算式** —— 三剧本概率分布 + PE/PB 锚算式
4. **诚实标注数据缺口和推断质量** —— 打折清单 + 正文显性标注双重透明
5. **让用户参与推理过程** —— 骨架预览强制让用户在最低成本时点介入
6. **横纵分析框架** —— 历时分析 + 共时分析 + 决策路径锁定

---

## 已知瑕疵

诚实告知:

1. **Markdown 加粗符号(`**xxx**`)不被解析为 docx 加粗**,目前会显示原始符号。临时方案:JSON 内容里不要用 markdown 加粗符号。根本方案需要给 generate_report.js 加 markdown→docx-TextRun 解析器。
2. **章节序号硬编码**,如果某个可选章节(如 `moats`)被跳过,序号会断裂(四→六)。新报告填全字段即可避免。

欢迎 PR 修复。

---

## 适用场景

✅ **适合**:
- 对单一上市公司做系统性深度研究
- 把零散素材结构化成可传递的产物
- 给团队同事/客户/合作伙伴的"基本面研究底稿"

❌ **不适合**:
- 实时量化交易(没有数据 API 接入)
- 行业整体分析(本 skill 是单一公司视角)
- 短线技术分析(本 skill 是基本面 + 估值视角)

---

## 重要声明

> **本 skill 产出的研究报告不构成任何投资建议**。框架的目的是辅助思考,不是替代判断。
>
> 维护者和贡献者对使用本 skill 产生的任何投资决策不承担责任。

---

## 贡献

欢迎以多种方式贡献 —— 报告 issue、改进 SKILL.md 指引、扩展 references/、修复脚本瑕疵、分享实战案例。详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

特别期待这几个方向的贡献:

- **不同行业类型的 Tier 1 数据清单** —— 当前清单偏向科技/制造业,医药/消费品/金融业可能需要不同维度
- **修复 markdown 渲染问题** —— 给 generate_report.js 加解析器
- **多语言报告支持** —— 当前只生成中文报告,英文版欢迎贡献

---

## 致谢

- 横纵分析方法论灵感来自 Saussure 的"历时-共时"语言学思想 + 商学院案例研究法
- 报告生成基于 [docx](https://github.com/dolanmiu/docx) Node.js 库
- 整个 skill 在 [Claude](https://claude.ai) 协助下迭代完成,经过网宿科技、澜起科技、泰金新能等多个真实标的的实战验证

---

## License

[MIT](./LICENSE) © 2026 [LittleAnn2333](https://github.com/LittleAnn2333)
