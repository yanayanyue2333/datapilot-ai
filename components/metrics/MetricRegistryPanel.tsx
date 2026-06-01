"use client";

import { Database, ShieldCheck } from "lucide-react";
import { useMetricRegistryStore } from "@/lib/metrics/metricRegistryStore";
import { Card } from "@/components/ui/card";

export function MetricRegistryPanel() {
  const definitions = useMetricRegistryStore((state) => state.definitions);
  const hasProfit = definitions.some((metric) => metric.name === "profit" || metric.aliases?.includes("利润"));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-slate-500">Approved metrics</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{definitions.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Profit status</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{hasProfit ? "Approved" : "Absent by default"}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Governance mode</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">LocalStorage MVP</p>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {definitions.map((metric) => (
          <Card key={metric.id} className={metric.name === "profit" ? "border-emerald-200 bg-emerald-50" : undefined}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950">{metric.displayName}</h2>
                <p className="mt-1 text-xs text-slate-500">{metric.key ?? metric.name}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                {metric.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{metric.description}</p>
            <code className="mt-4 block rounded-md bg-white p-2 text-xs text-slate-700">{metric.formula}</code>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-medium text-slate-900">Owner:</span> {metric.owner}</p>
              <p><span className="font-medium text-slate-900">Data sources:</span> {(metric.dataSources ?? [metric.dataSource]).join(", ")}</p>
              <p><span className="font-medium text-slate-900">Aliases:</span> {(metric.aliases ?? [metric.displayName, metric.name]).join(", ")}</p>
              {metric.caveat ? <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800">{metric.caveat}</p> : null}
            </div>
          </Card>
        ))}
      </div>
      {!hasProfit ? (
        <Card className="border-dashed border-slate-300 bg-slate-50">
          <div className="flex items-start gap-3">
            <Database className="mt-1 h-5 w-5 text-slate-500" />
            <div>
              <h2 className="text-sm font-semibold text-slate-950">Profit is not approved yet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Ask “为什么本月利润下降？” in the assistant and submit a metric definition request to start the approval loop.</p>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
