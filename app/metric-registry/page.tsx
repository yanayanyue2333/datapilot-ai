import { PageHeader } from "@/components/shared/PageHeader";
import { MetricRegistryPanel } from "@/components/metrics/MetricRegistryPanel";

export default function MetricRegistryPage() {
  return (
    <>
      <PageHeader title="Metric Registry" description="The governance layer that prevents DataPilot AI from inventing undefined business metrics. Approved local definitions persist in the browser." />
      <MetricRegistryPanel />
    </>
  );
}
