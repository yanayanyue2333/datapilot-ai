import { CheckCircle2, CircleDashed, ShieldAlert } from "lucide-react";
import type { AnalysisTraceStep } from "@/types";
import { cn } from "@/lib/utils";

export function AnalysisTrace({ steps, visibleCount }: { steps: AnalysisTraceStep[]; visibleCount: number }) {
  const visibleSteps = steps.slice(0, visibleCount);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Analysis Trace</h2>
          <p className="mt-1 text-xs text-slate-500">Product-level trace only. No model chain-of-thought is exposed.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{visibleSteps.length}/{steps.length}</span>
      </div>
      <div className="mt-5 space-y-3">
        {visibleSteps.map((step, index) => {
          const Icon = step.status === "blocked" ? ShieldAlert : step.status === "completed" ? CheckCircle2 : CircleDashed;
          return (
            <div key={step.id} className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
              <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full", step.status === "blocked" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Step {index + 1}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px]", step.status === "blocked" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>{step.status}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-950">{step.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{step.productVisibleReason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
