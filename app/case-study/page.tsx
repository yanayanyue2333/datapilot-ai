import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";
import { Card } from "@/components/ui/card";

export default function CaseStudyPage() {
  return (
    <>
      <PageHeader title="Case Study" description="A portfolio narrative showing how DataPilot AI solves a realistic AI data assistant problem with metric governance and human validation." />
      <div className="space-y-6">
        <PreviewGrid items={[
          { title: "Soul moment", body: "The assistant refuses to explain profit decline because profit is not yet defined." },
          { title: "Governance loop", body: "A metric definition request enters analyst review before the assistant can use it." },
          { title: "Review correction", body: "An analyst catches promotion-day inflation and revises the business conclusion." },
          { title: "Ops learning", body: "False rejections become intent mapping improvements and skill iteration backlog." }
        ]} />
        <Card className="border-blue-200 bg-blue-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Product Mechanism Highlights</p>
          <h2 className="mt-2 text-2xl font-semibold text-blue-950">From AI answer to operated data product</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <Mechanism title="Daily Triage" body="Turns a static dashboard into anomaly -> drilldown -> hypothesis -> recommendation -> follow-up task." />
            <Mechanism title="False Rejection Learning" body="User corrections update semantic mappings so Agent Skills better understand real business language." />
            <Mechanism title="Analyst Review Safety" body="Catches SQL scope mistakes, abnormal dates, metric ambiguity, and sample bias before AI output drives decisions." />
          </div>
        </Card>
        <div className="grid gap-4 lg:grid-cols-2">
          <CaseSection title="1. What problem is this solving?" body="PMs ask business data questions in natural language, but generic AI can answer without checking metric definitions, abnormal dates, SQL scope, or analyst review requirements." />
          <CaseSection title="2. Who are the target users?" body="AI data assistant PMs, Agent Skill PMs, data product managers, product operations teams, growth PMs, lifecycle PMs, and data analysts." />
          <CaseSection title="3. Why is this not just a chatbot?" body="The product turns questions into governed workflows: metric registry lookup, honest refusal, definition request, analyst review, triage, and product ops iteration." />
          <CaseSection title="4. What is the core user journey?" body="Ask a question, detect missing metric governance, submit a definition request, approve the metric, then ask again and receive an answer grounded in the approved definition." />
          <CaseSection title="5. What are the key product mechanisms?" body="Honest refusal, Metric Registry, Agent Skill Gallery, Daily Triage, False Rejection Log, Analyst Review, AI Radar, and case-study documentation." />
          <CaseSection title="6. How does Agent Skill design appear?" body="Skills are packaged workflows with target user, use case, inputs, output structure, usage count, satisfaction, failure rate, and iteration notes." />
          <CaseSection title="7. How does Metric Registry reduce hallucination risk?" body="The assistant cannot answer undefined metrics. Profit is absent by default, then becomes answerable only after analyst approval." />
          <CaseSection title="8. How does False Rejection Log drive iteration?" body="User corrections such as informal order or ROI phrasing become semantic mapping updates and skill-routing improvements." />
          <CaseSection title="9. How does Analyst Review reduce risky analysis?" body="The GMV story shows human review catching a 6.18 promotion-day SQL scope issue before AI output becomes a decision." />
          <CaseSection title="10. How would this be measured after launch?" body="DAU, question volume, skill usage, satisfaction, failure rate, low-confidence ratio, human intervention, false rejection rate, and review turnaround." />
          <CaseSection title="11. What would be built next?" body="Real data connectors, analyst approval roles, evaluation datasets, skill run history, alert integrations, and PRD/export workflows." />
        </div>
        <Card className="border-emerald-200 bg-emerald-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">JD Fit</p>
          <h2 className="mt-2 text-2xl font-semibold text-emerald-950">How this project maps to the role</h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <Fit text="AI 数据助手的产品设计、迭代优化、产品运营：honest refusal, metric approval loop, ops dashboard." />
            <Fit text="Agent Skill 的需求挖掘、设计与落地：skill gallery, skill metrics, failure-rate and satisfaction fields." />
            <Fit text="深入一线用户做需求调研，输出结构化洞察：false rejection log converts user language into semantic updates." />
            <Fit text="跟踪海内外 AI 产品动态，提炼创新点：AI Radar translates GPT, Claude, Gemini, Perplexity, Cursor patterns into opportunities." />
            <Fit text="与研发、设计、数据团队协作，推动上线后数据复盘：Metric Registry, Analyst Review, Daily Triage, and Ops feedback loop." />
          </div>
        </Card>
      </div>
    </>
  );
}

function Mechanism({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </Card>
  );
}

function Fit({ text }: { text: string }) {
  return <div className="rounded-md bg-white p-4 text-sm leading-6 text-slate-700">{text}</div>;
}
