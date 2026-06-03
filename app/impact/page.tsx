import { AlertTriangle, ArrowDownRight, ArrowUpRight, Clock, Gauge, LineChart, ShieldCheck, Target } from "lucide-react";
import { ImpactChart } from "@/components/impact/ImpactChart";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const impactMetrics = [
  { label: "Average analysis time", before: "120 min", after: "18 min", change: "-85%", direction: "down" },
  { label: "GMV anomaly diagnosis time", before: "1 day", after: "15 min", change: "-97%", direction: "down" },
  { label: "Channel ROI", before: "1.8", after: "2.4", change: "+33%", direction: "up" },
  { label: "CAC", before: "¥120", after: "¥84", change: "-30%", direction: "down" },
  { label: "Metric definition cycle", before: "3 days", after: "0.5 days", change: "-83%", direction: "down" },
  { label: "AI answer adoption rate", before: "0%", after: "68%", change: "+68pp", direction: "up" }
];

const explanations = [
  { metric: "GMV anomaly diagnosis time", mechanism: "Daily Triage detects anomalies and guides drilldown by channel, segment, and funnel." },
  { metric: "Channel ROI", mechanism: "Channel ROI Analysis Skill identifies inefficient channels and recommends budget adjustment." },
  { metric: "CAC", mechanism: "Acquisition cost breakdown helps reduce low-quality paid traffic and improve budget allocation." },
  { metric: "Metric definition cycle", mechanism: "Metric Registry and Analyst Review shorten back-and-forth communication between business and data teams." },
  { metric: "Answer adoption rate", mechanism: "Honest refusal, caveats, and product-level analysis trace improve trust." }
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        title="Impact Simulation｜上线后效果模拟"
        description="A clearly labeled mock simulation of how DataPilot AI could define success metrics and evaluate business impact after launch."
      />
      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">North Star Metric</p>
              <h2 className="mt-2 text-2xl font-semibold text-blue-950">Time to actionable business insight</h2>
              <p className="mt-1 text-base font-medium text-blue-900">从业务问题到可执行洞察的时间</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-900">
                DataPilot AI is designed to reduce the time from asking a data question to getting a trustworthy, actionable answer.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {impactMetrics.map((metric) => (
            <Card key={metric.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Mock simulation data</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">{metric.label}</h3>
                </div>
                <div className={metric.direction === "up" ? "rounded-full bg-emerald-100 p-2 text-emerald-700" : "rounded-full bg-blue-100 p-2 text-blue-700"}>
                  {metric.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Value label="Before" value={metric.before} />
                <Value label="After" value={metric.after} />
                <Value label="Change" value={metric.change} highlight />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {explanations.map((item) => (
            <Card key={item.metric}>
              <div className="flex items-start gap-3">
                <Gauge className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="text-base font-semibold text-slate-950">{item.metric}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.mechanism}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <ImpactChart
            title="Analysis time"
            description="Before vs after for average analysis time. Lower is better."
            unit=" min"
            data={[{ metric: "Analysis time", Before: 120, After: 18 }]}
          />
          <ImpactChart
            title="Channel ROI"
            description="Before vs after for channel ROI. Higher is better."
            unit=""
            data={[{ metric: "ROI", Before: 1.8, After: 2.4 }]}
          />
          <ImpactChart
            title="CAC"
            description="Before vs after for customer acquisition cost. Lower is better."
            unit=" CNY"
            data={[{ metric: "CAC", Before: 120, After: 84 }]}
          />
        </div>

        <Card className="border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-amber-700" />
            <div>
              <h2 className="text-base font-semibold text-amber-950">Mock data disclaimer</h2>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                本页面为作品集项目中的模拟上线效果，用于说明 DataPilot AI 的产品成功指标和业务影响评估框架。所有数据均为 mock 数据，不代表真实商业结果。
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="grid gap-4 md:grid-cols-3">
            <Summary icon={<Clock className="h-5 w-5" />} title="Decision efficiency" body="Shortens the path from question to governed answer." />
            <Summary icon={<LineChart className="h-5 w-5" />} title="Growth operations" body="Connects ROI and CAC movement to channel decisions." />
            <Summary icon={<ShieldCheck className="h-5 w-5" />} title="Trust and adoption" body="Uses refusal, caveats, and review to improve answer trust." />
          </div>
        </Card>
      </div>
    </>
  );
}

function Value({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={highlight ? "mt-1 text-lg font-semibold text-blue-700" : "mt-1 text-lg font-semibold text-slate-950"}>{value}</p>
    </div>
  );
}

function Summary({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="mt-3 text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
