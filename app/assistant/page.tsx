import { PageHeader } from "@/components/shared/PageHeader";
import { DataAssistantChat } from "@/components/assistant/DataAssistantChat";

export default function AssistantPage() {
  return (
    <>
      <PageHeader title="Assistant" description="A governed natural-language data assistant that checks intent, metric definitions, confidence, and review requirements before answering." />
      <DataAssistantChat />
    </>
  );
}
