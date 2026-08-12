import { Braces, Database, ShieldCheck } from "lucide-react";
import { mcpToolDefinitions } from "@/data/mcp-practice";
import type { JsonSchemaField, McpToolDefinition } from "@/types/mcp-practice";

const icons = { metric_registry_get: ShieldCheck, warehouse_query_metric: Database, create_analyst_review: Braces };

export function ToolCatalog() {
  return (
    <section aria-labelledby="tool-catalog-title" className="space-y-6">
      <div><p className="text-xs font-semibold uppercase text-blue-600">Mock tool contracts</p><h2 id="tool-catalog-title" className="mt-2 text-2xl font-semibold text-slate-950">三个受治理的 MCP 工具</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">工具定义服务于 GMV 异常诊断的产品边界。当前页面不连接真实 MCP Server、数据库或外部服务。</p></div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {mcpToolDefinitions.map((tool) => <ToolContract key={tool.name} tool={tool} />)}
      </div>
    </section>
  );
}

function ToolContract({ tool }: { tool: McpToolDefinition }) {
  const Icon = icons[tool.name];
  return (
    <article className="py-7">
      <div className="grid gap-6 xl:grid-cols-[0.65fr_1.35fr]">
        <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100"><Icon className="h-4 w-4 text-slate-700" /></span><h3 className="break-all font-mono text-sm font-semibold text-slate-950">{tool.name}</h3></div><p className="mt-4 text-sm leading-6 text-slate-600">{tool.purpose}</p><div className="mt-5 flex flex-wrap gap-2"><Badge label={`Scope: ${tool.scope}`} /><Badge label={`风险: ${tool.risk}`} tone={tool.risk === "高" ? "warning" : "default"} /><Badge label={tool.requiresConfirmation ? "需要用户确认" : "无需额外确认"} /></div></div>
        <div className="grid gap-5 md:grid-cols-2"><Schema title="JSON 输入结构" fields={tool.inputSchema} /><Schema title="JSON 输出结构" fields={tool.outputSchema} /></div>
      </div>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
        {[['超时',tool.timeoutPolicy],['重试',tool.retryPolicy],['幂等',tool.idempotencyPolicy],['脱敏',tool.redactionPolicy]].map(([label,value]) => <div key={label} className="bg-white p-4"><dt className="text-xs font-semibold text-slate-900">{label}</dt><dd className="mt-2 text-xs leading-5 text-slate-600">{value}</dd></div>)}
      </dl>
    </article>
  );
}

function Schema({ title, fields }: { title: string; fields: JsonSchemaField[] }) { return <div className="min-w-0 rounded-md bg-slate-950 p-4 text-xs text-slate-300"><p className="mb-3 font-sans font-semibold text-slate-100">{title}</p><pre className="overflow-x-auto font-mono leading-6"><code>{`{\n${fields.map((field) => `  \"${field.name}${field.required ? "" : "?"}\": \"${field.type}\"`).join(",\n")}\n}`}</code></pre><div className="mt-4 space-y-2 border-t border-slate-800 pt-3">{fields.map((field) => <p key={field.name}><span className="font-mono text-blue-300">{field.name}</span><span className="ml-2 text-slate-400">{field.description}</span></p>)}</div></div>; }
function Badge({ label, tone = "default" }: { label: string; tone?: "default" | "warning" }) { return <span className={`rounded px-2 py-1 text-xs font-medium ${tone === "warning" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{label}</span>; }
