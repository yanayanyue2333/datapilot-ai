import { CircleDollarSign } from "lucide-react";
import type { McpCostBreakdown } from "@/types/mcp-practice";

export function McpCostPanel({ cost }: { cost: McpCostBreakdown }) {
  const items = [
    { label: "模型 Input", value: cost.modelInputUsd, meta: `${cost.inputTokens} tokens` },
    { label: "模型 Output", value: cost.modelOutputUsd, meta: `${cost.outputTokens} tokens` },
    { label: "MCP 工具", value: cost.mcpToolsUsd, meta: `${cost.toolCalls} 次调用` },
    { label: "模拟查询扫描", value: cost.queryScanUsd, meta: `${cost.scanGb} GB` },
  ];
  return <section aria-labelledby="cost-title"><div className="flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-blue-600" /><h3 id="cost-title" className="text-sm font-semibold text-slate-950">单次运行成本拆分</h3></div><div className="mt-4 grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-5">{items.map((item) => <div key={item.label} className="bg-white p-4"><p className="text-xs text-slate-500">{item.label}</p><p className="mt-2 font-mono text-sm font-semibold text-slate-950">${item.value.toFixed(5)}</p><p className="mt-1 text-[11px] text-slate-400">{item.meta}</p></div>)}<div className="bg-slate-950 p-4 text-white"><p className="text-xs text-slate-300">总成本</p><p className="mt-2 font-mono text-lg font-semibold">${cost.totalUsd.toFixed(5)}</p><p className="mt-1 text-[11px] text-slate-400">公开假设单价估算</p></div></div></section>;
}
