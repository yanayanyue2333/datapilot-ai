import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";
import { Card } from "@/components/ui/card";

export default function CaseStudyPage() {
  return (
    <>
      <PageHeader title="Case Study" description="A portfolio narrative showing how DataPilot AI solves a realistic AI data assistant problem with metric governance and human validation." />
      <div className="space-y-6">
        <PreviewGrid items={[
          { title: "Soul moment", body: "The assistant refuses to explain profit decline because profit is not yet defined." },
          { title: "Governance loop", body: "A metric definition request enters analyst review before the assistant can use it." },
          { title: "Review correction", body: "An analyst catches promotion-day inflation and revises the business conclusion." },
          { title: "Ops learning", body: "False rejections become intent mapping improvements and skill iteration backlog." }
        ]} />
        <Card className="border-blue-200 bg-blue-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Product Mechanism Highlights</p>
          <h2 className="mt-2 text-2xl font-semibold text-blue-950">From AI answer to operated data product</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <Mechanism title="Daily Triage" body="Turns a static dashboard into anomaly -> drilldown -> hypothesis -> recommendation -> follow-up task." />
            <Mechanism title="False Rejection Learning" body="User corrections update semantic mappings so Agent Skills better understand real business language." />
            <Mechanism title="Analyst Review Safety" body="Catches SQL scope mistakes, abnormal dates, metric ambiguity, and sample bias before AI output drives decisions." />
          </div>
        </Card>
      </div>
    </>
  );
}

function Mechanism({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
