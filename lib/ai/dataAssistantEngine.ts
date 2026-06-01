import type { AIAnswer, AnalysisTraceStep, DataAssistantResult, DataQuestion, HonestRefusal, MetricDefinition, QuestionIntent } from "@/types";
import { findMetricDefinition } from "@/lib/metrics/metricRegistry";

const alternativeMetrics = ["GMV", "revenue", "refund_amount", "marketing_cost", "orders"];

const metricAliases: Record<string, string[]> = {
  profit: ["profit", "利润", "毛利", "盈利"],
  gmv: ["gmv", "GMV", "成交额"],
  roi: ["roi", "ROI", "投放", "渠道"],
  retention_rate: ["留存", "老用户", "回来", "retention"]
};

export function identifyQuestionIntent(question: string): QuestionIntent {
  if (question.includes("利润") || question.toLowerCase().includes("profit")) {
    return {
      id: "profit_decline_attribution",
      label: "利润下降归因",
      description: "用户希望解释利润在本月下降的原因。"
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
      { id: "registry-search", label: "检索 Metric Registry", status: "completed", productVisibleReason: "查询当前已治理的指标定义、公式、口径和负责人。" },
      { id: "missing-profit", label: "未找到 profit / 利润 指标定义", status: "blocked", productVisibleReason: "该指标未出现在默认 Metric Registry 中，因此不能直接进行利润下降归因。" },
      { id: "alternative-check", label: "评估可用替代指标", status: "completed", productVisibleReason: "寻找可以描述业务变化但不冒充利润的相关信号。" },
      { id: "alternative-found", label: "找到替代信号：GMV、revenue、refund_amount、marketing_cost、orders", status: "completed", productVisibleReason: "这些信号可用于辅助判断收入、退款、投放成本和订单侧变化。" },
      { id: "recommendation", label: "生成替代分析建议", status: "completed", productVisibleReason: "输出可执行的替代分析路径，并提示提交指标定义请求。" }
    ];
  }

  return [
    { id: "intent", label: `识别问题意图：${intent.label}`, status: "completed", productVisibleReason: intent.description },
    { id: "registry-search", label: "检索 Metric Registry", status: "completed", productVisibleReason: `已找到 ${requiredMetric} 的指标定义。` },
    { id: "definition-check", label: "确认指标口径和 Caveat", status: "completed", productVisibleReason: "使用已审批定义生成受治理分析，并保留对外披露前的人工确认要求。" },
    { id: "mock-analysis", label: "生成受治理的模拟分析", status: "completed", productVisibleReason: "当前 MVP 使用 mock 数据展示可回答问题的结果形态。" }
  ];
}

export function generateHonestRefusal(requiredMetric: string, alternatives = alternativeMetrics): HonestRefusal {
  return {
    reason: "我不能直接回答“为什么利润下降”，因为当前 Metric Registry 中没有经过确认的 profit / 利润 指标定义。直接分析会把收入、成本、退款或投放费用口径混在一起，产生误导性结论。",
    missingMetric: `${requiredMetric} / 利润`,
    alternativeAnalysis: [
      `先用 ${alternatives.join("、")} 检查业务变化方向。`,
      "拆解 GMV、revenue、orders 判断交易和收入侧是否走弱。",
      "结合 refund_amount 与 marketing_cost 判断退款或投放成本是否可能挤压利润。"
    ],
    requiredConfirmation: "需要数据团队确认 profit 的口径：是否等于 revenue - refund_amount - marketing_cost，是否包含履约成本、补贴、税费和异常活动日。"
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
        summary: "按当前经营毛利口径，本月利润环比下降 8.6%。",
        formula: metricDefinition.formula,
        caveat: metricDefinition.caveat,
        supportingSignals: [
          `Metric definition used: ${metricDefinition.displayName}`,
          `Formula: ${metricDefinition.formula}`,
          "Scope: operating gross profit for internal product analysis"
        ],
        drivers: [
          "marketing_cost increased 14.2%",
          "refund_amount increased 6.8%",
          "revenue only increased 1.9%",
          "fulfillment_cost increased 4.5%"
        ],
        recommendations: [
          "review paid channel ROI",
          "segment refund reasons",
          "check fulfillment cost increase"
        ],
        reportingNote: "A finance analyst should confirm this definition and result before external reporting.",
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
      title: `${metricDefinition.displayName} mock analysis`,
      summary: "该问题涉及的核心指标已在 Metric Registry 中定义。当前 MVP 返回模拟分析卡，后续可接入真实数据查询和 analyst review。",
      supportingSignals: ["指标定义已找到", `口径：${metricDefinition.formula}`, `Owner：${metricDefinition.owner}`],
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
      summary: `I cannot answer yet because ${missingMetrics.join(", ")} is not defined in the Metric Registry.`,
      confidence: 0,
      trace: [
        { id: "intent", label: "Identify business intent", status: "completed", productVisibleReason: "The question asks for metric movement attribution." },
        { id: "registry", label: "Check Metric Registry", status: "blocked", productVisibleReason: "At least one requested metric is undefined." }
      ],
      suggestedNextActions: ["Use GMV, revenue, orders, refund_amount, or marketing_cost as available proxies.", "Submit a metric definition request for analyst review."]
    };
  }

  return {
    id: `answer-${question.id}`,
    questionId: question.id,
    answerType: "analysis",
    summary: "All requested metrics are defined. A governed analysis can be drafted in a later implementation pass.",
    confidence: 0.72,
    trace: [{ id: "registry", label: "Check Metric Registry", status: "completed", productVisibleReason: "Requested metrics are governed." }],
    suggestedNextActions: ["Run attribution by channel and segment.", "Send high-impact answers to analyst review."]
  };
}
