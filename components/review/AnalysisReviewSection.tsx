import { AnalysisReviewCard } from "@/components/review/AnalysisReviewCard";
import { RejectedAnalysisStory } from "@/components/review/RejectedAnalysisStory";
import { ReviewChecklist } from "@/components/review/ReviewChecklist";
import { RevisedInsightCard } from "@/components/review/RevisedInsightCard";

export function AnalysisReviewSection() {
  return (
    <section className="mt-8 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Human-in-the-loop safety</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Analysis Review Queue</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">This review story proves AI analysis is not blindly trusted. Analyst review catches SQL scope mistakes, abnormal dates, metric ambiguity, and business caveats before decisions are made.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <AnalysisReviewCard />
        <ReviewChecklist />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <RejectedAnalysisStory />
        <RevisedInsightCard />
      </div>
    </section>
  );
}
