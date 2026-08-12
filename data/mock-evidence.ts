import type {
  EvidenceArtifact,
  EvidenceQuery,
  FunnelStepEvidence,
  MonitoringSignal,
  PythonDiagnosisEvidence
} from "@/types";

export const evidenceQueries: EvidenceQuery[] = [
  {
    id: "gmv-daily-channel-sql",
    title: "GMV 异常定位查询",
    language: "sql",
    source: "warehouse.fact_order_daily + warehouse.dim_channel",
    owner: "Data Analyst",
    grain: "daily",
    metricKeys: ["gmv", "paid_orders", "conversion_rate"],
    reviewStatus: "mock",
    code: `WITH daily_channel AS (
  SELECT
    order_date,
    channel_group,
    device_type,
    SUM(gmv) AS gmv,
    COUNT(DISTINCT order_id) AS paid_orders,
    COUNT(DISTINCT visitor_id) AS visitors
  FROM warehouse.fact_order_daily
  WHERE order_date BETWEEN DATE '2026-05-20' AND DATE '2026-05-27'
    AND is_test_order = false
  GROUP BY 1, 2, 3
)
SELECT
  order_date,
  channel_group,
  device_type,
  gmv,
  paid_orders,
  paid_orders * 1.0 / NULLIF(visitors, 0) AS conversion_rate
FROM daily_channel
ORDER BY order_date DESC, gmv DESC;`,
    resultPreview: [
      "2026-05-27 / organic / mobile / GMV 54,300 / paid_orders 1,106 / CVR 4.8%",
      "2026-05-27 / paid / mobile / GMV 38,900 / paid_orders 811 / CVR 6.1%",
      "2026-05-26 / organic / mobile / GMV 67,000 / paid_orders 1,312 / CVR 6.4%"
    ]
  },
  {
    id: "assistant-quality-sql",
    title: "AI 助手质量监控查询",
    language: "sql",
    source: "product_analytics.assistant_events",
    owner: "AI Product PM",
    grain: "event",
    metricKeys: ["answer_satisfaction", "failure_rate", "human_intervention_rate"],
    reviewStatus: "mock",
    code: `SELECT
  event_date,
  COUNT(DISTINCT user_id) AS dau,
  COUNTIF(event_name = 'question_submitted') AS questions,
  COUNTIF(event_name = 'skill_run_completed') AS skill_runs,
  AVG(answer_rating) AS answer_satisfaction,
  COUNTIF(answer_type = 'honest_refusal') * 1.0
    / NULLIF(COUNTIF(event_name = 'answer_rendered'), 0) AS failure_rate,
  COUNTIF(review_required = true) * 1.0
    / NULLIF(COUNTIF(event_name = 'answer_rendered'), 0) AS human_intervention_rate
FROM product_analytics.assistant_events
WHERE event_date BETWEEN DATE '2026-05-24' AND DATE '2026-05-27'
GROUP BY 1
ORDER BY 1;`,
    resultPreview: [
      "2026-05-27 / DAU 99 / questions 261 / skill_runs 91 / satisfaction 4.4",
      "2026-05-26 / DAU 104 / questions 283 / skill_runs 97 / satisfaction 4.5",
      "2026-05-25 / DAU 91 / questions 248 / skill_runs 86 / satisfaction 4.3"
    ]
  }
];

export const funnelEvidence: FunnelStepEvidence[] = [
  {
    id: "visit",
    label: "Visit",
    users: 48200,
    conversionFromPrevious: null,
    baselineConversion: null,
    deltaVsBaseline: null,
    diagnosis: "自然流量入口曝光正常，流量规模不是主要异常来源。"
  },
  {
    id: "product-view",
    label: "Product view",
    users: 27600,
    conversionFromPrevious: 0.57,
    baselineConversion: 0.61,
    deltaVsBaseline: -0.04,
    diagnosis: "首页推荐到商品详情页点击率低于基线，疑似推荐质量下降。"
  },
  {
    id: "add-to-cart",
    label: "Add to cart",
    users: 8120,
    conversionFromPrevious: 0.29,
    baselineConversion: 0.32,
    deltaVsBaseline: -0.03,
    diagnosis: "移动端商品详情页加购率下降，集中在新用户。"
  },
  {
    id: "checkout",
    label: "Checkout",
    users: 3840,
    conversionFromPrevious: 0.47,
    baselineConversion: 0.49,
    deltaVsBaseline: -0.02,
    diagnosis: "结算页轻微下滑，需要排查库存提示和优惠券可用性。"
  },
  {
    id: "paid-order",
    label: "Paid order",
    users: 2290,
    conversionFromPrevious: 0.6,
    baselineConversion: 0.68,
    deltaVsBaseline: -0.08,
    diagnosis: "支付成功率跌幅最大，是本次 GMV 异常的核心诊断点。"
  }
];

