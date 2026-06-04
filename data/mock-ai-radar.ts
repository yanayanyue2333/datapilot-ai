import type { AIRadarItem } from "@/types";

export const aiRadarItems: AIRadarItem[] = [
  { id: "gpt", productName: "GPT", updateOrMechanism: "具备工具调用和结构化响应模式的助手。", innovation: "把自然语言入口、任务执行和上下文管理结合起来。", lessonForDataPilot: "让分析流程可检查、可行动，而不是只给一句结论。", featureOpportunity: "通过可见的产品级 Analysis Trace 引导数据智能体运行。" },
  { id: "claude", productName: "Claude", updateOrMechanism: "以 Artifact 为中心的协作和长上下文综合。", innovation: "把对话沉淀为可审阅、可复用的工作产物。", lessonForDataPilot: "数据答案应该沉淀为可复用的决策材料。", featureOpportunity: "从分析过程自动生成 PRD、复盘和审核摘要。" },
  { id: "openclaw", productName: "OpenClaw", updateOrMechanism: "开放式智能体技能编排模式。", innovation: "让技能可组合、可审计。", lessonForDataPilot: "拆分技能定义、运行历史和效果评估。", featureOpportunity: "建立带 PM 成功指标的 Agent Skill 市场。" },
  { id: "gemini", productName: "Gemini", updateOrMechanism: "多模态工作区集成。", innovation: "把 AI 带入文档、表格和运营流程。", lessonForDataPilot: "在用户已有的数据复盘场景中提供能力。", featureOpportunity: "把分析审核结果导出到文档和计划模板。" },
  { id: "perplexity", productName: "Perplexity", updateOrMechanism: "带引用来源的答案优先研究体验。", innovation: "通过来源可见性建立信任。", lessonForDataPilot: "每个指标答案都需要来源、口径和置信度。", featureOpportunity: "为指标口径和 SQL 血缘提供引用面板。" },
  { id: "cursor", productName: "Cursor", updateOrMechanism: "带可审阅 diff 的智能体编辑。", innovation: "用人工审核边界约束高自主性工作。", lessonForDataPilot: "高风险指标变更应在上线前由分析师审批。", featureOpportunity: "指标口径 diff 和审批工作流。" },
];
