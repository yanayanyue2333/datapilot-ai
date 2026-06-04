import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";

export default function PRDPage() {
  return (
    <>
      <PageHeader title="PRD｜产品需求文档" description="将用户问题、指标口径、风控机制和审核流程整理成清晰 MVP 需求的产品文档工作区。" />
      <PreviewGrid items={[
        { title: "问题定义", body: "说明为什么产品经理需要受治理的 AI 数据助手，而不是通用聊天机器人。" },
        { title: "MVP 范围", body: "分阶段定义助手、指标口径库、Agent Skill、审核和运营工作流。" },
        { title: "成功指标", body: "跟踪答案满意度、误拒率、审核时长、技能复用率和洞察产出效率。" },
        { title: "风险控制", body: "明确拒答规则、置信度阈值、分析师交接和指标审批门槛。" },
      ]} />
    </>
  );
}
