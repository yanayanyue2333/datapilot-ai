export type RequirementPriority = "P0" | "P1";

export interface PRDMetadata {
  version: string;
  status: "公开评审版" | "已批准";
  owner: string;
  updatedAt: string;
  targetRelease: string;
}

export interface ProductRequirement {
  id: string;
  priority: RequirementPriority;
  module: string;
  title: string;
  description: string;
  acceptance: string;
}

export interface ProductFlowStep {
  id: string;
  title: string;
  description: string;
  decision?: string;
}

export interface ProductRule {
  id: string;
  title: string;
  rule: string;
  rationale: string;
}

export interface AnalyticsEventSpec {
  event: string;
  trigger: string;
  properties: string[];
  purpose: string;
}

export interface SuccessMetricSpec {
  name: string;
  definition: string;
  target: string;
  guardrail: string;
}

export type AcceptanceStatus = "passed" | "blocked" | "not_run";

export interface AcceptanceCase {
  id: string;
  requirementId: string;
  module: string;
  priority: RequirementPriority;
  precondition: string;
  given: string;
  when: string;
  then: string;
  expectedResult: string;
  status: AcceptanceStatus;
  evidenceHref: string;
  evidenceLabel: string;
  owner: string;
}

export type EvaluationScenario =
  | "正常回答"
  | "诚实拒答"
  | "权限控制"
  | "工具异常"
  | "人工升级";

export type EvaluationFailureType =
  | "none"
  | "assertion_mismatch"
  | "tool_timeout"
  | "unsafe_fallback"
  | "review_routing";

export interface EvaluationCase {
  id: string;
  scenario: EvaluationScenario;
  prompt: string;
  expectedBehavior: string;
  taskCompleted: boolean;
  assertionsPassed: boolean;
  escalatedToHuman: boolean;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  toolCalls: number;
  queryScanGb: number;
  failureType: EvaluationFailureType;
  failureNote?: string;
}

export interface EvaluationCostAssumptions {
  inputTokenUsdPerMillion: number;
  outputTokenUsdPerMillion: number;
  toolCallUsd: number;
  queryScanUsdPerTb: number;
}

export interface EvaluationCaseCost {
  modelInputUsd: number;
  modelOutputUsd: number;
  toolsUsd: number;
  queryUsd: number;
  totalUsd: number;
}

export interface EvaluationSummary {
  sampleSize: number;
  successfulCases: number;
  taskSuccessRate: number;
  humanEscalationCases: number;
  humanEscalationRate: number;
  averageCostUsd: number;
  p95LatencyMs: number;
  totalCostUsd: number;
}
