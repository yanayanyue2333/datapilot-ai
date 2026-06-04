import { PageHeader } from "@/components/shared/PageHeader";
import { DailyTriageDesk } from "@/components/triage/DailyTriageDesk";
import { DailyTriageIntro } from "@/components/triage/DailyTriageIntro";

export default function DailyTriagePage() {
  return (
    <>
      <PageHeader title="每日数据分诊" description="面向产品经理的每日数据工作台：发现异常、继续拆解、形成假设、推荐动作，并创建后续复盘任务。" />
      <div className="space-y-6">
        <DailyTriageIntro />
        <DailyTriageDesk />
      </div>
    </>
  );
}
