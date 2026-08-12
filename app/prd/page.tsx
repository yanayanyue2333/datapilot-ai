import { AcceptanceChecklist } from "@/components/product-delivery/AcceptanceChecklist";
import { DeliveryNav } from "@/components/product-delivery/DeliveryNav";
import { EvaluationReport } from "@/components/product-delivery/EvaluationReport";
import { PublicPrd } from "@/components/product-delivery/PublicPrd";
import { PageHeader } from "@/components/shared/PageHeader";

export default function PRDPage() {
  return (
    <>
      <PageHeader title="产品交付中心" description="公开版 PRD、功能验收证据与 Agent 离线评测报告，形成从产品规则到发布门槛的可审计交付链路。" />
      <DeliveryNav />
      <div className="space-y-20">
        <PublicPrd />
        <AcceptanceChecklist />
        <EvaluationReport />
      </div>
    </>
  );
}
