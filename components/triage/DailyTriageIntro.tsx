import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DailyTriageIntro() {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Daily data triage desk</p>
          <h2 className="mt-2 text-xl font-semibold text-blue-950">这里不是静态看板，而是你的每日数据分诊台。</h2>
          <p className="mt-2 text-sm leading-6 text-blue-900">我会先帮你发现异常，再引导你继续拆解原因，形成假设、行动建议和复盘任务。</p>
        </div>
      </div>
    </Card>
  );
}
