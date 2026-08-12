import { mcpTestCases } from "@/data/mcp-practice";
import { prepareMcpRun, resolveMcpPermission } from "./mock-executor";
import type { McpAssertionResult, McpTestResult } from "@/types/mcp-practice";

export function runMcpTestSuite(): McpTestResult[] {
  return mcpTestCases.map((test) => {
    const result = test.permission === "not_required" ? prepareMcpRun(test.scenarioId) : resolveMcpPermission(test.scenarioId, test.permission);
    const tools = result.trace.map((step) => step.tool);
    const assertions: McpAssertionResult[] = [
      { label: `状态为 ${test.expectation.status}`, passed: result.status === test.expectation.status, actual: result.status },
      { label: "必需工具均出现", passed: test.expectation.requiredTools.every((tool) => tools.includes(tool)), actual: tools.join(" -> ") },
    ];
    if (test.expectation.forbiddenTools) assertions.push({ label: "禁止工具未调用", passed: test.expectation.forbiddenTools.every((tool) => !tools.includes(tool)), actual: tools.join(" -> ") });
    if (test.expectation.maxRetries !== undefined) { const actual = Math.max(0, ...result.trace.map((step) => step.retries)); assertions.push({ label: `重试不超过 ${test.expectation.maxRetries}`, passed: actual <= test.expectation.maxRetries, actual: String(actual) }); }
    if (test.expectation.requiresReview) assertions.push({ label: "已创建人工审核", passed: Boolean(result.reviewId), actual: result.reviewId ?? "none" });
    if (test.expectation.headlineIncludes) assertions.push({ label: `标题包含 ${test.expectation.headlineIncludes}`, passed: result.headline.includes(test.expectation.headlineIncludes), actual: result.headline });
    return { test, passed: assertions.every((assertion) => assertion.passed), assertions };
  });
}

export function summarizeMcpTests(results: McpTestResult[]) { const passed = results.filter((item) => item.passed).length; return { total: results.length, passed, failed: results.length - passed, passRate: results.length ? passed / results.length : 0 }; }
