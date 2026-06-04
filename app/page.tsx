import { ArrowRight, Bot, ClipboardCheck, Gauge, LibraryBig, MessageSquareWarning, Radar, TrendingUp, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mechanisms = [
  { title: "自然语言 AI 数据助手", body: "将业务问题转化为有口径约束的分析流程。", icon: Bot },
  { title: "Agent Skill / 智能体技能", body: "把日报、异常归因、渠道 ROI 等高频工作流沉淀为可评估的技能。", icon: Workflow },
  { title: "指标口径库", body: "集中管理指标定义、负责人、公式、别名、数据源和审核状态。", icon: LibraryBig },
  { title: "诚实拒答", body: "当关键指标缺失或口径不明确时，拒绝编造分析结论。", icon: MessageSquareWarning },
  { title: "分析师审核", body: "将高风险结论交给分析师复核，降低 AI 分析误导决策的风险。", icon: ClipboardCheck },
  { title: "产品运营反馈闭环", body: "从误拒、失败问题、满意度和人工介入中持续迭代产品。", icon: Radar }
];

const demoFlow = [
  { title: "诚实拒答 Demo", href: "/assistant", click: "输入：为什么本月利润下降？", proves: "AI 数据助手会拒绝回答未定义的利润分析。", matters: "证明产品优先保证可信度，而不是生成看似合理的幻觉结论。", icon: MessageSquareWarning },
  { title: "指标治理闭环", href: "/metric-registry", click: "在审核中心批准 profit，再查看指标口径库。", proves: "缺失指标可以进入口径申请和分析师审核流程。", matters: "把用户需求转化为数据团队可治理的产品资产。", icon: LibraryBig },
  { title: "每日数据分诊", href: "/daily-triage", click: "在异常卡片上点击继续拆解。", proves: "异常发现可以继续下钻、形成假设和行动建议。", matters: "把 BI 从静态看板升级为可执行工作流。", icon: Gauge },
  { title: "产品运营反馈闭环", href: "/ops", click: "查看误拒日志和语义映射更新。", proves: "用户纠正会进入产品迭代。", matters: "展示 AI 数据产品上线后的运营方法。", icon: Radar },
  { title: "分析师审核安全网", href: "/review", click: "查看 GMV 大促日纠错案例。", proves: "人工审核能发现 SQL 范围和异常日期风险。", matters: "降低 AI 分析直接驱动业务决策的风险。", icon: ClipboardCheck },
  { title: "业务影响模拟", href: "/impact", click: "查看 mock before/after 成功指标。", proves: "产品定义了成功指标，并把机制连接到业务影响。", matters: "让面试官看到 AI 产品经理如何评估上线效果。", icon: TrendingUp },
  { title: "项目案例", href: "/case-study", click: "阅读 JD Fit 和产品机制说明。", proves: "项目与 AI 数据产品岗位能力要求对应。", matters: "帮助面试讲述完整产品思考。", icon: Bot }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid min-h-[520px] items-center gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">AI 数据产品作品集</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950">DataPilot AI</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-600">一个知道何时不该回答的负责任 AI 数据助手。</p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
            面向 AI 数据助手 PM、Agent Skill PM、数据产品经理和产品运营岗位设计，重点展示指标治理、智能体技能设计、分析师审核、上线后运营反馈和效果评估框架。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/assistant">体验 AI 数据助手 <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
            <ButtonLink href="/case-study" variant="secondary">查看项目案例</ButtonLink>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">诚实拒答分析路径</span>
            <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-xs text-blue-100">由指标治理阻断</span>
          </div>
          <div className="space-y-3">
            {["识别意图：利润下降归因", "检索指标口径库：profit 缺失", "拒绝直接回答", "建议替代信号：GMV、revenue、orders、refund、marketing_cost", "CTA：提交指标口径申请"].map((step) => (
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
      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">推荐演示路径</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">适合招聘官或面试官快速理解的七个入口</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {demoFlow.map((item) => (
            <a key={item.title} href={item.href}>
              <Card className="h-full transition hover:border-blue-300 hover:shadow-soft">
                <item.icon className="h-5 w-5 text-blue-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600"><span className="font-medium text-slate-950">点击什么：</span>{item.click}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600"><span className="font-medium text-slate-950">证明什么：</span>{item.proves}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600"><span className="font-medium text-slate-950">为什么重要：</span>{item.matters}</p>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
