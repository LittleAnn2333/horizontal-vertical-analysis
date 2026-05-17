#!/usr/bin/env node
/**
 * Stock Deep Research Report Generator
 *
 * 用法:
 *   node generate_report.js --data <path-to-json> --output <path-to-output-docx>
 *
 * report_data.json 结构(完整字段):
 * {
 *   "title": "泰金新能 横纵分析报告",
 *   "subtitle": "688813.SH",  // 可选
 *   "analyst": "Victoria",
 *   "research_date": "2026-05-14",
 *   "domain": "高端电解装备 / 铜箔产业链 / AI-PCB",
 *   "research_question": "当前位置还能看多少空间——估值、产能、订单、竞争格局视角",
 *
 *   "one_liner": "一句话定义的正文内容...",
 *
 *   "vertical_analysis": {
 *     "intro": "纵向分析的开场段落...",
 *     "stages": [
 *       {
 *         "title": "阶段一:钛电极的小日子(2000-2009)",
 *         "content": "这个阶段的叙事内容..."
 *       },
 *       ...
 *     ],
 *     "lock_in_moments": "锁定时刻的总结性导语段落(2-3 句话引出后面的清单)...",
 *     "key_decisions": [   // v3 新增:5 个关键决策时刻清单化
 *       {
 *         "title": "决策一:从 IDC 转向 CDN",
 *         "content": "这是公司第一次从'资源生意'升级到'能力生意'..."
 *       },
 *       ...
 *     ]
 *   },
 *
 *   "horizontal_analysis": {
 *     "intro": "横向分析的开场...",
 *     "industry_chain_position": {   // v3 新增:产业链位置独立小节
 *       "narrative": "本公司位于产业链的什么环节,上下游分别是什么...",
 *       "upstream": "上游构成与议价关系简述",
 *       "downstream": "下游构成与议价关系简述",
 *       "position_value": "这个位置的核心价值/弱点,在不同行业周期下如何变化"
 *     },
 *     "competitors_direct": "第一层:直接竞争对手的分析正文...",
 *     "competitors_extended": "第二层:上下游延伸者的分析...",
 *     "valuation_anchor": "第三层:估值对照组分析...",
 *     "overseas_benchmark": "海外标杆段落(可选,没有则留空)",
 *     "valuation_table": {
 *       "headers": ["公司", "代码", "市值(亿)", "PB", "EV/EBITDA", "PE-TTM", "PE-NTM", "营收(亿)", "归母(亿)"],
 *       "rows": [
 *         ["泰金新能", "688813.SH", "150", "11.24", "79.99", "—", "60-80x估", "23.95", "2.04"],
 *         ...
 *       ]
 *     }
 *   },
 *
 *   "financial_lens": {
 *     "intro": "业务与财务底盘的开场...",
 *     "business_segments": "分板块业务拆解正文...",
 *     "business_segments_table": {
 *       "headers": ["业务板块", "2025H1", "2024", "2023", "2022"],
 *       "rows": [...]
 *     },
 *     "key_financials": "关键财务指标分析正文...",
 *     "key_financials_table": {
 *       "headers": ["项目", "2026Q1", "2025", "2024", "2023", "2022"],
 *       "rows": [...]
 *     },
 *     "customers_suppliers": "客户与供应商分析正文...",
 *     "cash_and_balance": "现金流与资产负债分析正文..."
 *   },
 *
 *   "moats": {   // v3 新增:核心竞争力与护城河(独立章节,在横纵交汇之前)
 *     "intro": "护城河章节的开场段落(可选)...",
 *     "items": [
 *       {
 *         "title": "优势一:全球分布式节点网络 + 调度运营能力",
 *         "moat_type": "产业链卡位 + 成本优势 + 转换成本",
 *         "nature": "结构性优势",   // 或 "阶段性优势"
 *         "monetization": "怎么把这个优势转化成利润的路径分析...",
 *         "durability": "未来 2-3 年这个优势会变强/维持/变弱及理由...",
 *         "evidence": "可验证的硬证据/数据点(可选)..."
 *       },
 *       ...
 *     ]
 *   },
 *
 *   "intersection": {
 *     "intro": "横纵交汇章节开场...",
 *     "advantage_roots": "优势的历史根源段落...",
 *     "disadvantage_roots": "劣势的历史根源段落...",
 *     "short_long_logic": {   // v3 新增:短期 vs 长期投资逻辑分段
 *       "short_term": "短期逻辑(1-3 个月):催化事件、主题轮动等内容...",
 *       "long_term": "长期逻辑(1-3 年):基本面演进、产业趋势等内容..."
 *     },
 *     "scenarios": {
 *       "base": {
 *         "title": "Base case(基础情景):60-80% 兑现",
 *         "logic": "逻辑链条段落",
 *         "valuation_math": "估值算式(v3 新增,可选):比如 '2026E EPS 0.35 元 × 假设 PE 50-60 倍 = 市值 430-520 亿' 或 '净资产 103.8 亿 × PB 4.5-5.0 倍 = 市值 467-519 亿'",
 *         "key_tracking": ["指标 1", "指标 2", "指标 3"],
 *         "space": "对应空间:相对当前 +20-50%"
 *       },
 *       "upside": { ...同结构 },
 *       "downside": { ...同结构 }
 *     },
 *     "judgment_framework": "写给用户的核心判断框架正文..."
 *   },
 *
 *   "research_outline": {
 *     "intro": "调研提纲开场...",
 *     "topics": [
 *       {
 *         "topic": "1. 订单与下游需求",
 *         "background": "背景描述",
 *         "questions": ["问题 1", "问题 2", ...]
 *       },
 *       ...
 *     ],
 *     "tracking_indicators": ["指标 1", "指标 2", ...]
 *   },
 *
 *   "risks": [
 *     { "title": "风险 1 标题", "description": "具体说明" },
 *     ...
 *   ],
 *
 *   "sources": {
 *     "intro": "信源章节开场...",
 *     "discount_table": {
 *       "headers": ["关键论点", "来源", "打折理由", "折扣", "重要性"],
 *       "column_width_ratios": [3, 2, 3, 1, 1],  // 可选,自定义列宽
 *       "rows": [
 *         ["论点 X", "来源 Y", "理由 Z", "5 折", "🔴"],   // 🔴 支柱
 *         ["论点 A", "来源 B", "理由 C", "0 折", "🟡"],   // 🟡 辅助
 *         ["论点 D", "来源 E", "理由 F", "9 折", "🟢"]    // 🟢 背景
 *       ]
 *     },
 *     "methodology_note": "方法论说明段落"
 *   }
 * }
 *
 * 任何 table 字段都支持可选的 column_width_ratios(数组,长度等于 headers 长度,
 * 表示各列宽度比例)。不传则等宽分配。
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber,
  PageBreak, TabStopType, TabStopPosition, convertInchesToTwip
} = require('docx');

// ============================================================
// 解析命令行参数
// ============================================================
function parseArgs() {
  const args = process.argv.slice(2);
  let dataPath = null;
  let outputPath = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--data' && i + 1 < args.length) {
      dataPath = args[i + 1];
      i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
      outputPath = args[i + 1];
      i++;
    }
  }
  if (!dataPath || !outputPath) {
    console.error('Usage: node generate_report.js --data <path> --output <path>');
    process.exit(1);
  }
  return { dataPath, outputPath };
}

// ============================================================
// 排版常量
// ============================================================
const COLOR_PRIMARY = "1F3A5F";        // 深蓝(机构感)
const COLOR_SECONDARY = "6B7280";       // 中灰
const COLOR_ACCENT = "B91C1C";          // 暗红(用于关键判断)
const COLOR_TABLE_HEAD_BG = "1F3A5F";   // 表头背景:深蓝
const COLOR_TABLE_HEAD_TEXT = "FFFFFF"; // 表头文字:白
const COLOR_TABLE_BORDER = "CCCCCC";    // 表格边框:浅灰
const COLOR_TABLE_ALT_BG = "F5F5F5";    // 表格隔行背景:浅灰

const FONT_CJK = "思源宋体";  // 中文主字体(开源,跨平台)
const FONT_CJK_FALLBACK = "宋体";  // Windows 内置宋体作为兜底
const FONT_LATIN = "Times New Roman";  // 英文/数字字体

// 页面尺寸:US Letter
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const PAGE_MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * PAGE_MARGIN; // 9360

// ============================================================
// 基础组件工厂函数
// ============================================================

/**
 * 创建一个普通段落(正文)
 */
