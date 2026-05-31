import type { FalseRejectionLog, ProductUsageLog } from "@/types";

export const usageLogs: ProductUsageLog[] = [
  { id: "2026-05-24", date: "May 24", dau: 82, questions: 214, skillRuns: 71, answerSatisfaction: 4.2, failureRate: 0.13, lowConfidenceAnswerRatio: 0.18, humanInterventionRate: 0.22 },
  { id: "2026-05-25", date: "May 25", dau: 91, questions: 248, skillRuns: 86, answerSatisfaction: 4.3, failureRate: 0.11, lowConfidenceAnswerRatio: 0.16, humanInterventionRate: 0.2 },
  { id: "2026-05-26", date: "May 26", dau: 104, questions: 283, skillRuns: 97, answerSatisfaction: 4.5, failureRate: 0.09, lowConfidenceAnswerRatio: 0.14, humanInterventionRate: 0.18 },
  { id: "2026-05-27", date: "May 27", dau: 99, questions: 261, skillRuns: 91, answerSatisfaction: 4.4, failureRate: 0.1, lowConfidenceAnswerRatio: 0.15, humanInterventionRate: 0.19 }
];

export const topFailedQuestions = ["Why did profit decline this month?", "Which campaigns created real incrementality?", "Did the launch improve retention for new users?"];

export const falseRejectionLogs: FalseRejectionLog[] = [
  { id: "fr-1", userQuestion: "单量走得有点疲，是哪里掉了吗？", mappedIntent: "orders decline analysis", rejectionReason: "Informal wording was not mapped to orders.", proposedFix: "Add colloquial intent examples for order movement.", severity: "high" },
  { id: "fr-2", userQuestion: "最近投放是不是亏了？", mappedIntent: "channel ROI analysis", rejectionReason: "Assistant required exact ROI keyword.", proposedFix: "Map spend loss language to ROI and CAC checks.", severity: "high" },
  { id: "fr-3", userQuestion: "老用户是不是不太回来了？", mappedIntent: "retention decline analysis", rejectionReason: "Retention metric was available but not linked to user phrasing.", proposedFix: "Bind returning-user language to retention_rate.", severity: "medium" },
  { id: "fr-4", userQuestion: "这波活动是不是虚火？", mappedIntent: "campaign quality analysis", rejectionReason: "Campaign quality was not represented as an analysis intent.", proposedFix: "Route to GMV, conversion, refund, and ROI comparison.", severity: "medium" }
];
