import { AlertTriangle, ArrowRight, CheckCircle2, CircleDollarSign, Clock3, UserRoundCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { evaluationCases, evaluationCostAssumptions, evaluationMeta } from "@/data/product-delivery";
import { calculateEvaluationCaseCost, countEvaluationScenarios, summarizeEvaluation } from "@/lib/product-delivery/evaluation";
import { SectionHeading } from "./PublicPrd";

export function EvaluationReport() {
  const summary = summarizeEvaluation(evaluationCases, evaluationCostAssumptions);
  const scenarios = countEvaluationScenarios(evaluationCases);
  const failures = evaluationCases.filter((item) => item.failureType !== "none");
  return (
    <section id="evaluation" className="scroll-mt-32 space-y-6">
      <SectionHeading eyebrow="C / Agent evaluation" title="Agent 评测报告" description="所有结果均为模拟离线评测，由 case-level 原始数据与纯函数实时计算，不代表真实生产表现。" />
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-slate-200 py-4 text-xs text-slate-600"><span><b className="text-slate-900">样本量</b> {summary.sampleSize}</span><span><b className="text-slate-900">评测版本</b> {evaluationMeta.version}</span><span><b className="text-slate-900">数据集时间</b> {evaluationMeta.datasetWindow}</span><span className="font-semibold text-amber-700">{evaluationMeta.label}</span></div>

      <div className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={CheckCircle2} label="任务成功率" value={`${(summary.taskSuccessRate * 100).toFixed(1)}%`} helper={`${summary.successfulCases} 个完成且通过断言 / ${summary.sampleSize}`} />
        <Metric icon={UserRoundCheck} label="人工接管率" value={`${(summary.humanEscalationRate * 100).toFixed(1)}%`} helper={`${summary.humanEscalationCases} 个进入审核或人工处理 / ${summary.sampleSize}`} />
        <Metric icon={CircleDollarSign} label="平均成本" value={`$${summary.averageCostUsd.toFixed(4)}`} helper={`总估算成本 $${summary.totalCostUsd.toFixed(4)} / ${summary.sampleSize}`} />
        <Metric icon={Clock3} label="P95 时延" value={`${summary.p95LatencyMs.toLocaleString()} ms`} helper="按 case latency 使用 nearest-rank 计算" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="shadow-none"><h3 className="text-base font-semibold text-slate-950">场景分布</h3><div className="mt-5 space-y-4">{Object.entries(scenarios).map(([scenario, count]) => <div key={scenario}><div className="flex justify-between text-sm"><span className="text-slate-700">{scenario}</span><span className="font-semibold text-slate-950">{count}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded bg-slate-100"><div className="h-full bg-blue-600" style={{ width: `${(count / summary.sampleSize) * 100}%` }} /></div></div>)}</div></Card>
        <Card className="shadow-none"><h3 className="text-base font-semibold text-slate-950">指标口径</h3><p className="mt-4 text-sm leading-7 text-slate-600">{evaluationMeta.definition}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><Price label="Input token" value={`$${evaluationCostAssumptions.inputTokenUsdPerMillion} / 1M`} /><Price label="Output token" value={`$${evaluationCostAssumptions.outputTokenUsdPerMillion} / 1M`} /><Price label="工具调用" value={`$${evaluationCostAssumptions.toolCallUsd} / 次`} /><Price label="模拟查询扫描" value={`$${evaluationCostAssumptions.queryScanUsdPerTb} / TB`} /></div></Card>
      </div>

      <div><h3 className="text-lg font-semibold text-slate-950">Case-level 评测数据</h3><p className="mt-1 text-sm text-slate-500">成本按公开单价假设逐条计算；失败样本保留原始失败类型。</p></div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white"><table className="min-w-[1150px] w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr>{["Case", "场景", "完成", "断言", "人工", "时延", "Input / Output", "工具", "扫描", "估算成本", "失败类型"].map((item) => <th key={item} className="border-b border-slate-200 px-3 py-3">{item}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{evaluationCases.map((item) => { const cost = calculateEvaluationCaseCost(item, evaluationCostAssumptions); return <tr key={item.id}><td className="px-3 py-3 font-mono font-semibold text-slate-900">{item.id}</td><td className="px-3 py-3 text-slate-700">{item.scenario}</td><Bool value={item.taskCompleted} /><Bool value={item.assertionsPassed} /><Bool value={item.escalatedToHuman} neutral /><td className="px-3 py-3 text-slate-600">{item.latencyMs} ms</td><td className="px-3 py-3 text-slate-600">{item.inputTokens} / {item.outputTokens}</td><td className="px-3 py-3 text-slate-600">{item.toolCalls}</td><td className="px-3 py-3 text-slate-600">{item.queryScanGb} GB</td><td className="px-3 py-3 font-mono text-slate-700">${cost.totalUsd.toFixed(4)}</td><td className={`px-3 py-3 ${item.failureType === "none" ? "text-slate-400" : "font-medium text-rose-700"}`}>{item.failureType}</td></tr>; })}</tbody></table></div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ReportList title="失败类型与典型样本" items={failures.map((item) => `${item.id} / ${item.failureType}：${item.failureNote}`)} warning />
        <ReportList title="回归门槛" items={evaluationMeta.regressionGates} />
        <ReportList title="已知限制" items={evaluationMeta.knownLimits} warning />
        <ReportList title="下一轮行动" items={evaluationMeta.nextActions} />
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value, helper }: { icon: typeof CheckCircle2; label: string; value: string; helper: string }) { return <div className="bg-white p-5"><div className="flex items-center gap-2 text-xs text-slate-500"><Icon className="h-4 w-4 text-blue-600" />{label}</div><p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p><p className="mt-2 text-[11px] font-medium text-amber-700">模拟离线评测</p></div>; }
function Price({ label, value }: { label: string; value: string }) { return <div className="border-l-2 border-slate-200 pl-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-mono text-sm font-semibold text-slate-900">{value}</p></div>; }
function Bool({ value, neutral = false }: { value: boolean; neutral?: boolean }) { return <td className={`px-3 py-3 font-medium ${neutral ? value ? "text-blue-700" : "text-slate-400" : value ? "text-emerald-700" : "text-rose-700"}`}>{value ? "是" : "否"}</td>; }
function ReportList({ title, items, warning = false }: { title: string; items: string[]; warning?: boolean }) { return <div className="border-t border-slate-200 pt-5"><h3 className="text-base font-semibold text-slate-950">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">{warning ? <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-600" /> : <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-blue-600" />}<span>{item}</span></li>)}</ul></div>; }
