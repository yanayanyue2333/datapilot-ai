import { analysisReviews } from "@/data/mock-reviews";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { MetricReviewQueue } from "@/components/review/MetricReviewQueue";
import { AnalysisReviewSection } from "@/components/review/AnalysisReviewSection";

export default function ReviewPage() {
  const review = analysisReviews[0];
  return (
    <>
      <PageHeader title="审核中心" description="用于指标口径审批和高风险 AI 分析纠错的人机协同队列。" />
      <MetricReviewQueue />
      <AnalysisReviewSection />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><h2 className="font-semibold">原始 AI 分析</h2><p className="mt-2 text-sm text-slate-600">{review.initialAnalysis}</p></Card>
        <Card><h2 className="font-semibold">分析师发现</h2><p className="mt-2 text-sm text-slate-600">{review.analystFinding}</p></Card>
        <Card><h2 className="font-semibold">拒绝原因</h2><p className="mt-2 text-sm text-slate-600">{review.rejectionComment}</p></Card>
        <Card><h2 className="font-semibold">修正后洞察</h2><p className="mt-2 text-sm text-slate-600">{review.revisedInsight}</p></Card>
      </div>
    </>
  );
}
