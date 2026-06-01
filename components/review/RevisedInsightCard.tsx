import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function RevisedInsightCard() {
  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-5 w-5 text-emerald-700" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Revised insight</p>
          <h3 className="mt-2 text-lg font-semibold text-emerald-950">Human-reviewed conclusion</h3>
          <p className="mt-3 text-sm leading-6 text-emerald-900">
            排除 6.18 后，本月自然日 GMV 环比下降 7.4%。主要原因不是高价值用户增长，而是自然流量渠道转化率下降。建议优先排查首页推荐流量质量与支付转化链路。
          </p>
        </div>
      </div>
    </Card>
  );
}