function makePara(text, opts = {}) {
  const {
    bold = false,
    italic = false,
    color = "000000",
    fontSize = 22,        // 11pt = 22 half-points
    alignment = AlignmentType.JUSTIFIED,
    spaceBefore = 0,
    spaceAfter = 120,     // 段后 6pt
    indent = null,
  } = opts;

  return new Paragraph({
    alignment,
    spacing: { before: spaceBefore, after: spaceAfter, line: 360 }, // 1.5 倍行距
    indent,
    children: [
      new TextRun({
        text: text || "",
        bold,
        italics: italic,
        color,
        size: fontSize,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  });
}

/**
 * 处理一段可能包含换行的长文本——拆成多个段落
 */
function makeParas(text, opts = {}) {
  if (!text) return [];
  const lines = text.split(/\n\n+/).filter(l => l.trim());
  return lines.map(line => makePara(line.trim(), opts));
}

/**
 * 创建一个章节标题(H1)
 */
function makeH1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 240 },
    pageBreakBefore: true,
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32,  // 16pt
        color: COLOR_PRIMARY,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  });
}

/**
 * 二级标题(H2)
 */
function makeH2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,  // 13pt
        color: COLOR_PRIMARY,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  });
}

/**
 * 三级标题(H3)
 */
function makeH3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,  // 12pt
        color: "000000",
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  });
}

