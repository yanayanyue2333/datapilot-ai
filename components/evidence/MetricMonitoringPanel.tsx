import { Activity, AlertTriangle, CheckCircle2, Eye, Siren } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { MonitoringSignal, MonitoringStatus } from "@/types";

const statusConfig: Record<MonitoringStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  healthy: {
    label: "Healthy",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: CheckCircle2
  },
  watch: {
    label: "Watch",
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Eye
  },
  incident: {
    label: "Incident",
    className: "border-rose-200 bg-rose-50 text-rose-800",
    icon: Siren
  }
};

export function MetricMonitoringPanel({ signals }: { signals: MonitoringSignal[] }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            <Activity className="h-4 w-4" />
            Metric monitoring
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">上线后指标监控证据</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            用阈值、owner、最近检查时间和动作建议展示 DataPilot 如何把异常诊断纳入产品运营闭环。
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          Mock monitoring snapshot
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {signals.map((signal) => {
          const config = statusConfig[signal.status];
          const Icon = config.icon;
          return (
            <div key={signal.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">{signal.metricKey}</p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-950">{signal.label}</h3>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950">{signal.value}</p>
              <div className="mt-4 space-y-2 text-xs leading-5 text-slate-600">
                <p><span className="font-medium text-slate-900">阈值：</span>{signal.threshold}</p>
                <p><span className="font-medium text-slate-900">Owner：</span>{signal.owner}</p>
                <p><span className="font-medium text-slate-900">检查：</span>{signal.lastCheckedAt}</p>
                <p className="rounded-md bg-white p-2 text-slate-700">{signal.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
