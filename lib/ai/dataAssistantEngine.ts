import type { AIAnswer, AnalysisTraceStep, DataAssistantResult, DataQuestion, HonestRefusal, MetricDefinition, QuestionIntent } from "@/types";
import { findMetricDefinition } from "@/lib/metrics/metricRegistry";

const alternativeMetrics = ["GMV", "revenue", "refund_amount", "marketing_cost", "orders"];

const metricAliases: Record<string, string[]> = {
  profit: ["profit", "利润", "毛利", "经营毛利", "盈利"],
  gmv: ["gmv", "GMV", "成交额"],
  roi: ["roi", "ROI", "投放", "渠道"],
  retention_rate: ["留存", "老用户", "回来", "retention"]
};

export function identifyQuestionIntent(question: string): QuestionIntent {
  if (question.includes("利润") || question.includes("毛利") || question.toLowerCase().includes("profit")) {
    return {
      id: "profit_decline_attribution",
      label: "利润下降归因",
      description: "用户希望解释本月利润下降的原因。"
    };
  }

  if (question.toLowerCase().includes("gmv")) {
    return {
      id: "gmv_decline_attribution",
      label: "GMV 下降归因",
      description: "用户希望定位 GMV 变化的主要驱动因素。"
    };
  }

  if (question.toLowerCase().includes("roi") || question.includes("渠道") || question.includes("投放")) {
    return {
      id: "channel_roi_comparison",
      label: "渠道 ROI 分析",
      description: "用户希望比较渠道效率和投放回报。"
    };
  }

  if (question.includes("老用户") || question.includes("回来") || question.includes("留存")) {
    return {
      id: "retention_decline_analysis",
      label: "留存下降分析",
      description: "用户希望判断老用户活跃或留存是否走弱。"
    };
  }

  return {
    id: "general_metric_analysis",
    label: "通用指标分析",
    description: "用户提出了一个需要指标定义支撑的数据分析问题。"
  };
}

export function identifyRequiredMetric(question: string) {
  const normalized = question.toLowerCase();
  const matchedAlias = Object.entries(metricAliases).find(([, aliases]) => aliases.some((alias) => normalized.includes(alias.toLowerCase())));
  return matchedAlias?.[0] ?? "gmv";
}

export function buildAnalysisTrace(intent: QuestionIntent, requiredMetric: string, isMetricAvailable: boolean): AnalysisTraceStep[] {
  if (!isMetricAvailable) {
    return [
      { id: "intent", label: `识别问题意图：${intent.label}`, status: "completed", productVisibleReason: intent.description },
      { id: "registry-search", label: "检索指标口径库", status: "completed", productVisibleReason: "查询当前已治理的指标定义、公式、口径、别名和负责人。" },
      { id: "missing-profit", label: "未找到 profit / 利润 指标定义", status: "blocked", productVisibleReason: "该指标未出现在默认指标口径库中，因此不能直接进行利润下降归因。" },
      { id: "alternative-check", label: "评估可用替代指标", status: "completed", productVisibleReason: "寻找可以描述业务变化、但不冒充利润口径的相关信号。" },
      { id: "alternative-found", label: "找到替代信号：GMV、revenue、refund_amount、marketing_cost、orders", status: "completed", productVisibleReason: "这些信号可用于辅助判断收入、退款、投放成本和订单侧变化。" },
      { id: "recommendation", label: "生成替代分析建议", status: "completed", productVisibleReason: "输出可执行的替代分析路径，并提示提交指标口径申请。" }
    ];
  }

  return [
    { id: "intent", label: `识别问题意图：${intent.label}`, status: "completed", productVisibleReason: intent.description },
    { id: "registry-search", label: "检索指标口径库", status: "completed", productVisibleReason: `已找到 ${requiredMetric} 的指标定义。` },
    { id: "definition-check", label: "确认指标口径和 caveat", status: "completed", productVisibleReason: "使用已审批定义生成受治理分析，并保留正式汇报前的人工确认要求。" },
    { id: "mock-analysis", label: "生成受治理的模拟分析", status: "completed", productVisibleReason: "当前 MVP 使用 mock 数据展示可回答问题的结果形态。" }
  ];
}

export function generateHonestRefusal(requiredMetric: string, alternatives = alternativeMetrics): HonestRefusal {
  return {
    reason: "我不能直接回答“为什么利润下降”，因为当前指标口径库中没有经过确认的 profit / 利润 指标定义。直接分析会把收入、成本、退款或投放费用口径混在一起，产生误导性结论。",
    missingMetric: `${requiredMetric} / 利润`,
    alternativeAnalysis: [
      `可以先用 ${alternatives.join("、")} 检查业务变化方向。`,
      "拆解 GMV、revenue、orders，判断交易和收入侧是否走弱。",
      "结合 refund_amount 与 marketing_cost，判断退款或投放成本是否可能挤压利润。"
    ],
    requiredConfirmation: "需要数据团队确认 profit 的口径：是否等于 revenue - marketing_cost - refund_amount - fulfillment_cost，是否包含固定成本、税费、薪酬和异常活动日。"
  };
}