/**
 * 列表项(项目符号)
 */
function makeBullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 80, line: 320 },
    children: [
      new TextRun({
        text,
        size: 22,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  });
}

/**
 * 创建一个表格单元格
 */
function makeCell(text, opts = {}) {
  const {
    isHeader = false,
    width = 2000,
    alignment = AlignmentType.LEFT,
    altRow = false,
  } = opts;

  const border = { style: BorderStyle.SINGLE, size: 4, color: COLOR_TABLE_BORDER };
  const bgColor = isHeader ? COLOR_TABLE_HEAD_BG : (altRow ? COLOR_TABLE_ALT_BG : "FFFFFF");

  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: { top: border, bottom: border, left: border, right: border },
    shading: { fill: bgColor, type: ShadingType.CLEAR },
    children: [
      new Paragraph({
        alignment,
        children: [
          new TextRun({
            text: String(text ?? ""),
            bold: isHeader,
            color: isHeader ? COLOR_TABLE_HEAD_TEXT : "000000",
            size: isHeader ? 20 : 20,  // 10pt
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
          }),
        ],
      }),
    ],
  });
}

/**
 * 创建一个完整的表格
 * tableData: { headers: [...], rows: [[...], [...]] }
 */
function makeTable(tableData) {
  if (!tableData || !tableData.headers || !tableData.rows) return null;

  const numCols = tableData.headers.length;

  // 支持 column_width_ratios 自定义列宽(可选,向后兼容)
  // 例如打折清单 5 列可设 [3, 2, 3, 1, 1],"重要性"列只放 emoji 用窄列
  let columnWidths;
  if (Array.isArray(tableData.column_width_ratios) &&
      tableData.column_width_ratios.length === numCols) {
    const totalRatio = tableData.column_width_ratios.reduce((a, b) => a + b, 0);
    columnWidths = tableData.column_width_ratios.map(r =>
      Math.floor(CONTENT_WIDTH * r / totalRatio)
    );
    // 修正最后一列以保证总和精确等于 CONTENT_WIDTH
    columnWidths[numCols - 1] =
      CONTENT_WIDTH - columnWidths.slice(0, -1).reduce((a, b) => a + b, 0);
  } else {
    const colWidth = Math.floor(CONTENT_WIDTH / numCols);
    columnWidths = Array(numCols).fill(colWidth);
    columnWidths[numCols - 1] = CONTENT_WIDTH - colWidth * (numCols - 1);
  }

  const headerRow = new TableRow({
    tableHeader: true,
    children: tableData.headers.map((h, i) =>
      makeCell(h, {
        isHeader: true,
        width: columnWidths[i],
        alignment: AlignmentType.CENTER,
      })
    ),
  });

  const bodyRows = tableData.rows.map((row, rowIdx) =>
    new TableRow({
      children: row.map((cell, i) =>
        makeCell(cell, {
          width: columnWidths[i],
          alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
          altRow: rowIdx % 2 === 1,
        })
      ),
    })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths,
    rows: [headerRow, ...bodyRows],
  });
}

