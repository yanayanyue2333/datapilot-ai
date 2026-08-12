"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleDashed, ExternalLink, Filter, OctagonAlert } from "lucide-react";
import { acceptanceCases } from "@/data/product-delivery";
import { summarizeAcceptance } from "@/lib/product-delivery/evaluation";
import type { AcceptanceStatus } from "@/types/product-delivery";
import { SectionHeading } from "./PublicPrd";

const statusLabels: Record<AcceptanceStatus, string> = { passed: "通过", blocked: "阻塞", not_run: "未执行" };
const modules = ["全部模块", ...Array.from(new Set(acceptanceCases.map((item) => item.module)))];

export function AcceptanceChecklist() {
  const [moduleFilter, setModuleFilter] = useState("全部模块");
  const [statusFilter, setStatusFilter] = useState<"all" | AcceptanceStatus>("all");
  const summary = summarizeAcceptance(acceptanceCases);
  const visibleCases = useMemo(() => acceptanceCases.filter((item) => (moduleFilter === "全部模块" || item.module === moduleFilter) && (statusFilter === "all" || item.status === statusFilter)), [moduleFilter, statusFilter]);

  return (
    <section id="acceptance" className="scroll-mt-32 space-y-6">
      <SectionHeading eyebrow="B / Acceptance evidence" title="功能验收清单" description="状态与汇总均由验收用例数据计算。筛选只改变列表，不改变全量发布汇总。" />
      <div className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="用例总数" value={String(summary.total)} helper="覆盖治理、权限、异常与审计" />
        <Stat label="通过" value={String(summary.passed)} helper="断言与证据均满足" tone="success" />
        <Stat label="阻塞" value={String(summary.blocked)} helper={`${summary.not_run} 条尚未执行`} tone="danger" />
        <Stat label="通过率" value={`${(summary.passRate * 100).toFixed(1)}%`} helper="通过数 / 全部用例" />
      </div>

      <div className="flex flex-col gap-3 border-y border-slate-200 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Filter className="h-4 w-4" />筛选</div>
        <select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)} aria-label="按模块筛选" className="h-10 min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 sm:w-52">
          {modules.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | AcceptanceStatus)} aria-label="按状态筛选" className="h-10 min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 sm:w-40">
          <option value="all">全部状态</option><option value="passed">通过</option><option value="blocked">阻塞</option><option value="not_run">未执行</option>
        </select>
        <p className="text-xs text-slate-500 sm:ml-auto">当前显示 {visibleCases.length} / {acceptanceCases.length}</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-[1500px] w-full text-left text-xs">
          <thead className="sticky top-0 bg-slate-50 text-slate-500"><tr>{["用例 / 需求", "模块", "优先级", "前置条件", "Given / When / Then", "预期结果", "状态", "证据", "Owner"].map((item) => <th key={item} className="border-b border-slate-200 px-3 py-3 font-semibold">{item}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {visibleCases.map((item) => (
              <tr key={item.id} className="align-top hover:bg-slate-50/60">
                <td className="px-3 py-4"><p className="font-mono font-semibold text-slate-900">{item.id}</p><p className="mt-1 font-mono text-blue-700">{item.requirementId}</p></td>
                <td className="px-3 py-4 text-slate-700">{item.module}</td><td className="px-3 py-4 font-semibold text-slate-600">{item.priority}</td><td className="max-w-[190px] px-3 py-4 leading-5 text-slate-600">{item.precondition}</td>
                <td className="max-w-[330px] space-y-1 px-3 py-4 leading-5"><p><b className="text-slate-900">Given</b> {item.given}</p><p><b className="text-slate-900">When</b> {item.when}</p><p><b className="text-slate-900">Then</b> {item.then}</p></td>
                <td className="max-w-[230px] px-3 py-4 leading-5 text-slate-600">{item.expectedResult}</td><td className="px-3 py-4"><Status status={item.status} /></td>
                <td className="px-3 py-4"><Link href={item.evidenceHref} className="inline-flex items-center gap-1 font-medium text-blue-700 hover:text-blue-900">{item.evidenceLabel}<ExternalLink className="h-3 w-3" /></Link></td><td className="whitespace-nowrap px-3 py-4 text-slate-600">{item.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Stat({ label, value, helper, tone = "default" }: { label: string; value: string; helper: string; tone?: "default" | "success" | "danger" }) { return <div className="bg-white p-5"><p className="text-xs text-slate-500">{label}</p><p className={`mt-2 text-2xl font-semibold ${tone === "success" ? "text-emerald-700" : tone === "danger" ? "text-rose-700" : "text-slate-950"}`}>{value}</p><p className="mt-1 text-xs text-slate-500">{helper}</p></div>; }
function Status({ status }: { status: AcceptanceStatus }) { const Icon = status === "passed" ? CheckCircle2 : status === "blocked" ? OctagonAlert : CircleDashed; return <span className={`inline-flex items-center gap-1 rounded px-2 py-1 font-medium ${status === "passed" ? "bg-emerald-50 text-emerald-700" : status === "blocked" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"}`}><Icon className="h-3 w-3" />{statusLabels[status]}</span>; }
