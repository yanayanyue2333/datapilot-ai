import { metricDefinitions, metricRequests } from "@/data/mock-metrics";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

export default function MetricRegistryPage() {
  return (
    <>
      <PageHeader title="Metric Registry" description="The governance layer that prevents DataPilot AI from inventing undefined business metrics. Profit is intentionally missing in this first pass." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricDefinitions.map((metric) => (
          <Card key={metric.id}>
            <h2 className="text-sm font-semibold text-slate-950">{metric.displayName}</h2>
            <p className="mt-2 text-xs text-slate-500">{metric.owner}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{metric.description}</p>
            <code className="mt-4 block rounded-md bg-slate-100 p-2 text-xs text-slate-700">{metric.formula}</code>
          </Card>
        ))}
      </div>
      <Card className="mt-6 border-amber-200 bg-amber-50">
        <h2 className="text-sm font-semibold text-amber-950">Pending Metric Request</h2>
        <p className="mt-2 text-sm text-amber-900">{metricRequests[0].metricName}: {metricRequests[0].businessQuestion}</p>
      </Card>
    </>
  );
}
