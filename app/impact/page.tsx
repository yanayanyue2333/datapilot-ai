import { AlertTriangle, ArrowDownRight, ArrowUpRight, Clock, Gauge, LineChart, ShieldCheck, Target } from "lucide-react";
import type { ReactNode } from "react";
import { ImpactChart } from "@/components/impact/ImpactChart";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const impactMetrics = [
  { label: "平均分析耗时", before: "120 分钟", after: "18 分钟", change: "-85%", direction: "down" },
  { label: "GMV 异常定位耗时", before: "1 天", after: "15 分钟", change: "-97%", direction: "down" },
  { label: "渠道 ROI", before: "1.8", after: "2.4", change: "+33%", direction: "up" },
  { label: "CAC 获客成本", before: "¥120", after: "¥84", change: "-30%", direction: "down" },
  { label: "指标口径确认周期", before: "3 天", after: "0.5 天", change: "-83%", direction: "down" },
  { label: "AI 答案采纳率", before: "0%", after: "68%", change: "+68pp", direction: "up" }
];

const explanations = [
  { metric: "GMV 异常定位耗时", mechanism: "Daily Triage / 每日数据分诊会先发现异常，再按渠道、用户分群和转化漏斗引导下钻。" },
  { metric: "渠道 ROI", mechanism: "Channel ROI Analysis Skill 会识别低效渠道，并给出预算调整建议。" },
  { metric: "CAC 获客成本", mechanism: "获客成本拆解帮助减少低质量付费流量，并优化预算分配。" },
  { metric: "指标口径确认周期", mechanism: "Metric Registry / 指标口径库和 Analyst Review / 分析师审核减少业务团队与数据团队的来回沟通。" },
  { metric: "AI 答案采纳率", mechanism: "诚实拒答、口径 caveat 和产品级 Analysis Trace / 分析路径提升用户信任。" }
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        title="Impact Simulation｜上线后效果模拟"
        description="使用明确标注的 mock 数据，展示 DataPilot AI 如何定义产品成功指标并评估潜在业务影响。"
      />
      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">North Star Metric / 北极星指标</p>
              <h2 className="mt-2 text-2xl font-semibold text-blue-950">Time to actionable business insight</h2>
              <p className="mt-1 text-base font-medium text-blue-900">从业务问题到可执行洞察的时间</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-900">
                DataPilot AI 的设计目标，是缩短从提出数据问题到获得可信、可执行答案的时间。
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {impactMetrics.map((metric) => (
            <Card key={metric.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Mock 模拟数据</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">{metric.label}</h3>
                </div>
                <div className={metric.direction === "up" ? "rounded-full bg-emerald-100 p-2 text-emerald-700" : "rounded-full bg-blue-100 p-2 text-blue-700"}>
                  {metric.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Value label="上线前" value={metric.before} />
                <Value label="上线后" value={metric.after} />
                <Value label="变化" value={metric.change} highlight />
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
            title="分析耗时"
            description="平均分析耗时的上线前后对比，数值越低越好。"
            unit=" 分钟"
            data={[{ metric: "分析耗时", Before: 120, After: 18 }]}
          />
          <ImpactChart
            title="渠道 ROI"
            description="渠道 ROI 的上线前后对比，数值越高越好。"
            unit=""
            data={[{ metric: "ROI", Before: 1.8, After: 2.4 }]}
          />
          <ImpactChart
            title="CAC 获客成本"
            description="获客成本的上线前后对比，数值越低越好。"
            unit=" 元"
            data={[{ metric: "CAC", Before: 120, After: 84 }]}
          />
        </div>

        <Card className="border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-amber-700" />
            <div>
              <h2 className="text-base font-semibold text-amber-950">Mock 数据说明</h2>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                本页面为作品集项目中的模拟上线效果，所有数据均为 mock 数据，不代表真实商业结果。
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="grid gap-4 md:grid-cols-3">
            <Summary icon={<Clock className="h-5 w-5" />} title="决策效率" body="缩短从业务问题到受治理答案的路径。" />
            <Summary icon={<LineChart className="h-5 w-5" />} title="增长运营" body="将 ROI 和 CAC 变化连接到渠道预算决策。" />
            <Summary icon={<ShieldCheck className="h-5 w-5" />} title="信任与采纳" body="通过拒答、caveat 和审核机制提升答案可信度。" />
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

function Summary({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="mt-3 text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
