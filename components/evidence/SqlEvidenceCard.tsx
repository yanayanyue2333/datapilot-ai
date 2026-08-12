import { Database, FileCode2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { EvidenceQuery } from "@/types";

export function SqlEvidenceCard({ query }: { query: EvidenceQuery }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              <FileCode2 className="h-4 w-4" />
              {query.language.toUpperCase()} Evidence
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{query.title}</h2>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            Simulated data
          </span>
        </div>
        <div className="mt-4 grid gap-3 text-xs text-slate-600 md:grid-cols-3">
          <Meta label="Source" value={query.source} />
          <Meta label="Owner" value={query.owner} />
          <Meta label="Grain" value={query.grain} />
        </div>
      </div>
      <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
        <pre className="max-h-[420px] overflow-auto bg-slate-950 p-5 text-xs leading-5 text-slate-100">
          <code>{query.code}</code>
        </pre>
        <div className="border-t border-slate-200 p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Database className="h-4 w-4 text-blue-600" />
            Result preview
          </div>
          <div className="mt-4 space-y-3">
            {query.resultPreview.map((row) => (
              <div key={row} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-700">
                {row}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              Product guardrail
            </div>
            <p className="mt-2 text-xs leading-5 text-emerald-900">
              展示产品级分析证据，不暴露模型链路；真实上线时需要数据分析师审核 SQL 范围和口径。
            </p>
          </div>
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