export const pythonDiagnosisEvidence: PythonDiagnosisEvidence = {
  id: "gmv-python-diagnosis",
  title: "Python 异常诊断 Notebook 摘要",
  notebookPath: "notebooks/gmv_anomaly_diagnosis_mock.ipynb",
  method: "STL residual + contribution decomposition",
  window: "2026-05-20 至 2026-05-27",
  confidence: "high",
  reviewNote: "模拟 notebook 输出，仅展示分析路径；真实上线需由数据分析师确认活动日、库存和埋点口径。",
  code: `import pandas as pd
from statsmodels.tsa.seasonal import STL

df = load_metric_series("gmv", grain="daily")
organic_mobile = df.query(
    "channel_group == 'organic' and device_type == 'mobile'"
)

stl = STL(organic_mobile["gmv"], period=7, robust=True).fit()
organic_mobile["residual_z"] = (
    stl.resid - stl.resid.mean()
) / stl.resid.std()

drivers = decompose_drop(
    df,
    metric="gmv",
    dimensions=["channel_group", "device_type", "user_segment"]
)
drivers.head(5)`,
  findings: [
    "2026-05-27 GMV residual z-score = -2.4，达到异常观察阈值。",
    "自然流量移动端贡献了 61% 的 GMV 下滑，付费渠道不构成主要解释。",
    "漏斗最大断点在 paid-order 转化，建议优先排查支付链路和库存提示。"
  ],
  contributions: [
    {
      id: "organic-mobile",
      segment: "Organic / Mobile / New users",
      contribution: -18300,
      shareOfDrop: 0.42,
      note: "新用户移动端支付成功率下降，解释度最高。"
    },
    {
      id: "organic-mobile-returning",
      segment: "Organic / Mobile / Returning users",
      contribution: -8200,
      shareOfDrop: 0.19,
      note: "回流用户商品详情页到加购环节低于基线。"
    },
    {
      id: "search-desktop",
      segment: "Organic / Desktop / Search",
      contribution: -4100,
      shareOfDrop: 0.09,
      note: "桌面端影响较小，暂不作为主线假设。"
    }
  ]
};

export const monitoringSignals: MonitoringSignal[] = [
  {
    id: "conversion-rate",
    metricKey: "conversion_rate",
    label: "移动端支付转化率",
    value: "4.8%",
    threshold: "低于 5.5% 触发观察，低于 5.0% 触发 P1",
    status: "incident",
    owner: "Growth PM",
    lastCheckedAt: "2026-05-27 09:30",
    action: "进入每日分诊，创建支付链路复盘任务。"
  },
  {
    id: "review-backlog",
    metricKey: "review_backlog",
    label: "分析师待审核队列",
    value: "7 items",
    threshold: "超过 6 个待审核项触发排队风险",
    status: "watch",
    owner: "Data Lead",
    lastCheckedAt: "2026-05-27 09:35",
    action: "优先处理影响 GMV 和 ROI 的分析结论。"
  },
  {
    id: "answer-satisfaction",
    metricKey: "answer_satisfaction",
    label: "答案满意度",
    value: "4.4 / 5",
    threshold: "低于 4.0 触发质量回溯",
    status: "healthy",
    owner: "AI Product PM",
    lastCheckedAt: "2026-05-27 09:40",
    action: "保持观察，继续收集误拒反馈。"
  },
  {
    id: "false-rejection-rate",
    metricKey: "false_rejection_rate",
    label: "误拒反馈率",
    value: "3.1%",
    threshold: "高于 3.0% 触发语义映射复盘",
    status: "watch",
    owner: "AI Product PM",
    lastCheckedAt: "2026-05-27 09:45",
    action: "将口语化业务表达加入 Agent Skill 评估集。"
  }
];

export const evidenceArtifacts: EvidenceArtifact[] = [
  {
    id: "sql-query-shot",
    title: "SQL 查询证据",
    route: "/evidence",
    purpose: "证明 GMV、订单和转化率分析来自可审计查询，而不是自由生成。",
    screenshotHint: "截取 SQL Evidence 和 Result preview 两栏。"
  },
  {
    id: "funnel-shot",
    title: "漏斗诊断截图",
    route: "/daily-triage",
    purpose: "展示从访问、商品详情、加购、结算到支付成功的断点定位。",
    screenshotHint: "截取 Funnel breakdown 区块，保留每一步的 delta 和诊断。"
  },
  {
    id: "python-shot",
    title: "Python 异常诊断截图",
    route: "/evidence",
    purpose: "展示 Notebook 方法、核心代码和贡献度拆解。",
    screenshotHint: "截取 Python Diagnosis 和 Contribution decomposition。"
  },
  {
    id: "monitoring-shot",
    title: "指标监控截图",
    route: "/ops",
    purpose: "展示上线后如何观察 AI 助手质量和业务异常。",
    screenshotHint: "截取 Metric Monitoring Panel，包含阈值、状态、owner 和动作。"
  }
];
