import Link from "next/link";
import { BarChart3, Bot, ClipboardCheck, Gauge, Home, LibraryBig, Radar, Settings2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/daily-triage", label: "Daily Triage", icon: Gauge },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/metric-registry", label: "Metric Registry", icon: LibraryBig },
  { href: "/review", label: "Review", icon: ClipboardCheck },
  { href: "/ops", label: "Ops", icon: BarChart3 },
  { href: "/impact", label: "Impact", icon: TrendingUp },
  { href: "/ai-radar", label: "AI Radar", icon: Radar },
  { href: "/prd", label: "PRD", icon: Settings2 },
  { href: "/case-study", label: "Case Study", icon: ShieldCheck }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div>
            <p className="text-sm font-semibold text-slate-950">DataPilot AI</p>
            <p className="text-xs text-slate-500">Responsible data assistant</p>
          </div>
        </div>
        <nav className="space-y-1 p-3">
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
          <div className="text-sm font-medium text-slate-700">AI data product foundation</div>
          <div className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">Mock MVP</div>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
