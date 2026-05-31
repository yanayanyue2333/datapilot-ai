import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";

export default function AssistantPage() {
  return (
    <>
      <PageHeader title="Assistant" description="A governed natural-language data assistant that checks intent, metric definitions, confidence, and review requirements before answering." />
      <PreviewGrid items={[
        { title: "Intent detection", body: "Map vague business questions to analysis intents such as GMV attribution, retention decline, and channel ROI." },
        { title: "Metric guardrail", body: "Refuse direct answers when required metrics are undefined or pending review." },
        { title: "Product trace", body: "Show user-facing trace steps without exposing model chain-of-thought." },
        { title: "Review handoff", body: "Send high-impact answers to analyst review before stakeholders act on them." }
      ]} />
    </>
  );
}
