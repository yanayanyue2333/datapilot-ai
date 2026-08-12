"use client";

import { useState } from "react";
import { Ban, Check, Play, RotateCcw, ShieldAlert } from "lucide-react";
import { mcpScenarios } from "@/data/mcp-practice";
import { prepareMcpRun, resolveMcpPermission } from "@/lib/mcp/mock-executor";
import type { McpRunResult, McpScenario } from "@/types/mcp-practice";
import { McpCostPanel } from "./McpCostPanel";
import { McpTraceTable } from "./McpTraceTable";

export function McpDemo() {
  const [scenarioId, setScenarioId] = useState<McpScenario["id"]>("normal-gmv");
  const [result, setResult] = useState<McpRunResult | null>(null);
  const scenario = mcpScenarios.find((item) => item.id === scenarioId)!;
  function selectScenario(id: McpScenario["id"]) { setScenarioId(id); setResult(null); }

  return (
    <section aria-labelledby="demo-title" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase text-blue-600">Deterministic mock executor</p><h2 id="demo-title" className="mt-2 text-2xl font-semibold text-slate-950">受治理的 GMV 异常诊断</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">选择场景后准备运行。需要数据查询时，系统会先展示权限确认；拒绝后不会继续调用。</p></div><span className="w-fit rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Mock / 无真实调用</span></div>
      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="min-w-0"><label htmlFor="mcp-scenario" className="text-xs font-semibold text-slate-700">预置场景</label><select id="mcp-scenario" value={scenarioId} onChange={(event) => selectScenario(event.target.value as McpScenario["id"])} className="mt-2 h-11 w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-400">{mcpScenarios.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><div className="mt-4 border-l-2 border-blue-600 pl-4"><p className="text-sm font-semibold text-slate-950">{scenario.name}</p><p className="mt-2 text-sm leading-6 text-slate-600">{scenario.description}</p><dl className="mt-4 space-y-2 text-xs text-slate-500"><div className="flex justify-between gap-3"><dt>指标</dt><dd className="font-mono text-slate-800">{scenario.metric}</dd></div><div className="flex justify-between gap-3"><dt>日期</dt><dd className="text-right text-slate-800">{scenario.dateRange}</dd></div><div className="flex justify-between gap-3"><dt>维度</dt><dd className="text-right text-slate-800">{scenario.dimensions.join(", ")}</dd></div></dl></div><button type="button" onClick={() => setResult(prepareMcpRun(scenarioId))} className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-medium text-white hover:bg-slate-800"><Play className="h-4 w-4" />准备运行</button></div>
        <div className="min-w-0 border-l-0 border-slate-200 xl:border-l xl:pl-6">
          {!result ? <EmptyState /> : <RunResult result={result} onAllow={() => setResult(resolveMcpPermission(scenarioId, "allow"))} onDeny={() => setResult(resolveMcpPermission(scenarioId, "deny"))} onReset={() => setResult(null)} />}
        </div>
      </div>
    </section>
  );
}

function RunResult({ result, onAllow, onDeny, onReset }: { result: McpRunResult; onAllow: () => void; onDeny: () => void; onReset: () => void }) {
  return <div className="space-y-6"><div className={`border-l-4 p-4 ${result.status === "completed" ? "border-emerald-500 bg-emerald-50" : result.status === "awaiting_confirmation" ? "border-blue-500 bg-blue-50" : result.status === "escalated" || result.status === "degraded" ? "border-amber-500 bg-amber-50" : "border-rose-500 bg-rose-50"}`}><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-base font-semibold text-slate-950">{result.headline}</p><p className="mt-1 text-sm leading-6 text-slate-700">{result.message}</p>{result.reviewId ? <p className="mt-2 font-mono text-xs font-semibold text-blue-700">Review ID: {result.reviewId}</p> : null}</div><button type="button" onClick={onReset} title="重置运行" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-white/60 hover:text-slate-900"><RotateCcw className="h-4 w-4" /><span className="sr-only">重置运行</span></button></div></div>
    {result.permissionRequest ? <div className="rounded-md border border-blue-200 bg-white p-5"><div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-blue-700" /><h3 className="text-sm font-semibold text-slate-950">数据查询权限确认</h3></div><p className="mt-2 text-xs leading-5 text-slate-500">允许后将执行一次只读 Mock 工具调用。请先确认以下范围与成本。</p><dl className="mt-5 grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">{[["工具",result.permissionRequest.tool],["数据范围",result.permissionRequest.dataScope],["日期范围",result.permissionRequest.dateRange],["维度",result.permissionRequest.dimensions.join(", ")],["预计扫描",`${result.permissionRequest.estimatedScanGb} GB`],["预计查询成本",`$${result.permissionRequest.estimatedCostUsd.toFixed(5)}`]].map(([label,value]) => <div key={label} className="min-w-0 bg-slate-50 p-3"><dt className="text-[11px] text-slate-500">{label}</dt><dd className="mt-1 break-words text-xs font-semibold text-slate-900">{value}</dd></div>)}</dl><div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onDeny} className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"><Ban className="h-4 w-4" />拒绝</button><button type="button" onClick={onAllow} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"><Check className="h-4 w-4" />允许只读查询</button></div></div> : null}
    {result.alternatives.length ? <div><h3 className="text-sm font-semibold text-slate-950">受治理的下一步</h3><ul className="mt-3 space-y-2">{result.alternatives.map((item) => <li key={item} className="text-sm text-slate-600">· {item}</li>)}</ul></div> : null}
    <McpTraceTable trace={result.trace} /><McpCostPanel cost={result.cost} /></div>;
}

function EmptyState() { return <div className="flex min-h-[300px] items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-8 text-center"><div><ShieldAlert className="mx-auto h-6 w-6 text-slate-400" /><p className="mt-3 text-sm font-medium text-slate-800">尚未准备运行</p><p className="mt-1 text-xs leading-5 text-slate-500">选择左侧场景，查看确定性的治理决策、Trace 与成本。</p></div></div>; }
