import { PageHeader } from "@/components/shared/PageHeader";
import { ProductOpsDashboard } from "@/components/ops/ProductOpsDashboard";

export default function OpsPage() {
  return (
    <>
      <PageHeader title="产品运营看板" description="用于观察 AI 数据助手上线后的使用、答案质量、误拒、人工介入和迭代优先级。" />
      <ProductOpsDashboard />
    </>
  );
}
