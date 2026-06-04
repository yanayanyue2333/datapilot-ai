import { PageHeader } from "@/components/shared/PageHeader";
import { MetricRegistryPanel } from "@/components/metrics/MetricRegistryPanel";

export default function MetricRegistryPage() {
  return (
    <>
      <PageHeader title="指标口径库" description="防止 DataPilot AI 编造未定义指标的治理层。已审批的本地口径会持久化在浏览器 localStorage 中。" />
      <MetricRegistryPanel />
    </>
  );
}