// ============================================================
// 封面页
// ============================================================
function makeCoverPage(data) {
  const items = [];

  // 顶部留白
  items.push(new Paragraph({ spacing: { before: 2400 }, children: [new TextRun({ text: "" })] }));

  // CONFIDENTIAL 标记(左对齐,模仿参考1)
  items.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 480 },
    children: [
      new TextRun({
        text: "CONFIDENTIAL",
        bold: true,
        color: COLOR_SECONDARY,
        size: 18,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  }));

  // 大标题
  items.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 240 },
    children: [
      new TextRun({
        text: data.title || "深度研究报告",
        bold: true,
        size: 56,  // 28pt
        color: COLOR_PRIMARY,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  }));

  // 副标题(股票代码)
  if (data.subtitle) {
    items.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 720 },
      children: [
        new TextRun({
          text: data.subtitle,
          size: 28,
          color: COLOR_SECONDARY,
          font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
        }),
      ],
    }));
  }

  // 元信息
  const metaItems = [
    data.analyst ? `分析师:${data.analyst}` : null,
    data.research_date ? `研究时间:${data.research_date}` : null,
    data.domain ? `所属领域:${data.domain}` : null,
  ].filter(Boolean);

  metaItems.forEach(line => {
    items.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: line,
          size: 22,
          color: "000000",
          font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
        }),
      ],
    }));
  });

  if (data.research_question) {
    items.push(new Paragraph({ spacing: { before: 240 }, children: [new TextRun({ text: "" })] }));
    items.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: "研究问题:",
          bold: true,
          size: 22,
          font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
        }),
      ],
    }));
    items.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: data.research_question,
          size: 22,
          italics: true,
          color: COLOR_SECONDARY,
          font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
        }),
      ],
    }));
  }

  // 方法论说明(底部)
  items.push(new Paragraph({ spacing: { before: 4800 }, children: [new TextRun({ text: "" })] }));
  items.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({
        text: "方法论:横纵分析法(融合横纵分析框架与金融视角)",
        size: 18,
        color: COLOR_SECONDARY,
        italics: true,
        font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
      }),
    ],
  }));

  return items;
}

// ============================================================
// 各章节构建
// ============================================================

// 第一章:一句话定义
function buildOneLiner(data) {
  const items = [];
  items.push(makeH1("一、一句话定义"));
  if (data.one_liner) {
    items.push(...makeParas(data.one_liner, { fontSize: 24 }));  // 12pt,稍大
  }
  return items;
}

// 第二章:纵向分析
function buildVerticalAnalysis(data) {
  const items = [];
  const v = data.vertical_analysis || {};
  items.push(makeH1("二、纵向分析:历史决策与路径依赖"));

  if (v.intro) {
    items.push(...makeParas(v.intro));
  }

  if (v.stages && Array.isArray(v.stages)) {
    v.stages.forEach(stage => {
      items.push(makeH2(stage.title || ""));
      if (stage.content) {
        items.push(...makeParas(stage.content));
      }
    });
  }

  if (v.lock_in_moments) {
    items.push(makeH2("阶段总结:几个'锁定时刻'"));
    items.push(...makeParas(v.lock_in_moments));
  }

  // v3 新增:5 个关键决策时刻清单化
  if (v.key_decisions && Array.isArray(v.key_decisions) && v.key_decisions.length > 0) {
    items.push(makeH2("真正锁定路径的关键决策"));
    v.key_decisions.forEach(d => {
      items.push(makeH3(d.title || ""));
      if (d.content) items.push(...makeParas(d.content));
    });
  }

  return items;
}

