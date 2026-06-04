import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const layers = [
  { title: "渠道拆解", finding: "自然流量渠道 GMV 环比下降 18.9%，付费渠道基本持平。", metric: "organic GMV -18.9%", confidence: "高", action: "继续检查首页推荐和搜索入口流量质量。" },
  { title: "用户分群拆解", finding: "新用户与沉默回流用户下降最明显，老客复购贡献稳定。", metric: "new user paid_orders -11.4%", confidence: "中", action: "拆分新用户首购路径和回流召回路径。" },
  { title: "转化漏斗拆解", finding: "商品详情页到支付成功的转化率下滑，主要集中在移动端。", metric: "conversion_rate -4.7pp", confidence: "高", action: "检查支付链路、库存提示和推荐商品匹配度。" }
];

export function DrilldownPath() {
  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-950">引导式下钻路径</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {layers.map((layer, index) => (
          <div key={layer.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">第 {index + 1} 层</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-950">{layer.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{layer.finding}</p>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <p><span className="font-medium text-slate-900">支撑指标：</span>{layer.metric}</p>
              <p><span className="font-medium text-slate-900">置信度：</span>{layer.confidence}</p>
              <p><span className="font-medium text-slate-900">建议下一步：</span>{layer.action}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
