import { ArrowDownRight, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { FunnelStepEvidence } from "@/types";

export function FunnelEvidencePanel({ steps }: { steps: FunnelStepEvidence[] }) {
  const maxUsers = Math.max(...steps.map((step) => step.users));

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            <Route className="h-4 w-4" />
            Funnel breakdown
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">GMV 异常转化漏斗</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            用模拟埋点数据展示从访问到支付成功的漏斗断点，帮助说明 AI 助手如何把异常结论转成可审核证据。
          </p>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
          Screenshot ready
        </span>
      </div>
      <div className="mt-6 space-y-4">
        {steps.map((step, index) => {
          const width = Math.max(12, Math.round((step.users / maxUsers) * 100));
          return (
            <div key={step.id} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[180px_1fr_280px]">
              <div>
                <p className="text-xs font-medium text-slate-500">Step {index + 1}</p>
                <h3 className="mt-1 text-sm font-semibold text-slate-950">{step.label}</h3>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{step.users.toLocaleString()}</p>
              </div>
              <div className="flex min-w-0 items-center">
                <div className="h-9 w-full rounded-md bg-white">
                  <div className="h-9 rounded-md bg-blue-600" style={{ width: `${width}%` }} />
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">转化率：</span>
                  {step.conversionFromPrevious === null ? "入口" : formatPercent(step.conversionFromPrevious)}
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-medium text-slate-900">较基线：</span>
                  {step.deltaVsBaseline === null ? (
                    "N/A"
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                      <ArrowDownRight className="h-3.5 w-3.5" />
                      {formatPointDelta(step.deltaVsBaseline)}
                    </span>
                  )}
                </p>
                <p className="leading-5 text-slate-700">{step.diagnosis}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function formatPointDelta(value: number) {
  return `${Math.round(value * 100)}pp`;
}