// 第三章:横向分析
function buildHorizontalAnalysis(data) {
  const items = [];
  const h = data.horizontal_analysis || {};
  items.push(makeH1("三、横向分析:三层对手与估值对照"));

  if (h.intro) items.push(...makeParas(h.intro));

  // v3 新增:产业链位置独立小节
  if (h.industry_chain_position) {
    const icp = h.industry_chain_position;
    items.push(makeH2("产业链位置"));
    if (icp.narrative) items.push(...makeParas(icp.narrative));
    if (icp.upstream) {
      items.push(new Paragraph({
        spacing: { before: 120, after: 80 },
        children: [
          new TextRun({ text: "上游:", bold: true, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          new TextRun({ text: " " + icp.upstream, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
        ],
      }));
    }
    if (icp.downstream) {
      items.push(new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "下游:", bold: true, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          new TextRun({ text: " " + icp.downstream, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
        ],
      }));
    }
    if (icp.position_value) {
      items.push(new Paragraph({
        spacing: { before: 80, after: 120 },
        children: [
          new TextRun({ text: "位置价值:", bold: true, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          new TextRun({ text: " " + icp.position_value, size: 22,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
        ],
      }));
    }
  }

  if (h.competitors_direct) {
    items.push(makeH2("第一层:直接竞争对手"));
    items.push(...makeParas(h.competitors_direct));
  }

  if (h.competitors_extended) {
    items.push(makeH2("第二层:上下游延伸者"));
    items.push(...makeParas(h.competitors_extended));
  }

  if (h.valuation_anchor) {
    items.push(makeH2("第三层:估值对照板块"));
    items.push(...makeParas(h.valuation_anchor));
  }

  if (h.overseas_benchmark) {
    items.push(makeH2("海外标杆与稀缺性溢价"));
    items.push(...makeParas(h.overseas_benchmark));
  }

  if (h.valuation_table) {
    items.push(makeH2("估值横向对照"));
    items.push(makeTable(h.valuation_table));
    items.push(makePara("")); // 表格后空段
  }

  return items;
}

// 第四章:业务与财务底盘
function buildFinancialLens(data) {
  const items = [];
  const f = data.financial_lens || {};
  items.push(makeH1("四、业务与财务底盘"));

  if (f.intro) items.push(...makeParas(f.intro));

  if (f.business_segments) {
    items.push(makeH2("业务结构拆解"));
    items.push(...makeParas(f.business_segments));
    if (f.business_segments_table) {
      items.push(makeTable(f.business_segments_table));
      items.push(makePara(""));
    }
  }

  if (f.key_financials) {
    items.push(makeH2("关键财务指标"));
    items.push(...makeParas(f.key_financials));
    if (f.key_financials_table) {
      items.push(makeTable(f.key_financials_table));
      items.push(makePara(""));
    }
  }

  if (f.customers_suppliers) {
    items.push(makeH2("客户与供应商"));
    items.push(...makeParas(f.customers_suppliers));
  }

  if (f.cash_and_balance) {
    items.push(makeH2("现金流与资产负债"));
    items.push(...makeParas(f.cash_and_balance));
  }

  return items;
}

// v3 新增:第五章 核心竞争力与护城河
// 注:如果 JSON 数据里没有 moats 字段(老数据兼容),这章直接跳过,但后续章节
// 序号"五、六、七、八、九"会保持写死状态——读者会看到从"四"直接跳到"六"。
// 对老数据这是已知的小瑕疵,但不影响阅读;新模式 A 报告应填 moats 字段以保
// 持章节序号连续。
function buildMoats(data) {
  const items = [];
  const m = data.moats;
  if (!m) return items;  // 字段不存在则整章跳过(向后兼容)

  items.push(makeH1("五、核心竞争力与护城河"));

  if (m.intro) items.push(...makeParas(m.intro));

  if (m.items && Array.isArray(m.items)) {
    m.items.forEach(moat => {
      items.push(makeH2(moat.title || ""));

      // 优势类型 + 性质判定(两行紧凑展示)
      if (moat.moat_type) {
        items.push(new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({ text: "优势类型:", bold: true, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
            new TextRun({ text: " " + moat.moat_type, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          ],
        }));
      }
      if (moat.nature) {
        items.push(new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({ text: "性质判定:", bold: true, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
            new TextRun({ text: " " + moat.nature, size: 22,
              color: COLOR_ACCENT,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          ],
        }));
      }
      if (moat.monetization) {
        items.push(new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({ text: "盈利变现路径:", bold: true, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          ],
        }));
        items.push(...makeParas(moat.monetization));
      }
      if (moat.durability) {
        items.push(new Paragraph({
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({ text: "持续性展望:", bold: true, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          ],
        }));
        items.push(...makeParas(moat.durability));
      }
      if (moat.evidence) {
        items.push(new Paragraph({
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({ text: "可验证证据:", bold: true, size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } }),
          ],
        }));
        items.push(...makeParas(moat.evidence));
      }
    });
  }

  return items;
}

// 横纵交汇(章节序号在新结构里是第六)
function buildIntersection(data) {
  const items = [];
  const x = data.intersection || {};
  items.push(makeH1("六、横纵交汇:决策路径与三剧本"));

  if (x.intro) items.push(...makeParas(x.intro));

  if (x.advantage_roots) {
    items.push(makeH2("优势的历史根源"));
    items.push(...makeParas(x.advantage_roots));
  }

  if (x.disadvantage_roots) {
    items.push(makeH2("劣势的历史根源"));
    items.push(...makeParas(x.disadvantage_roots));
  }

  // v3 新增:短期 vs 长期投资逻辑
  if (x.short_long_logic) {
    items.push(makeH2("短期逻辑 vs 长期逻辑"));
    if (x.short_long_logic.short_term) {
      items.push(makeH3("短期逻辑(1-3 个月)"));
      items.push(...makeParas(x.short_long_logic.short_term));
    }
    if (x.short_long_logic.long_term) {
      items.push(makeH3("长期逻辑(1-3 年)"));
      items.push(...makeParas(x.short_long_logic.long_term));
    }
  }

  if (x.scenarios) {
    items.push(makeH2("三剧本"));
    ["base", "upside", "downside"].forEach(key => {
      const s = x.scenarios[key];
      if (!s) return;
      items.push(makeH3(s.title || key));
      if (s.logic) items.push(...makeParas(s.logic));

      // v3 新增:估值算式(放在 logic 之后,key_tracking 之前)
      if (s.valuation_math) {
        items.push(new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: "估值锚定算式:",
              bold: true,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
          ],
        }));
        items.push(...makeParas(s.valuation_math));
      }

      if (s.key_tracking && Array.isArray(s.key_tracking) && s.key_tracking.length > 0) {
        items.push(new Paragraph({
          spacing: { before: 120, after: 80 },
          children: [
            new TextRun({
              text: "核心追踪指标:",
              bold: true,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
          ],
        }));
        s.key_tracking.forEach(it => items.push(makeBullet(it)));
      }
      if (s.space) {
        items.push(new Paragraph({
          spacing: { before: 120, after: 120 },
          children: [
            new TextRun({
              text: "对应空间:",
              bold: true,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
            new TextRun({
              text: " " + s.space,
              size: 22,
              color: COLOR_ACCENT,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
          ],
        }));
      }
    });
  }

  if (x.judgment_framework) {
    items.push(makeH2("写给读者的核心判断框架"));
    items.push(...makeParas(x.judgment_framework));
  }

  return items;
}

// 第七章:调研提纲与跟踪指标
function buildResearchOutline(data) {
  const items = [];
  const r = data.research_outline || {};
  items.push(makeH1("七、调研提纲与跟踪指标"));

  if (r.intro) items.push(...makeParas(r.intro));

  if (r.topics && Array.isArray(r.topics)) {
    r.topics.forEach(t => {
      items.push(makeH2(t.topic || ""));
      if (t.background) {
        items.push(new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "背景:",
              bold: true,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
            new TextRun({
              text: " " + t.background,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
          ],
        }));
      }
      if (t.questions && Array.isArray(t.questions)) {
        items.push(new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: "关键问题:",
              bold: true,
              size: 22,
              font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            }),
          ],
        }));
        t.questions.forEach(q => items.push(makeBullet(q)));
      }
    });
  }

  if (r.tracking_indicators && Array.isArray(r.tracking_indicators)) {
    items.push(makeH2("核心跟踪指标"));
    items.push(makePara("以下指标可用于后续季度更新时快速评估剧本兑现度:"));
    r.tracking_indicators.forEach(it => items.push(makeBullet(it)));
  }

  return items;
}

// 第八章:风险提示
function buildRisks(data) {
  const items = [];
  items.push(makeH1("八、风险提示"));

  if (data.risks && Array.isArray(data.risks)) {
    data.risks.forEach((r, idx) => {
      items.push(new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: `${idx + 1}. ${r.title || ""}`,
            bold: true,
            size: 24,
            color: COLOR_ACCENT,
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
          }),
        ],
      }));
      if (r.description) {
        items.push(...makeParas(r.description));
      }
    });
  }

  return items;
}

