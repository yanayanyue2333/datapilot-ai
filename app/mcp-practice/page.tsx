import { McpDemo } from "@/components/mcp-practice/McpDemo";
import { McpTestReport } from "@/components/mcp-practice/McpTestReport";
import { ProductBoundaries } from "@/components/mcp-practice/ProductBoundaries";
import { ToolCatalog } from "@/components/mcp-practice/ToolCatalog";
import { PageHeader } from "@/components/shared/PageHeader";

export default function McpPracticePage() {
  return (
    <>
      <PageHeader title="MCP 小型实践" description="以受治理的 GMV 异常诊断展示工具契约、权限确认、诚实拒答、有限重试、人工升级与产品级 Trace。全部执行与数据均为确定性 Mock。" />
      <div className="space-y-20"><McpDemo /><ToolCatalog /><McpTestReport /><ProductBoundaries /></div>
    </>
  );
}
