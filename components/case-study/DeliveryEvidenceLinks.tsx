import Link from "next/link";
import { ArrowUpRight, FileCheck2, Network } from "lucide-react";

const links = [
  { href: "/prd", title: "产品交付中心", description: "公开 PRD、17 条功能验收与 25 条 Agent 离线评测 Case", icon: FileCheck2 },
  { href: "/mcp-practice", title: "MCP 小型实践", description: "受治理的 GMV 异常诊断、权限确认、Trace、成本与测试断言", icon: Network },
];

export function DeliveryEvidenceLinks() {
  return <section aria-labelledby="delivery-evidence-title"><div className="mb-4"><p className="text-xs font-semibold uppercase text-blue-600">Delivery evidence</p><h2 id="delivery-evidence-title" className="mt-2 text-xl font-semibold text-slate-950">产品交付与 Agent 实践证据</h2></div><div className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-2">{links.map((item) => <Link key={item.href} href={item.href} className="group flex min-w-0 gap-4 bg-white p-5 hover:bg-slate-50"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100"><item.icon className="h-4 w-4 text-slate-700" /></span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-3"><span className="font-semibold text-slate-950">{item.title}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600" /></span><span className="mt-2 block text-sm leading-6 text-slate-600">{item.description}</span></span></Link>)}</div></section>;
}
