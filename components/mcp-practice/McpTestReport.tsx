import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { runMcpTestSuite, summarizeMcpTests } from "@/lib/mcp/test-runner";

export function McpTestReport() {
  const results = runMcpTestSuite();
  const summary = summarizeMcpTests(results);
  return (
    <section aria-labelledby="mcp-tests-title" className="space-y-6">
      <div><p className="text-xs font-semibold uppercase text-blue-600">Deterministic test suite</p><h2 id="mcp-tests-title" className="mt-2 text-2xl font-semibold text-slate-950">MCP 测试集</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">12 条测试调用与交互演示相同的确定性执行器，覆盖成功、拒答、权限、异常、越权与人工升级。</p></div>
      <div className="grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200 sm:grid-cols-4"><Summary label="测试总数" value={String(summary.total)} /><Summary label="通过" value={String(summary.passed)} success /><Summary label="失败" value={String(summary.failed)} /><Summary label="通过率" value={`${(summary.passRate * 100).toFixed(1)}%`} success={summary.passRate === 1} /></div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {results.map((result) => <details key={result.test.id} className="group py-4"><summary className="flex cursor-pointer list-none items-center gap-3"><ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-90" />{result.passed ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="h-4 w-4 shrink-0 text-rose-600" />}<span className="font-mono text-xs font-semibold text-slate-500">{result.test.id}</span><span className="min-w-0 flex-1 text-sm font-medium text-slate-900">{result.test.name}</span><span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{result.test.category}</span></summary><div className="ml-11 mt-4 grid gap-2 sm:grid-cols-2">{result.assertions.map((assertion) => <div key={assertion.label} className="rounded-md bg-white p-3 text-xs"><div className="flex items-start gap-2">{assertion.passed ? <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-rose-600" />}<div><p className="font-medium text-slate-800">{assertion.label}</p><p className="mt-1 break-words font-mono leading-5 text-slate-500">actual: {assertion.actual}</p></div></div></div>)}</div></details>)}
      </div>
    </section>
  );
}

function Summary({ label, value, success = false }: { label: string; value: string; success?: boolean }) { return <div className="bg-white p-4"><p className="text-xs text-slate-500">{label}</p><p className={`mt-2 text-xl font-semibold ${success ? "text-emerald-700" : "text-slate-950"}`}>{value}</p></div>; }
