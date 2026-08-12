import { BrainCircuit, NotebookTabs } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { PythonDiagnosisEvidence } from "@/types";

export function PythonDiagnosisCard({ diagnosis }: { diagnosis: PythonDiagnosisEvidence }) {
  const maxDrop = Math.max(...diagnosis.contributions.map((item) => Math.abs(item.contribution)));

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              <NotebookTabs className="h-4 w-4" />
              Python Diagnosis
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{diagnosis.title}</h2>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
            confidence: {diagnosis.confidence}
          </span>
        </div>
        <div className="mt-4 grid gap-3 text-xs text-slate-600 md:grid-cols-3">
          <Meta label="Notebook" value={diagnosis.notebookPath} />
          <Meta label="Method" value={diagnosis.method} />
          <Meta label="Window" value={diagnosis.window} />
        </div>
      </div>
      <div className="grid gap-0 xl:grid-cols-[1fr_1fr]">
        <pre className="max-h-[420px] overflow-auto bg-slate-950 p-5 text-xs leading-5 text-slate-100">
          <code>{diagnosis.code}</code>
        </pre>
        <div className="border-t border-slate-200 p-5 xl:border-l xl:border-t-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <BrainCircuit className="h-4 w-4 text-blue-600" />
            Diagnosis output
          </div>
          <div className="mt-4 space-y-3">
            {diagnosis.findings.map((finding) => (
              <div key={finding} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                {finding}
              </div>
            ))}
          </div>
          <h3 className="mt-5 text-sm font-semibold text-slate-950">Contribution decomposition</h3>
          <div className="mt-3 space-y-3">
            {diagnosis.contributions.map((item) => {
              const width = Math.max(14, Math.round((Math.abs(item.contribution) / maxDrop) * 100));
              return (
                <div key={item.id} className="rounded-md border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-slate-900">{item.segment}</span>
                    <span className="font-semibold text-rose-700">{item.contribution.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-rose-500" style={{ width: `${width}%` }} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {Math.round(item.shareOfDrop * 100)}% of drop · {item.note}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            {diagnosis.reviewNote}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-slate-800">{value}</p>
    </div>
  );
}
