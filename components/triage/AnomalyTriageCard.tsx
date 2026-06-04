"use client";

import { CheckCircle2, ClipboardList, GitBranch, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface TriageAnomaly {
  id: string;
  title: string;
  impact: "High" | "Medium";
  affectedMetrics: string[];
  initialSignal: string;
  recommendedNextStep: string;
}

export function AnomalyTriageCard({ anomaly, selected, onDrilldown }: { anomaly: TriageAnomaly; selected: boolean; onDrilldown: () => void }) {
  return (
    <Card className={selected ? "border-blue-300 shadow-soft" : undefined}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">检测到异常</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950">{anomaly.title}</h3>
        </div>
        <span className={anomaly.impact === "High" ? "rounded-full bg-rose-100 px-2.5 py-1 text-xs text-rose-700" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700"}>{anomaly.impact === "High" ? "高影响" : "中影响"}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {anomaly.affectedMetrics.map((metric) => (
          <span key={metric} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{metric}</span>
        ))}
      </div>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        <p><span className="font-medium text-slate-950">初始信号：</span>{anomaly.initialSignal}</p>
        <p><span className="font-medium text-slate-950">建议下一步：</span>{anomaly.recommendedNextStep}</p>
      </div>
      <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">点击继续拆解，我会带你从渠道、用户分群、转化漏斗三层继续下钻。</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800" type="button" onClick={onDrilldown}>
          <GitBranch className="mr-2 h-4 w-4" />
          继续拆解
        </button>
        <button className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button">
          <Search className="mr-2 h-4 w-4" />
          查看口径
        </button>
        <button className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          标记已知原因
        </button>
        <button className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button">
          <ClipboardList className="mr-2 h-4 w-4" />
          创建复盘任务
        </button>
      </div>
    </Card>
  );
}
