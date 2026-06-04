import { Activity, AlertTriangle, Gauge, MessageSquare, MousePointerClick, ShieldCheck, Sparkles, ThumbsUp } from "lucide-react";
import { usageLogs } from "@/data/mock-ops";
import { Card } from "@/components/ui/card";
import { FalseRejectionLogCard, type FalseRejectionCase } from "@/components/ops/FalseRejectionLogCard";

const latest = usageLogs.at(-1)!;

const falseRejectionCases: FalseRejectionCase[] = [
  {
    id: "orders-fatigue",
    originalQuestion: "单量走得有点疲，是哪里掉了吗？",
    originalJudgment: "无法识别“单量走得疲”的业务意图。",
    userFeedback: "用户实际想分析订单量下降。",
    mappingFrom: "单量走得疲",
    mappingTo: "orders 下降趋势分析",
    status: "已更新",
    impactedSkill: "GMV Anomaly Attribution Skill",
  },
  {
    id: "spend-loss",
    originalQuestion: "最近投放是不是亏了？",
    originalJudgment: "缺少“亏损”相关指标口径。",
    userFeedback: "用户实际想查看渠道 ROI。",
    mappingFrom: "投放亏了",
    mappingTo: "channel ROI analysis",
    status: "已更新",
    impactedSkill: "Channel ROI Analysis Skill",
  },
  {
    id: "returning-users",
    originalQuestion: "老用户是不是不太回来了？",
    originalJudgment: "无法识别问题意图。",
    userFeedback: "用户想查看老用户留存变化。",
    mappingFrom: "不太回来",
    mappingTo: "retention decline analysis",
    status: "待审核",
    impactedSkill: "User Churn Analysis Skill",
  },
  {
    id: "campaign-quality",
    originalQuestion: "这波活动是不是虚火？",
    originalJudgment: "无法判断“虚火”的业务含义。",
    userFeedback: "用户想分析活动带来的低质量 GMV。",
    mappingFrom: "活动虚火",
    mappingTo: "campaign quality analysis",
    status: "待审核",
    impactedSkill: "Feature Launch Review Skill",
  },
];

const stats = [
  { label: "日活用户", value: latest.dau, icon: Activity },
  { label: "问题总数", value: latest.questions, icon: MessageSquare },
  { label: "Agent Skill 使用次数", value: latest.skillRuns, icon: Sparkles },
  { label: "答案满意度", value: `${latest.answerSatisfaction}/5`, icon: ThumbsUp },
  { label: "失败率", value: `${Math.round(latest.failureRate * 100)}%`, icon: AlertTriangle },
  { label: "低置信度占比", value: `${Math.round(latest.lowConfidenceAnswerRatio * 100)}%`, icon: Gauge },
  { label: "人工介入率", value: `${Math.round(latest.humanInterventionRate * 100)}%`, icon: ShieldCheck },
  { label: "已更新语义映射", value: "2", icon: MousePointerClick },
];

const failedQuestionTypes = ["未定义财务指标", "口语化业务表达含义不明确", "活动质量意图缺失", "留存 cohort 不清晰"];
const iterationNotes = [
  "在回答财务类问题前，先补齐利润口径审批闭环。",
  "将“单量走得疲”等口语表达映射到订单下降分析。",
  "把活动质量相关表达加入分析师审核队列。",
];

export function ProductOpsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <stat.icon className="h-4 w-4 text-blue-600" />
            <p className="mt-3 text-xs text-slate-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold text-slate-950">高频失败问题类型</h2>
          <div className="mt-4 space-y-3">
            {failedQuestionTypes.map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-slate-950">最近迭代记录</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {iterationNotes.map((note) => <p key={note}>{note}</p>)}
          </div>
        </Card>
      </div>
      <section>
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <h2 className="text-xl font-semibold text-blue-950">本周被用户纠正的误拒</h2>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            用户不仅在使用 AI，也在帮助产品理解真实业务语言。每一次纠正都会进入语义映射、Agent Skill 和评估集的迭代闭环。
          </p>
        </Card>
        <div className="grid gap-4 xl:grid-cols-2">
          {falseRejectionCases.map((item) => (
            <FalseRejectionLogCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
