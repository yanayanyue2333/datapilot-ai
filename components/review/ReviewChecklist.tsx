import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const checklist = ["指标口径已检查", "时间范围已检查", "异常事件日期已检查", "分群逻辑已检查", "SQL 过滤条件已检查", "业务 caveat 已补充"];

export function ReviewChecklist() {
  return (
    <Card>
      <h3 className="text-base font-semibold text-slate-950">分析师审核清单</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {checklist.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
