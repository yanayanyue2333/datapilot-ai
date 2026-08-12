import { EvidenceShowcase } from "@/components/evidence/EvidenceShowcase";
import { PageHeader } from "@/components/shared/PageHeader";

export default function EvidencePage() {
  return (
    <>
      <PageHeader
        title="分析证据层"
        description="用模拟数据展示 DataPilot AI 如何把业务问题连接到 SQL 查询、Python 异常诊断、漏斗断点和指标监控，形成可审核的作品集证据。"
      />
      <EvidenceShowcase />
    </>
  );
}
