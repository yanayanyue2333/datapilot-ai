import { PageHeader } from "@/components/shared/PageHeader";
import { ProductOpsDashboard } from "@/components/ops/ProductOpsDashboard";

export default function OpsPage() {
  return (
    <>
      <PageHeader title="Product Ops" description="Post-launch monitoring for adoption, answer quality, false rejections, human intervention, and iteration priorities." />
      <ProductOpsDashboard />
    </>
  );
}
