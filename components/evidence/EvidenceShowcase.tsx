import { Camera, CheckCircle2 } from "lucide-react";
import {
  evidenceArtifacts,
  evidenceQueries,
  funnelEvidence,
  monitoringSignals,
  pythonDiagnosisEvidence
} from "@/data/mock-evidence";
import { Card } from "@/components/ui/card";
import { FunnelEvidencePanel } from "@/components/evidence/FunnelEvidencePanel";
import { MetricMonitoringPanel } from "@/components/evidence/MetricMonitoringPanel";
import { PythonDiagnosisCard } from "@/components/evidence/PythonDiagnosisCard";
import { SqlEvidenceCard } from "@/components/evidence/SqlEvidenceCard";

export function EvidenceShowcase() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Evidence layer</p>
            <h2 className="mt-2 text-2xl font-semibold text-blue-950">SQL / Python / 漏斗 / 监控证据</h2>
            <p className="mt-3 text-sm leading-6 text-blue-900">
              这些模块使用模拟数据，用来证明 DataPilot 的产品机制：业务回答必须能回到查询、口径、诊断路径和人工审核，而不是只展示一个结论。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {evidenceArtifacts.map((artifact) => (
              <div key={artifact.id} className="rounded-md bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                  <Camera className="h-4 w-4" />
                  {artifact.route}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-950">{artifact.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{artifact.screenshotHint}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        {evidenceQueries.map((query) => (
          <SqlEvidenceCard key={query.id} query={query} />
        ))}
      </div>
      <FunnelEvidencePanel steps={funnelEvidence} />
      <PythonDiagnosisCard diagnosis={pythonDiagnosisEvidence} />
      <MetricMonitoringPanel signals={monitoringSignals} />
      <Card className="border-emerald-200 bg-emerald-50">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
          <div>
            <h2 className="text-base font-semibold text-emerald-950">作品集截图建议</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              推荐截图顺序：SQL 查询证据、漏斗断点、Python 贡献度拆解、指标监控面板。每张截图都保留 Simulated data 标识，避免被误解为真实业务数据。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
