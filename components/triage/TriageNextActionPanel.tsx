import { ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";

export function TriageNextActionPanel() {
  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">推荐后续动作</p>
          <h2 className="mt-2 text-xl font-semibold text-emerald-950">可能原因假设</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-900">本周 GMV 下滑更可能来自自然流量质量下降叠加移动端支付转化下滑，而不是付费渠道预算变化。</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Info label="建议产品动作" value="优先排查首页推荐流量质量、搜索入口变化和移动端支付链路。" />
            <Info label="需要验证的数据" value="确认活动日、库存异常和埋点口径是否影响自然流量转化。" />
            <Info label="负责人" value="增长 PM + 数据分析师" />
            <Info label="优先级" value="本周 P1" />
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg border border-emerald-200 bg-white p-5">
          <button className="inline-flex h-10 items-center rounded-md bg-emerald-700 px-4 text-sm font-medium text-white hover:bg-emerald-800" type="button">
            <ClipboardList className="mr-2 h-4 w-4" />
            创建复盘任务
          </button>
        </div>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <p className="text-xs font-medium text-emerald-700">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
