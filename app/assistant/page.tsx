import { PageHeader } from "@/components/shared/PageHeader";
import { DataAssistantChat } from "@/components/assistant/DataAssistantChat";

export default function AssistantPage() {
  return (
    <>
      <PageHeader title="AI 数据助手" description="一个受指标口径约束的自然语言数据助手：回答前先检查问题意图、指标定义、置信度和是否需要分析师审核。" />
      <DataAssistantChat />
    </>
  );
}