// 第九章:信源与打折清单
function buildSources(data) {
  const items = [];
  const s = data.sources || {};
  items.push(makeH1("九、信源与打折清单"));

  if (s.intro) items.push(...makeParas(s.intro));

  if (s.discount_table) {
    items.push(makeH2("信源打折清单"));
    items.push(makePara("以下是本报告中每个关键论点的信息来源及其可信度评估。读者可根据折扣判断各结论的强度。"));
    items.push(makeTable(s.discount_table));
    items.push(makePara(""));
  }

  if (s.methodology_note) {
    items.push(makeH2("方法论说明"));
    items.push(...makeParas(s.methodology_note));
  }

  return items;
}

// ============================================================
// 主函数
// ============================================================
function main() {
  const { dataPath, outputPath } = parseArgs();

  if (!fs.existsSync(dataPath)) {
    console.error(`Data file not found: ${dataPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // 组装所有章节(v3 章节顺序)
  const allChildren = [
    ...makeCoverPage(data),
    ...buildOneLiner(data),              // 一
    ...buildVerticalAnalysis(data),      // 二
    ...buildHorizontalAnalysis(data),    // 三
    ...buildFinancialLens(data),         // 四
    ...buildMoats(data),                 // 五(v3 新增,无 moats 字段则空跳过)
    ...buildIntersection(data),          // 六
    ...buildResearchOutline(data),       // 七
    ...buildRisks(data),                 // 八
    ...buildSources(data),               // 九
  ];

  // 创建文档
  const doc = new Document({
    creator: data.analyst || "Stock Deep Research Skill",
    title: data.title || "深度研究报告",
    description: "由 stock-deep-research skill 生成",
    styles: {
      default: {
        document: {
          run: {
            font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
            size: 22,
          },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 32, bold: true, color: COLOR_PRIMARY, font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } },
          paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 26, bold: true, color: COLOR_PRIMARY, font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } },
          paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 1 },
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 24, bold: true, font: { ascii: FONT_LATIN, eastAsia: FONT_CJK } },
          paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
            {
              level: 1,
              format: LevelFormat.BULLET,
              text: "◦",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: PAGE_MARGIN, right: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: (data.title || "深度研究报告") + "    CONFIDENTIAL",
                  size: 18,
                  color: COLOR_SECONDARY,
                  font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
                }),
              ],
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_SECONDARY, space: 4 },
              },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "— ",
                  size: 18,
                  color: COLOR_SECONDARY,
                  font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 18,
                  color: COLOR_SECONDARY,
                  font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
                }),
                new TextRun({
                  text: " —",
                  size: 18,
                  color: COLOR_SECONDARY,
                  font: { ascii: FONT_LATIN, eastAsia: FONT_CJK },
                }),
              ],
            }),
          ],
        }),
      },
      children: allChildren,
    }],
  });

  // 写出
  Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outputPath, buffer);
    console.log(`Report generated: ${outputPath}`);
  }).catch(err => {
    console.error("Error generating document:", err);
    process.exit(1);
  });
}

main();
