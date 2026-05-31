import type { AnalysisReview } from "@/types";

export const analysisReviews: AnalysisReview[] = [
  {
    id: "review-618",
    initialAnalysis: "GMV increased 18%, mainly driven by paid user order growth.",
    analystFinding: "The SQL included the 6.18 promotion day, causing abnormal inflation.",
    rejectionComment: "请排除 6.18 大促日，并重新计算自然日 GMV 环比变化。",
    revisedInsight: "After excluding 6.18, natural-day GMV decreased 7.4%, mainly due to lower conversion from organic traffic.",
    status: "rejected"
  }
];
