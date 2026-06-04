import type { FalseRejectionLog, ProductUsageLog } from "@/types";

export const usageLogs: ProductUsageLog[] = [
  { id: "2026-05-24", date: "5 月 24 日", dau: 82, questions: 214, skillRuns: 71, answerSatisfaction: 4.2, failureRate: 0.13, lowConfidenceAnswerRatio: 0.18, humanInterventionRate: 0.22 },
  { id: "2026-05-25", date: "5 月 25 日", dau: 91, questions: 248, skillRuns: 86, answerSatisfaction: 4.3, failureRate: 0.11, lowConfidenceAnswerRatio: 0.16, humanInterventionRate: 0.2 },
  { id: "2026-05-26", date: "5 月 26 日", dau: 104, questions: 283, skillRuns: 97, answerSatisfaction: 4.5, failureRate: 0.09, lowConfidenceAnswerRatio: 0.14, humanInterventionRate: 0.18 },
  { id: "2026-05-27", date: "5 月 27 日", dau: 99, questions: 261, skillRuns: 91, answerSatisfaction: 4.4, failureRate: 0.1, lowConfidenceAnswerRatio: 0.15, humanInterventionRate: 0.19 },
];

export const topFailedQuestions = ["为什么本月利润下降？", "哪些活动真正带来了增量？", "这次上线是否提升了新用户留存？"];

export const falseRejectionLogs: FalseRejectionLog[] = [
  { id: "fr-1", userQuestion: "单量走得有点疲，是哪里掉了吗？", mappedIntent: "orders decline analysis", rejectionReason: "口语表达未映射到订单分析。", proposedFix: "补充订单变化相关的口语化意图样本。", severity: "high" },
  { id: "fr-2", userQuestion: "最近投放是不是亏了？", mappedIntent: "channel ROI analysis", rejectionReason: "助手过度依赖精确的 ROI 关键词。", proposedFix: "将投放亏损相关表达映射到 ROI 和 CAC 检查。", severity: "high" },
  { id: "fr-3", userQuestion: "老用户是不是不太回来了？", mappedIntent: "retention decline analysis", rejectionReason: "留存指标可用，但未关联到用户表达。", proposedFix: "将老用户回访语言绑定到 retention_rate。", severity: "medium" },
  { id: "fr-4", userQuestion: "这波活动是不是虚火？", mappedIntent: "campaign quality analysis", rejectionReason: "活动质量未被建模为分析意图。", proposedFix: "路由到 GMV、转化、退款和 ROI 对比。", severity: "medium" },
];
