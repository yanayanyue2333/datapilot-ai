import { AlertTriangle } from "lucide-react";
import type { HonestRefusal } from "@/types";
import { MetricRequestCTA } from "@/components/assistant/MetricRequestCTA";

export function HonestRefusalCard({ refusal }: { refusal: HonestRefusal }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-700">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Honest Refusal / 诚实拒答</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">我暂时不能直接回答这个问题。</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{refusal.reason}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-950">缺失的指标口径</h3>
          <p className="mt-2 text-sm text-slate-600">{refusal.missingMetric}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-950">需要数据团队确认</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{refusal.requiredConfirmation}</p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-950">可先进行的替代分析</h3>
        <ul className="mt-3 space-y-2">
          {refusal.alternativeAnalysis.map((item) => (
            <li key={item} className="text-sm leading-6 text-slate-600">{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <MetricRequestCTA metricName={refusal.missingMetric} />
      </div>
    </div>
  );
}
