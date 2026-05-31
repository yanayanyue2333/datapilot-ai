import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";

export default function DailyTriagePage() {
  return (
    <>
      <PageHeader title="Daily Triage" description="A daily operating workflow for PMs to scan business movement, detect anomalies, and decide which questions need deeper analysis." />
      <PreviewGrid items={[
        { title: "Morning KPI scan", body: "DAU, orders, GMV, conversion, retention, and ROI movement in one working surface." },
        { title: "Anomaly queue", body: "Rank metric changes by severity, confidence, and business impact." },
        { title: "Skill recommendation", body: "Suggest the right Agent Skill for each triage item." },
        { title: "Decision log", body: "Capture what was reviewed, escalated, or ignored for later product ops review." }
      ]} />
    </>
  );
}
