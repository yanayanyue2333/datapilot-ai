import type {
  AcceptanceCase,
  AcceptanceStatus,
  EvaluationCase,
  EvaluationCaseCost,
  EvaluationCostAssumptions,
  EvaluationScenario,
  EvaluationSummary,
} from "@/types/product-delivery";

export function calculateEvaluationCaseCost(
  item: EvaluationCase,
  prices: EvaluationCostAssumptions,
): EvaluationCaseCost {
  const modelInputUsd = (item.inputTokens / 1_000_000) * prices.inputTokenUsdPerMillion;
  const modelOutputUsd = (item.outputTokens / 1_000_000) * prices.outputTokenUsdPerMillion;
  const toolsUsd = item.toolCalls * prices.toolCallUsd;
  const queryUsd = (item.queryScanGb / 1024) * prices.queryScanUsdPerTb;

  return {
    modelInputUsd,
    modelOutputUsd,
    toolsUsd,
    queryUsd,
    totalUsd: modelInputUsd + modelOutputUsd + toolsUsd + queryUsd,
  };
}

export function percentile(values: number[], percentileRank: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(percentileRank * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

export function summarizeEvaluation(
  cases: EvaluationCase[],
  prices: EvaluationCostAssumptions,
): EvaluationSummary {
  const sampleSize = cases.length;
  const successfulCases = cases.filter((item) => item.taskCompleted && item.assertionsPassed).length;
  const humanEscalationCases = cases.filter((item) => item.escalatedToHuman).length;
  const totalCostUsd = cases.reduce(
    (total, item) => total + calculateEvaluationCaseCost(item, prices).totalUsd,
    0,
  );

  return {
    sampleSize,
    successfulCases,
    taskSuccessRate: sampleSize ? successfulCases / sampleSize : 0,
    humanEscalationCases,
    humanEscalationRate: sampleSize ? humanEscalationCases / sampleSize : 0,
    averageCostUsd: sampleSize ? totalCostUsd / sampleSize : 0,
    p95LatencyMs: percentile(cases.map((item) => item.latencyMs), 0.95),
    totalCostUsd,
  };
}

export function countEvaluationScenarios(cases: EvaluationCase[]) {
  return cases.reduce<Record<EvaluationScenario, number>>(
    (counts, item) => ({ ...counts, [item.scenario]: counts[item.scenario] + 1 }),
    { 正常回答: 0, 诚实拒答: 0, 权限控制: 0, 工具异常: 0, 人工升级: 0 },
  );
}

export function summarizeAcceptance(cases: AcceptanceCase[]) {
  const byStatus = cases.reduce<Record<AcceptanceStatus, number>>(
    (counts, item) => ({ ...counts, [item.status]: counts[item.status] + 1 }),
    { passed: 0, blocked: 0, not_run: 0 },
  );
  return {
    total: cases.length,
    ...byStatus,
    passRate: cases.length ? byStatus.passed / cases.length : 0,
  };
}
