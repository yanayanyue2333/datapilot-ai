import { AlertTriangle, ArrowRight, CircleCheck, LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  analyticsEvents,
  boundarySections,
  dependencies,
  governanceRules,
  openQuestions,
  prdMetadata,
  productContext,
  productFlow,
  releasePlan,
  requirements,
  risks,
  successMetrics,
} from "@/data/product-delivery";

export function PublicPrd() {
  return (
    <section id="public-prd" className="scroll-mt-32 space-y-8">
      <SectionHeading eyebrow="A / Product requirement document" title="公开版 PRD" description="从问题定义到发布门槛的完整公开文档。内容用于作品集评审，不包含内部密钥、真实业务数据或模型思维链。" />

      <dl className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-5">
        {Object.entries({ 版本: prdMetadata.version, 状态: prdMetadata.status, Owner: prdMetadata.owner, 更新时间: prdMetadata.updatedAt, 目标阶段: prdMetadata.targetRelease }).map(([label, value]) => (
          <div key={label} className="min-w-0 bg-white px-4 py-4">
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <DocumentBlock title="背景与问题">
            <p>{productContext.background}</p><p>{productContext.problem}</p>
          </DocumentBlock>
          <DocumentBlock title="目标用户与痛点">
            <TextList items={productContext.users} /><div className="my-5 border-t border-slate-200" /><TextList items={productContext.pains} tone="warning" />
          </DocumentBlock>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          <DocumentBlock title="目标"><TextList items={productContext.goals} /></DocumentBlock>
          <DocumentBlock title="非目标"><TextList items={productContext.nonGoals} tone="muted" /></DocumentBlock>
        </div>
      </div>

      <DocumentBlock title="端到端用户流程" description="每个决策点都对应可审计的产品动作。">
        <ol className="grid gap-0 lg:grid-cols-6">
          {productFlow.map((step, index) => (
            <li key={step.id} className="relative border-l border-slate-200 py-4 pl-5 lg:border-l-0 lg:border-t lg:px-3 lg:pt-5">
              <span className="absolute -left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-semibold text-slate-600 lg:-top-3 lg:left-3">{index + 1}</span>
              <h4 className="text-sm font-semibold text-slate-950">{step.title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{step.description}</p>
              {step.decision ? <p className="mt-2 text-xs font-medium text-amber-700">{step.decision}</p> : null}
            </li>
          ))}
        </ol>
      </DocumentBlock>

      <DocumentBlock title="P0 / P1 功能需求" description="唯一需求 ID 同时用于验收清单与评测回归的追踪。">
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs text-slate-500"><tr><th className="px-3 py-3">需求 ID</th><th className="px-3 py-3">优先级</th><th className="px-3 py-3">模块</th><th className="px-3 py-3">需求</th><th className="px-3 py-3">验收口径</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {requirements.map((item) => <tr key={item.id} className="align-top"><td className="whitespace-nowrap px-3 py-4 font-mono text-xs font-semibold text-blue-700">{item.id}</td><td className="px-3 py-4"><Priority value={item.priority} /></td><td className="px-3 py-4 text-slate-600">{item.module}</td><td className="px-3 py-4"><p className="font-medium text-slate-900">{item.title}</p><p className="mt-1 leading-5 text-slate-600">{item.description}</p></td><td className="px-3 py-4 leading-5 text-slate-600">{item.acceptance}</td></tr>)}
            </tbody>
          </table>
        </div>
      </DocumentBlock>

      <DocumentBlock title="产品治理规则" description="这些规则是发布阻断项，不是建议项。">
        <div className="divide-y divide-slate-200">
          {governanceRules.map((item) => <div key={item.id} className="grid gap-2 py-4 md:grid-cols-[180px_1fr_1fr]"><p className="font-semibold text-slate-950">{item.title}</p><p className="text-sm leading-6 text-slate-700">{item.rule}</p><p className="text-sm leading-6 text-slate-500">{item.rationale}</p></div>)}
        </div>
      </DocumentBlock>

      <div className="grid gap-6 lg:grid-cols-2">
        <Boundary title="权限" items={boundarySections.permissions} />
        <Boundary title="安全" items={boundarySections.security} />
        <Boundary title="异常处理" items={boundarySections.exceptions} />
        <Boundary title="数据边界" items={boundarySections.data} />
      </div>

      <DocumentBlock title="埋点方案">
        <div className="overflow-x-auto"><table className="min-w-[760px] w-full text-left text-sm"><thead className="border-y border-slate-200 bg-slate-50 text-xs text-slate-500"><tr><th className="px-3 py-3">事件</th><th className="px-3 py-3">触发</th><th className="px-3 py-3">关键属性</th><th className="px-3 py-3">目的</th></tr></thead><tbody className="divide-y divide-slate-100">{analyticsEvents.map((item) => <tr key={item.event}><td className="px-3 py-4 font-mono text-xs text-blue-700">{item.event}</td><td className="px-3 py-4 text-slate-700">{item.trigger}</td><td className="px-3 py-4 text-slate-500">{item.properties.join(" · ")}</td><td className="px-3 py-4 text-slate-600">{item.purpose}</td></tr>)}</tbody></table></div>
      </DocumentBlock>

      <DocumentBlock title="成功指标">
        <div className="grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200 md:grid-cols-2 xl:grid-cols-5">{successMetrics.map((item) => <div key={item.name} className="bg-white p-4"><h4 className="text-sm font-semibold text-slate-950">{item.name}</h4><p className="mt-2 text-xs leading-5 text-slate-600">{item.definition}</p><p className="mt-3 text-sm font-semibold text-emerald-700">{item.target}</p><p className="mt-2 text-xs leading-5 text-amber-700">护栏：{item.guardrail}</p></div>)}</div>
      </DocumentBlock>

      <div className="grid gap-6 xl:grid-cols-2">
        <DocumentBlock title="发布计划"><NumberedList items={releasePlan} /></DocumentBlock>
        <DocumentBlock title="依赖"><TextList items={dependencies} /></DocumentBlock>
        <DocumentBlock title="风险"><TextList items={risks} tone="warning" /></DocumentBlock>
        <DocumentBlock title="开放问题"><TextList items={openQuestions} tone="muted" /></DocumentBlock>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="border-b border-slate-200 pb-5"><p className="text-xs font-semibold uppercase text-blue-600">{eyebrow}</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p></div>;
}

function DocumentBlock({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <div><div className="mb-4"><h3 className="text-lg font-semibold text-slate-950">{title}</h3>{description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}</div><div className="space-y-3 text-sm leading-7 text-slate-700">{children}</div></div>;
}

function TextList({ items, tone = "default" }: { items: string[]; tone?: "default" | "warning" | "muted" }) {
  const Icon = tone === "warning" ? AlertTriangle : tone === "muted" ? ArrowRight : CircleCheck;
  return <ul className="space-y-2">{items.map((item) => <li key={item} className="flex gap-3"><Icon className={`mt-1 h-4 w-4 shrink-0 ${tone === "warning" ? "text-amber-600" : tone === "muted" ? "text-slate-400" : "text-emerald-600"}`} /><span>{item}</span></li>)}</ul>;
}

function NumberedList({ items }: { items: string[] }) { return <ol className="space-y-3">{items.map((item, index) => <li key={item} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{index + 1}</span><span>{item}</span></li>)}</ol>; }
function Priority({ value }: { value: "P0" | "P1" }) { return <span className={`rounded px-2 py-1 text-xs font-semibold ${value === "P0" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"}`}>{value}</span>; }
function Boundary({ title, items }: { title: string; items: string[] }) { return <Card className="shadow-none"><div className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-blue-600" /><h3 className="font-semibold text-slate-950">{title}</h3></div><div className="mt-4"><TextList items={items} tone="muted" /></div></Card>; }
