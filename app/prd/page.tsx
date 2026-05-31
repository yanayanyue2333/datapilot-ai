import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";

export default function PRDPage() {
  return (
    <>
      <PageHeader title="PRD Workspace" description="A product documentation surface for translating user problems, metrics, guardrails, and review flows into clear MVP requirements." />
      <PreviewGrid items={[
        { title: "Problem framing", body: "Document why PMs need governed AI data assistance instead of generic chat." },
        { title: "MVP scope", body: "Define assistant, registry, skills, review, and ops workflows in phased releases." },
        { title: "Success metrics", body: "Track answer satisfaction, false rejection rate, review turnaround, and skill reuse." },
        { title: "Risk controls", body: "Specify refusal rules, confidence thresholds, analyst handoff, and metric approval gates." }
      ]} />
    </>
  );
}
