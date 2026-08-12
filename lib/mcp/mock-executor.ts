import { mcpCostAssumptions, mcpScenarios } from "@/data/mcp-practice";
import type { McpCostBreakdown, McpPermissionRequest, McpRunResult, McpScenario, McpTraceStep } from "@/types/mcp-practice";

const baseTime = "09:42:";
function trace(step: number, tool: string, input: string, status: McpTraceStep["status"], latencyMs: number, costUsd: number, permissionDecision: McpTraceStep["permissionDecision"] = "not_required", retries = 0): McpTraceStep {
  return { time: `${baseTime}${String(10 + step).padStart(2, "0")}`, step, tool, redactedInput: input, permissionDecision, status, latencyMs, retries, costUsd, evidenceId: `EV-MCP-${String(step).padStart(3, "0")}` };
}

export function getMcpScenario(id: McpScenario["id"]) {
  const scenario = mcpScenarios.find((item) => item.id === id);
  if (!scenario) throw new Error(`Unknown MCP scenario: ${id}`);
  return scenario;
}

export function calculateMcpCost(scenario: McpScenario, toolCalls: number, scanGb: number): McpCostBreakdown {
  const modelInputUsd = scenario.inputTokens / 1_000_000 * mcpCostAssumptions.inputTokenUsdPerMillion;
  const modelOutputUsd = scenario.outputTokens / 1_000_000 * mcpCostAssumptions.outputTokenUsdPerMillion;
  const mcpToolsUsd = toolCalls * mcpCostAssumptions.toolCallUsd;
  const queryScanUsd = scanGb / 1024 * mcpCostAssumptions.queryScanUsdPerTb;
  return { modelInputUsd, modelOutputUsd, mcpToolsUsd, queryScanUsd, totalUsd: modelInputUsd + modelOutputUsd + mcpToolsUsd + queryScanUsd, inputTokens: scenario.inputTokens, outputTokens: scenario.outputTokens, toolCalls, scanGb };
}

export function createPermissionRequest(scenario: McpScenario): McpPermissionRequest {
  return { tool: "warehouse_query_metric", dataScope: scenario.dataScope, dateRange: scenario.dateRange, dimensions: scenario.dimensions, estimatedScanGb: scenario.estimatedScanGb, estimatedCostUsd: scenario.estimatedScanGb / 1024 * mcpCostAssumptions.queryScanUsdPerTb };
}

export function prepareMcpRun(scenarioId: McpScenario["id"]): McpRunResult {
  const scenario = getMcpScenario(scenarioId);
  const registryTrace = trace(1, "metric_registry_get", `metric=${scenario.metric}; dimensions=${scenario.dimensions.join(",")}`, "success", 84, mcpCostAssumptions.toolCallUsd);
  if (scenario.id === "undefined-profit") return { scenarioId, status: "blocked", headline: "profit 未定义，已在口径检查阶段停止", message: "默认 Metric Registry 不包含 profit。系统不会查询数据或生成利润分析。", trace: [registryTrace], cost: calculateMcpCost(scenario, 1, 0), alternatives: ["提交 profit 指标口径申请", "改查已定义的 GMV", "改查已定义的 ROI"] };
  if (scenario.id === "permission-denied") return { scenarioId, status: "blocked", headline: "缺少数仓只读权限", message: "当前身份没有 warehouse.metric.read，查询未执行。可联系 Data Governance 或创建审核任务。", trace: [registryTrace, trace(2, "permission_guard", "scope=warehouse.metric.read", "blocked", 12, 0, "denied")], cost: calculateMcpCost(scenario, 1, 0), alternatives: ["申请最小只读 Scope", "创建分析师审核"] };
  if (scenario.id === "oversized-range") return { scenarioId, status: "blocked", headline: "日期范围超过 90 天上限", message: "为控制数据边界与成本，需缩小范围后重新确认。", trace: [registryTrace, trace(2, "query_boundary_guard", "range=365d; max=90d", "blocked", 9, 0)], cost: calculateMcpCost(scenario, 1, 0), alternatives: ["缩小到最近 30 天", "按月分批查询"] };
  if (scenario.id === "sensitive-dimension") return { scenarioId, status: "blocked", headline: "敏感维度请求被阻断", message: "user_email 不在 GMV 可用维度中，且属于禁止进入 Trace 的敏感字段。", trace: [registryTrace, trace(2, "dimension_policy", "dimension=[REDACTED_EMAIL_FIELD]", "blocked", 11, 0)], cost: calculateMcpCost(scenario, 1, 0), alternatives: ["改用 user_segment 聚合维度", "改用 channel 聚合维度"] };
  return { scenarioId, status: "awaiting_confirmation", headline: "等待数据查询授权", message: "继续前请核对工具、范围、维度、预计扫描量和成本。", permissionRequest: createPermissionRequest(scenario), trace: [registryTrace], cost: calculateMcpCost(scenario, 1, 0), alternatives: [] };
}

