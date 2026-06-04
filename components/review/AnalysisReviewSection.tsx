import { AnalysisReviewCard } from "@/components/review/AnalysisReviewCard";
import { RejectedAnalysisStory } from "@/components/review/RejectedAnalysisStory";
import { ReviewChecklist } from "@/components/review/ReviewChecklist";
import { RevisedInsightCard } from "@/components/review/RevisedInsightCard";

export function AnalysisReviewSection() {
  return (
    <section className="mt-8 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Analyst Review / 分析师审核</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">分析审核队列</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          这个审核案例展示 DataPilot AI 不会盲目信任 AI 结论。分析师会在业务决策前检查 SQL 范围、异常日期、指标歧义和业务 caveat。
        </p>
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
