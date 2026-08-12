import Link from "next/link";
import { BarChart3, Bot, ClipboardCheck, FileCheck2, FileSearch, Gauge, Home, LibraryBig, Network, Radar, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/assistant", label: "AI 数据助手", icon: Bot },
  { href: "/daily-triage", label: "每日数据分诊", icon: Gauge },
  { href: "/evidence", label: "分析证据层", icon: FileSearch },
  { href: "/skills", label: "Agent Skill", icon: Sparkles },
  { href: "/metric-registry", label: "指标口径库", icon: LibraryBig },
  { href: "/review", label: "审核中心", icon: ClipboardCheck },
  { href: "/ops", label: "产品运营", icon: BarChart3 },
  { href: "/impact", label: "上线效果模拟", icon: TrendingUp },
  { href: "/ai-radar", label: "AI 产品雷达", icon: Radar },
  { href: "/prd", label: "产品交付中心", icon: FileCheck2 },
  { href: "/mcp-practice", label: "MCP 实践", icon: Network },
  { href: "/case-study", label: "项目案例", icon: ShieldCheck }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div>
            <p className="text-sm font-semibold text-slate-950">DataPilot AI</p>
            <p className="text-xs text-slate-500">负责任的 AI 数据助手</p>
          </div>
        </div>
        <nav className="h-[calc(100vh-4rem)] space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950")}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur">
          <div className="text-sm font-medium text-slate-700">AI 数据产品作品集</div>
          <div className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">Mock MVP</div>
        </header>
        <nav aria-label="移动端主导航" className="overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
          <div className="flex min-w-max gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950">
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
