# Changelog

本项目的所有显著变化记录在此文件中。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [v3.0.0] - 2026-05

### 重大变更

对标专业卖方研究的 6 项改造:

- **新增**: 5 个关键决策时刻清单化(`vertical_analysis.key_decisions`)——纵向分析末尾用 H3 独立小节列出"决策一/二/三/四/五"
- **新增**: 产业链位置独立小节(`horizontal_analysis.industry_chain_position`)——上游/下游/位置价值三要素
- **新增**: 核心竞争力与护城河独立成章(第五章 `moats`)——每个护城河按"类型/性质/路径/持续性/证据"五要素展开
- **新增**: 三剧本估值锚算式(`intersection.scenarios.*.valuation_math`)——每个剧本必须给 PE 锚或 PB 锚的具体算式
- **新增**: 短期 vs 长期逻辑分段(`intersection.short_long_logic`)
- **新增**: 数据缺口显性标注规则——正文里直接说"现有资料无法精确推算"

### 兼容性

所有 v3 新字段都是**可选**的,老数据(v1/v2)无修改可继续跑。但新报告应该全部填上以体现 v3 价值。

## [v2.0.0] - 2026-05

### 重大变更

- **新增**: 素材体检分级(Tier 1/2/3 严格度)——避免"看似数据齐全实则方向写反"
- **新增**: 分析骨架预览(Step 3.5)——在写完整报告前给用户确认核心判断
- **新增**: 信源打折清单 5 列(添加重要性标签 🔴 支柱 / 🟡 辅助 / 🟢 背景)
- **新增**: `references/material_tiers.md` — 数据分级判断清单

## [v1.0.0] - 2026-05

### 首次发布

- 横纵分析框架 + 金融视角双层方法论
- 8 章固定报告结构(从一句话定义到信源打折清单)
- generate_report.js 基础脚本(Node.js + docx)
- references/ 下三份核心文档:framework / financial_lens / input_checklist

## 已知瑕疵(等待修复)

- **Markdown 加粗符号不被解析**:JSON 正文里写 `**xxx**` 会显示原始符号,不是粗体。临时方案是不在 JSON 内容里用 markdown 加粗,改用 H2/H3 标题等结构化手段强调。
- **章节序号硬编码**:如果某个可选章节(如 `moats`)被跳过,序号会断裂(四→六)。
