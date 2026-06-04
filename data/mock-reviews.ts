import type { AnalysisReview } from "@/types";

export const analysisReviews: AnalysisReview[] = [
  {
    id: "review-618",
    initialAnalysis: "GMV 环比增长 18%，主要由付费用户订单增长驱动。",
    analystFinding: "SQL 包含 6.18 大促日，导致结果被异常放大。",
    rejectionComment: "请排除 6.18 大促日，并重新计算自然日 GMV 环比变化。",
    revisedInsight: "排除 6.18 后，自然日 GMV 环比下降 7.4%，主要原因是自然流量转化率下降。",
    status: "rejected",
  },
];
