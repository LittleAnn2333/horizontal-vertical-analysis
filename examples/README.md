# Examples

本文件夹提供可以直接跑通的示例,帮助你理解 skill 的工作方式。

## virtual-company-X/

**完全虚构**的示例:虚构公司"沧澜半导体(600999.SH)" — 一家虚构的功率半导体公司。

- `input-data.json` — 喂给 `generate_report.js` 的完整 JSON 数据(虚构)
- `output-report.docx` — 生成的最终 Word 报告

### 跑通示例

```bash
# 假设你已经在仓库根目录
node stock-deep-research/scripts/generate_report.js \
  --data examples/virtual-company-X/input-data.json \
  --output /tmp/my-test-report.docx
```

打开 `/tmp/my-test-report.docx` 应该能看到一份完整的 9 章研究报告。

### 这个示例展示了什么

1. **完整的 v3 schema** — 包含所有 v3 新增字段(key_decisions / industry_chain_position / moats / valuation_math / short_long_logic / 5 列打折清单)
2. **典型的"双业务过渡型"公司** — IGBT 老业务 + SiC 新业务,这种"老业务造血、新业务接力"的结构在制造业很常见
3. **诚实的护城河分级** — 三个护城河中,一个被明确标注为"阶段性优势"(比亚迪客户依赖),而不是粉饰成全是结构性

### 不要混淆

**所有数字均为虚构**,不代表任何真实公司。如要查看真实标的报告示例,见项目主 README 提到的真实案例(澜起科技、网宿科技、泰金新能),但出于数据来源的合规性,本仓库不提供这些真实标的的完整 input JSON,只提供输出 docx 作为质感参考。

## 如果想自己跑一个真实标的

参考 `stock-deep-research/SKILL.md` 中的工作流,可以在 Claude.ai 上装载这个 skill 后:
1. 给 Claude 喂入你收集的素材(金融工具一页纸、研报、年报等)
2. Claude 走完 Step 1 素材体检 → Step 3.5 骨架预览 → Step 4 报告生成
3. 用 `generate_report.js` 输出 .docx
