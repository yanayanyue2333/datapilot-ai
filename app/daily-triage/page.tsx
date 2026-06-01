import { PageHeader } from "@/components/shared/PageHeader";
import { DailyTriageDesk } from "@/components/triage/DailyTriageDesk";
import { DailyTriageIntro } from "@/components/triage/DailyTriageIntro";

export default function DailyTriagePage() {
  return (
    <>
      <PageHeader title="Daily Triage" description="A daily operating workflow for PMs to scan business movement, detect anomalies, and decide which questions need deeper analysis." />
      <div className="space-y-6">
        <DailyTriageIntro />
        <DailyTriageDesk />
      </div>
    </>
  );
}
