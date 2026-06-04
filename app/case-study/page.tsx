import { PageHeader } from "@/components/shared/PageHeader";
import { PreviewGrid } from "@/components/shared/PreviewGrid";
import { Card } from "@/components/ui/card";

export default function CaseStudyPage() {
  return (
    <>
      <PageHeader title="项目案例" description="用作品集方式说明 DataPilot AI 如何通过指标治理、人工审核、产品运营和效果评估，解决 AI 数据助手的可信度问题。" />
      <div className="space-y-6">
        <PreviewGrid items={[
          { title: "核心时刻", body: "当 profit / 利润 尚未定义时，AI 数据助手会拒绝解释利润下降原因。" },
          { title: "指标治理闭环", body: "用户提交口径申请后，必须进入分析师审核，审批后才能被助手使用。" },
          { title: "审核纠错", body: "分析师发现 6.18 大促日导致 GMV 异常放大，并修正业务结论。" },
          { title: "运营学习", body: "误拒日志会沉淀为语义映射更新和 Agent Skill 迭代 backlog。" }
        ]} />
        <Card className="border-blue-200 bg-blue-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">产品机制亮点</p>
          <h2 className="mt-2 text-2xl font-semibold text-blue-950">从 AI 回答到可运营的数据产品</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <Mechanism title="Daily Triage / 每日数据分诊" body="将静态看板升级为：异常 -> 下钻 -> 假设 -> 建议 -> 复盘任务。" />
            <Mechanism title="False Rejection Log / 误拒日志" body="用户纠正会更新语义映射，让 Agent Skill 更理解真实业务语言。" />
            <Mechanism title="Analyst Review / 分析师审核" body="在 AI 结论进入业务决策前，识别 SQL 范围、异常日期、口径歧义和样本偏差。" />
          </div>
        </Card>
        <div className="grid gap-4 lg:grid-cols-2">
          <CaseSection title="1. 这个项目解决什么问题？" body="产品经理会用自然语言提出数据问题，但通用 AI 可能在没有口径、日期范围、SQL 范围和人工审核的情况下直接回答。" />
          <CaseSection title="2. 目标用户是谁？" body="AI 数据助手 PM、Agent Skill PM、数据产品经理、产品运营、增长 PM、生命周期 PM 和数据分析师。" />
          <CaseSection title="3. 为什么它不是普通聊天机器人？" body="它把问题转化为受治理的工作流：口径检索、诚实拒答、口径申请、分析师审核、每日分诊、运营迭代和上线效果模拟。" />
          <CaseSection title="4. 核心用户旅程是什么？" body="提出问题，发现缺失口径，提交口径申请，审批指标，再次提问，并得到基于已审批口径的答案。" />
          <CaseSection title="5. 关键产品机制有哪些？" body="诚实拒答、指标口径库、Agent Skill、每日数据分诊、误拒日志、分析师审核、上线效果模拟和 AI 产品雷达。" />
          <CaseSection title="6. Agent Skill 设计体现在哪里？" body="每个技能都包含目标用户、使用场景、输入参数、输出结构、使用次数、满意度、失败率和迭代记录。" />
          <CaseSection title="7. 指标口径库如何降低幻觉风险？" body="未定义指标不能被回答。profit 默认缺失，只有经过分析师审批后才能用于回答利润问题。" />
          <CaseSection title="8. 误拒日志如何驱动迭代？" body="用户对“单量走得疲”“投放是不是亏了”等表达的纠正，会转化为语义映射和技能路由优化。" />
          <CaseSection title="9. 分析师审核如何降低风险？" body="GMV 案例展示了人工审核如何发现 6.18 大促日带来的 SQL 范围问题，避免错误结论进入决策。" />
          <CaseSection title="10. 上线后如何衡量？" body="DAU、问题量、技能使用、满意度、失败率、低置信度比例、人工介入率、误拒率、审核时长，以及从业务问题到可执行洞察的时间。" />
          <CaseSection title="11. 下一步会建设什么？" body="真实数据连接器、分析师权限、评估集、技能运行历史、告警集成和 PRD / 复盘文档导出。" />
        </div>
        <Card className="border-indigo-200 bg-indigo-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Impact Simulation / 上线效果模拟</p>
          <h2 className="mt-2 text-2xl font-semibold text-indigo-950">如何评估上线后的产品影响</h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <Fit text="指标选择围绕决策效率、GMV 异常定位、渠道 ROI、CAC、指标口径确认周期和 AI 答案采纳率。" />
            <Fit text="每个指标都映射到产品机制：Daily Triage、Agent Skill、Metric Registry、Analyst Review 和诚实拒答分析路径。" />
            <Fit text="所有数字均为 mock 模拟数据，用于作品集叙事，不代表真实商业结果。" />
            <Fit text="真实上线后，可通过埋点事件、技能运行日志、审核时间戳和业务 KPI 监控来衡量。" />
          </div>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">JD Fit / 岗位匹配</p>
          <h2 className="mt-2 text-2xl font-semibold text-emerald-950">项目如何映射岗位能力</h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <Fit text="AI 数据助手的产品设计、迭代优化、产品运营：诚实拒答、指标审批闭环、产品运营看板。" />
            <Fit text="Agent Skill 的需求挖掘、设计与落地：技能库、技能指标、失败率和满意度字段。" />
            <Fit text="深入一线用户做需求调研，输出结构化洞察：误拒日志将用户业务语言转化为语义映射更新。" />
            <Fit text="跟踪海内外 AI 产品动态，提炼创新点：AI 产品雷达将 GPT、Claude、Gemini、Perplexity、Cursor 的机制转化为机会点。" />
            <Fit text="与研发、设计、数据团队协作，推动上线后数据复盘：指标口径库、分析师审核、每日数据分诊和运营反馈闭环。" />
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