export function resolveMcpPermission(scenarioId: McpScenario["id"], decision: "allow" | "deny"): McpRunResult {
  const prepared = prepareMcpRun(scenarioId);
  const scenario = getMcpScenario(scenarioId);
  if (prepared.status !== "awaiting_confirmation") return prepared;
  if (decision === "deny") return { ...prepared, status: "blocked", headline: "用户已拒绝数据查询", message: "warehouse_query_metric 未执行，调用链已停止。", permissionRequest: undefined, trace: [...prepared.trace, trace(2, "permission_confirmation", `tool=warehouse_query_metric; scope=${scenario.dataScope}`, "blocked", 6, 0, "denied")], cost: calculateMcpCost(scenario, 1, 0), alternatives: ["调整范围后重新运行", "查看 Metric Registry 口径"] };
  const permission = "allowed" as const;
  if (scenario.id === "query-timeout") { const reviewId = "REV-MCP-2048"; return { scenarioId, status: "degraded", headline: "查询超时，已降级并转人工", message: "只读查询超时后缩小范围重试 1 次，仍未返回。系统未生成 GMV 异常归因。", trace: [...prepared.trace, trace(2, "warehouse_query_metric", "metric=gmv; range=14d; dimensions=channel,city", "timeout", 2000, 0.0012, permission, 1), trace(3, "create_analyst_review", "reason=tool_timeout; evidence=EV-MCP-002", "review_created", 118, 0.0004)], cost: calculateMcpCost(scenario, 3, 0.3), alternatives: ["查看最近一次成功快照", "等待分析师审核"], reviewId } }
  if (scenario.id === "empty-data") return { scenarioId, status: "completed", headline: "查询完成，但结果为空数据", message: "指定时间范围没有可用 GMV 记录。系统不会推断趋势或异常原因。", trace: [...prepared.trace, trace(2, "warehouse_query_metric", "metric=gmv; range=7d; dimensions=channel", "success", 740, 0.0008, permission)], cost: calculateMcpCost(scenario, 2, scenario.estimatedScanGb), alternatives: ["调整到有数据的日期范围", "请分析师核验归档状态"] };
  if (scenario.id === "low-confidence") { const reviewId = "REV-MCP-2051"; return { scenarioId, status: "escalated", headline: "结果置信度低，已创建人工审核", message: "查询发现城市数据完整性仅 63%。系统保留事实结果，但不输出高风险归因。", trace: [...prepared.trace, trace(2, "warehouse_query_metric", "metric=gmv; range=7d; dimensions=city", "success", 920, 0.0011, permission), trace(3, "create_analyst_review", "reason=low_confidence; evidence=EV-MCP-002", "review_created", 104, 0.0004)], cost: calculateMcpCost(scenario, 3, scenario.estimatedScanGb), alternatives: ["等待分析师确认数据完整性"], reviewId } }
  return { scenarioId, status: "completed", headline: "GMV 查询完成", message: "模拟结果显示 GMV 较前一周期下降 8.4%，channel=organic 贡献主要变化；该结论仅用于 Mock 演示。", trace: [...prepared.trace, trace(2, "warehouse_query_metric", "metric=gmv; range=7d; dimensions=channel", "success", 680, 0.0009, permission)], cost: calculateMcpCost(scenario, 2, scenario.estimatedScanGb), alternatives: ["前往分析证据层查看 SQL 与诊断样例"] };
}
