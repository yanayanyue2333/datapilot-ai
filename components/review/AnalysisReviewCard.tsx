import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AnalysisReviewCard() {
  return (
    <Card className="border-rose-200 bg-rose-50">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-1 h-5 w-5 text-rose-700" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">Analysis Review Queue</p>
          <h2 className="mt-2 text-xl font-semibold text-rose-950">GMV 异常归因审核纠错</h2>
          <p className="mt-3 text-sm leading-6 text-rose-900">本月 GMV 环比上涨 18%，主要由付费用户订单增长驱动，建议增加高价值用户运营投入。</p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-950">SQL summary</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">The query compared this month vs last month but included 6.18 promotion day.</p>
      </div>
    </Card>
  );
}
