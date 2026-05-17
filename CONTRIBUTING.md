# Contributing to Horizontal-Vertical Analysis

感谢你考虑为这个项目贡献!这个 skill 是一个"边用边迭代"的项目,任何形式的反馈和贡献都是有价值的。

## 贡献的几种方式

### 1. 报告问题(Issue)

发现 bug、不合理的设计、或者 SKILL.md 里有遗漏?请开 Issue。

好的 Issue 应该包含:
- 你用什么标的触发的(尽量用公开标的)
- Claude 给出了什么样的产出
- 你期望它给出什么样的产出
- 如果可能,贴一段 Claude 的实际对话片段(可截图,可文字)

### 2. 改进 SKILL.md / references/ (主要贡献方式)

这个项目的核心价值在于**分析框架**而不是代码。所以最有价值的贡献是:

- **完善 references/material_tiers.md**:增加对某个特定行业(医药/消费/制造)的 Tier 1 数据清单
- **完善 references/framework.md**:补充某个分析维度的判断标准
- **完善 SKILL.md 的写作风格指引**:增加新的"好/坏写法"对照

提 PR 时请说明:这条改动是基于什么实际场景发现的痛点。

### 3. 改进 generate_report.js

代码层面的改进空间:

- **已知瑕疵 1**:Markdown 加粗符号(`**xxx**`)不被解析为 docx 加粗,目前会显示原始符号。需要加 markdown→docx-TextRun 解析器。
- **已知瑕疵 2**:章节序号硬编码,如果某个可选章节(如 `moats`)被跳过,序号会断裂(四→六)。需要改为根据实际渲染章节动态生成序号。
- **新功能想法**:支持插入图片(产业链图、市占率图)
- **新功能想法**:支持多语言报告(英文版)

### 4. 分享你的实战案例

如果你用这个 skill 跑出了一份满意的报告,欢迎在 Issue 或 Discussion 里分享:

- 标的代码和行业类型
- 数据完整度(Mode A 还是 Mode B?素材体检 Tier 1 的覆盖度)
- 报告中哪些章节做得最好/最差
- 你后续怎么用这份报告

这些反馈对 skill 迭代极其重要。

## 开发流程

### 本地测试

```bash
git clone https://github.com/LittleAnn2333/horizontal-vertical-analysis.git
cd horizontal-vertical-analysis

# 安装依赖
npm install -g docx

# 跑示例
node stock-deep-research/scripts/generate_report.js \
  --data examples/virtual-company-X/input-data.json \
  --output /tmp/test-output.docx
```

### 提 PR 前的检查

1. 跑通示例(确保你的改动没破坏现有功能)
2. 如果改的是 generate_report.js,用 `examples/virtual-company-X/` 数据测一遍
3. 如果改的是 SKILL.md 或 references/,在 Claude.ai 上实际触发一次,看 Claude 的反应是不是符合预期

## 行为准则

- 礼貌、尊重、就事论事
- 不要在 Issue 里贴具体公司的非公开数据(知识产权)
- 不要在样例里用真实的内部财务工具数据,只用公开数据

## 关于"分析判断"的免责声明

本 skill 产出的研究报告**不构成任何投资建议**。框架的目的是辅助思考,不是替代判断。维护者和贡献者对使用本 skill 产生的任何投资决策不承担责任。

## 联系方式

有不适合发 Issue 的话题(比如"我想用这个 skill 做一个商业产品,可以吗?")可以在 Discussion 区开帖。

MIT 协议允许任何形式的使用,包括商业化。但如果你做了商业化版本,简单告诉我一下(不是要求),我会很开心。
