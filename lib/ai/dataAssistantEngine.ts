import type { AIAnswer, DataQuestion } from "@/types";
import { findMetricDefinition } from "@/lib/metrics/metricRegistry";

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
