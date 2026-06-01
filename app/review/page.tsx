import { analysisReviews } from "@/data/mock-reviews";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { MetricReviewQueue } from "@/components/review/MetricReviewQueue";
import { AnalysisReviewSection } from "@/components/review/AnalysisReviewSection";

export default function ReviewPage() {
  const review = analysisReviews[0];
  return (
    <>
      <PageHeader title="Analyst Review" description="A human-in-the-loop validation queue for metric definition approvals and correction of risky AI analysis." />
      <MetricReviewQueue />
      <AnalysisReviewSection />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><h2 className="font-semibold">Initial AI Analysis</h2><p className="mt-2 text-sm text-slate-600">{review.initialAnalysis}</p></Card>
        <Card><h2 className="font-semibold">Analyst Finding</h2><p className="mt-2 text-sm text-slate-600">{review.analystFinding}</p></Card>
        <Card><h2 className="font-semibold">Rejection Comment</h2><p className="mt-2 text-sm text-slate-600">{review.rejectionComment}</p></Card>
        <Card><h2 className="font-semibold">Revised Insight</h2><p className="mt-2 text-sm text-slate-600">{review.revisedInsight}</p></Card>
      </div>
    </>
  );
}