function findDefinition(metricName: string, definitions?: MetricDefinition[]) {
  if (!definitions) return findMetricDefinition(metricName);
  const normalized = metricName.toLowerCase();
  return definitions.find((metric) => {
    const candidates = [metric.id, metric.name, metric.key, metric.displayName, ...(metric.aliases ?? [])].filter(Boolean).map((value) => String(value).toLowerCase());
    return candidates.includes(normalized);
  });
}

export function analyzeDataQuestion(question: string, definitions?: MetricDefinition[]): DataAssistantResult {
  const intent = identifyQuestionIntent(question);
  const requiredMetric = identifyRequiredMetric(question);
  const metricDefinition = findDefinition(requiredMetric, definitions);
  const trace = buildAnalysisTrace(intent, requiredMetric, Boolean(metricDefinition));

  if (!metricDefinition) {
    return {
      question,
      intent,
      requiredMetric,
      availableAlternativeMetrics: alternativeMetrics,
      trace,
      answerType: "honest_refusal",
      refusal: generateHonestRefusal(requiredMetric)
    };
  }

  if (requiredMetric === "profit") {
    return {
      question,
      intent,
      requiredMetric,
      availableAlternativeMetrics: [],
      trace,
      answerType: "analysis",
      mockAnswer: {
        title: "利润下降归因分析",
        summary: "按当前经营毛利口径，本月利润环比下降 8.6%。当前使用的是经营毛利口径，不等于财务净利润。",
        formula: metricDefinition.formula,
        caveat: metricDefinition.caveat,
        supportingSignals: [
          `使用指标口径：${metricDefinition.displayName}`,
          `计算公式：${metricDefinition.formula}`,
          "口径范围：用于内部产品分析的经营毛利"
        ],
        drivers: [
          "marketing_cost 增长 14.2%",
          "refund_amount 增长 6.8%",
          "revenue 仅增长 1.9%",
          "fulfillment_cost 增长 4.5%"
        ],
        recommendations: [
          "复查付费渠道 ROI",
          "拆分退款原因和退款人群",
          "排查履约成本上升原因"
        ],
        reportingNote: "正式对外汇报前，需要财务或数据分析师确认该口径和结论。",
        confidence: 0.78
      }
    };
  }

  return {
    question,
    intent,
    requiredMetric,
    availableAlternativeMetrics: [],
    trace,
    answerType: "analysis",
    mockAnswer: {
      title: `${metricDefinition.displayName} 模拟分析`,
      summary: "该问题涉及的核心指标已在指标口径库中定义。当前 MVP 返回模拟分析卡，后续可接入真实数据查询和分析师审核。",
      supportingSignals: ["指标定义已找到", `口径：${metricDefinition.formula}`, `负责人：${metricDefinition.owner}`],
      confidence: 0.74
    }
  };
}

export function draftGuardedAnswer(question: DataQuestion): AIAnswer {
  const missingMetrics = question.requestedMetricNames.filter((metric) => !findMetricDefinition(metric));

  if (missingMetrics.length > 0) {
    return {
      id: `answer-${question.id}`,
      questionId: question.id,
      answerType: "honest_refusal",
      summary: `暂时不能回答，因为 ${missingMetrics.join("、")} 尚未在指标口径库中定义。`,
      confidence: 0,
      trace: [
        { id: "intent", label: "识别业务意图", status: "completed", productVisibleReason: "该问题需要做指标变化归因。" },
        { id: "registry", label: "检查指标口径库", status: "blocked", productVisibleReason: "至少一个请求指标尚未定义。" }
      ],
      suggestedNextActions: ["可先使用 GMV、revenue、orders、refund_amount 或 marketing_cost 作为替代信号。", "提交指标口径申请并进入分析师审核。"]
    };
  }

  return {
    id: `answer-${question.id}`,
    questionId: question.id,
    answerType: "analysis",
    summary: "请求指标均已定义，可以生成受治理的分析草稿。",
    confidence: 0.72,
    trace: [{ id: "registry", label: "检查指标口径库", status: "completed", productVisibleReason: "请求指标已完成治理。" }],
    suggestedNextActions: ["按渠道和用户分群继续归因。", "将高影响结论提交给分析师审核。"]
  };
}
