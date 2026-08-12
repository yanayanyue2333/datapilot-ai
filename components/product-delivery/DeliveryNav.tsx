import { BarChart3, CheckSquare2, FileText } from "lucide-react";

const items = [
  { href: "#public-prd", label: "公开版 PRD", icon: FileText },
  { href: "#acceptance", label: "功能验收清单", icon: CheckSquare2 },
  { href: "#evaluation", label: "Agent 评测报告", icon: BarChart3 },
];

export function DeliveryNav() {
  return (
    <nav aria-label="产品交付中心页内导航" className="sticky top-16 z-[5] -mx-5 mb-8 overflow-x-auto border-y border-slate-200 bg-slate-50/95 px-5 py-3 backdrop-blur">
      <div className="flex min-w-max gap-2">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
