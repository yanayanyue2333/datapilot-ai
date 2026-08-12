export type McpRiskLevel = "低" | "中" | "高";
export type PermissionDecision = "pending" | "allowed" | "denied" | "not_required";
export type McpTraceStatus = "success" | "blocked" | "timeout" | "degraded" | "review_created";
export type McpRunStatus = "awaiting_confirmation" | "completed" | "blocked" | "degraded" | "escalated";

export interface JsonSchemaField {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface McpToolDefinition {
  name: "metric_registry_get" | "warehouse_query_metric" | "create_analyst_review";
  purpose: string;
  inputSchema: JsonSchemaField[];
  outputSchema: JsonSchemaField[];
  scope: string;
  risk: McpRiskLevel;
  requiresConfirmation: boolean;
  timeoutPolicy: string;
  retryPolicy: string;
  idempotencyPolicy: string;
  redactionPolicy: string;
}

export interface McpPermissionRequest {
  tool: string;
  dataScope: string;
  dateRange: string;
  dimensions: string[];
  estimatedScanGb: number;
  estimatedCostUsd: number;
}

export interface McpCostBreakdown {
  modelInputUsd: number;
  modelOutputUsd: number;
  mcpToolsUsd: number;
  queryScanUsd: number;
  totalUsd: number;
  inputTokens: number;
  outputTokens: number;
  toolCalls: number;
  scanGb: number;
}

export interface McpTraceStep {
  time: string;
  step: number;
  tool: string;
  redactedInput: string;
  permissionDecision: PermissionDecision;
  status: McpTraceStatus;
  latencyMs: number;
  retries: number;
  costUsd: number;
  evidenceId: string;
}

export interface McpScenario {
  id:
    | "normal-gmv"
    | "undefined-profit"
    | "permission-denied"
    | "query-timeout"
    | "empty-data"
    | "oversized-range"
    | "sensitive-dimension"
    | "low-confidence";
  name: string;
  description: string;
  metric: "gmv" | "profit";
  dateRange: string;
  dimensions: string[];
  dataScope: string;
  estimatedScanGb: number;
  userScopes: string[];
  inputTokens: number;
  outputTokens: number;
}

export interface McpRunResult {
  scenarioId: McpScenario["id"];
  status: McpRunStatus;
  headline: string;
  message: string;
  permissionRequest?: McpPermissionRequest;
  trace: McpTraceStep[];
  cost: McpCostBreakdown;
  alternatives: string[];
  reviewId?: string;
}

export interface McpTestExpectation {
  status: McpRunStatus;
  requiredTools: string[];
  forbiddenTools?: string[];
  maxRetries?: number;
  requiresReview?: boolean;
  headlineIncludes?: string;
}

export interface McpTestCase {
  id: string;
  name: string;
  category: "成功" | "拒答" | "权限" | "异常" | "越权" | "人工升级";
  scenarioId: McpScenario["id"];
  permission: "allow" | "deny" | "not_required";
  expectation: McpTestExpectation;
}

export interface McpAssertionResult {
  label: string;
  passed: boolean;
  actual: string;
}

export interface McpTestResult {
  test: McpTestCase;
  passed: boolean;
  assertions: McpAssertionResult[];
}
