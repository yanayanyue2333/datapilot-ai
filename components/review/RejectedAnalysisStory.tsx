import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function RejectedAnalysisStory() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <XCircle className="mt-1 h-5 w-5 text-rose-600" />
        <div>
          <h3 className="text-base font-semibold text-slate-950">Analyst finding</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">SQL 时间范围包含 6.18 大促日，导致 GMV 被异常放大。当前结论不能代表自然经营趋势。</p>
        </div>
      </div>
      <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4">
        <h4 className="text-sm font-semibold text-amber-950">Rejection comment</h4>
        <p className="mt-2 text-sm leading-6 text-amber-900">请排除 6.18 大促日，并重新计算自然日 GMV 环比变化。</p>
      </div>
    </Card>
  );
}
