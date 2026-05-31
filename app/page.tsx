import { ArrowRight, Bot, ClipboardCheck, LibraryBig, MessageSquareWarning, Radar, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mechanisms = [
  { title: "Natural Language Data Assistant", body: "Turns business questions into governed analysis workflows.", icon: Bot },
  { title: "Agent Skill Gallery", body: "Packages repeatable PM and analyst workflows as measurable skills.", icon: Workflow },
  { title: "Metric Registry", body: "Keeps definitions, owners, formulas, and review status visible.", icon: LibraryBig },
  { title: "Honest Refusal", body: "Blocks answers when required metrics are missing or ambiguous.", icon: MessageSquareWarning },
  { title: "Analyst Review", body: "Routes risky findings to human validation before decision use.", icon: ClipboardCheck },
  { title: "Product Ops Feedback Loop", body: "Learns from false rejections, failures, and satisfaction signals.", icon: Radar }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid min-h-[520px] items-center gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Portfolio AI Data Product</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950">DataPilot AI</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-600">A responsible AI data assistant that knows when not to answer.</p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
            Built for AI Data Assistant PM, Agent Skill PM, Data Product PM, and product operations internship cases. The product demonstrates metric governance, skill design, analyst review, and post-launch learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/assistant">Try Assistant <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
            <ButtonLink href="/case-study" variant="secondary">View Case Study</ButtonLink>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">Honest refusal trace</span>
            <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-xs text-blue-100">Blocked by governance</span>
          </div>
          <div className="space-y-3">
            {["Intent: profit decline analysis", "Metric Registry lookup: profit missing", "Answer withheld", "Suggested proxies: GMV, revenue, orders, refunds, marketing cost", "CTA: submit metric definition request"].map((step) => (
              <div key={step} className="rounded-md border border-white/10 bg-white/5 p-3 text-sm text-slate-200">{step}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mechanisms.map((item) => (
          <Card key={item.title}>
            <item.icon className="h-5 w-5 text-blue-600" />
            <h2 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
