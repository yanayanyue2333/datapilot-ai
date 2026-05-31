import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";

export default function CaseStudyPage() {
  return (
    <>
      <PageHeader title="Case Study" description="A portfolio narrative showing how DataPilot AI solves a realistic AI data assistant problem with metric governance and human validation." />
      <PreviewGrid items={[
        { title: "Soul moment", body: "The assistant refuses to explain profit decline because profit is not yet defined." },
        { title: "Governance loop", body: "A metric definition request enters analyst review before the assistant can use it." },
        { title: "Review correction", body: "An analyst catches promotion-day inflation and revises the business conclusion." },
        { title: "Ops learning", body: "False rejections become intent mapping improvements and skill iteration backlog." }
      ]} />
    </>
  );
}
