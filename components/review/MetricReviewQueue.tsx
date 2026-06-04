"use client";

import Link from "next/link";
import { CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import { approvedProfitDefinition, useMetricRegistryStore } from "@/lib/metrics/metricRegistryStore";
import { Card } from "@/components/ui/card";

const suggestedProfitDefinition = {
  key: "profit",
  displayName: "利润",
  description: "用于内部经营分析的经营毛利口径。",
  formula: "revenue - marketing_cost - refund_amount - fulfillment_cost",
  dataSources: ["orders_daily", "finance_daily", "marketing_daily"],
  owner: "Data Analytics",
  caveat: "This is operating gross profit, not financial net profit. It does not include fixed costs, tax, or payroll expenses.",
  aliases: ["利润", "profit", "经营毛利", "毛利"],
};

const statusLabel: Record<string, string> = {
  pending: "待审核",
  approved: "已批准",
  rejected: "已拒绝",
};

export function MetricReviewQueue() {
  const requests = useMetricRegistryStore((state) => state.requests);
  const reviewActions = useMetricRegistryStore((state) => state.reviewActions);
  const approveMetricRequest = useMetricRegistryStore((state) => state.approveMetricRequest);
  const rejectMetricRequest = useMetricRegistryStore((state) => state.rejectMetricRequest);
  const definitions = useMetricRegistryStore((state) => state.definitions);
  const pendingRequests = requests.filter((request) => request.status === "pending");
  const profitApproved = definitions.some((definition) => definition.name === "profit");

  function approve(requestId: string) {
    approveMetricRequest(requestId, suggestedProfitDefinition);
  }

  return (
    <div className="space-y-6">
      {profitApproved ? (
        <Card className="border-emerald-200 bg-emerald-50">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-700" />
            <div>
              <h2 className="text-sm font-semibold text-emerald-950">利润口径已审批</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-900">AI 数据助手现在可以基于经营毛利口径回答利润相关问题。</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link className="inline-flex h-9 items-center rounded-md bg-emerald-700 px-3 text-sm font-medium text-white hover:bg-emerald-800" href="/metric-registry">查看指标口径库</Link>
                <Link className="inline-flex h-9 items-center rounded-md border border-emerald-200 bg-white px-3 text-sm font-medium text-emerald-800 hover:bg-emerald-100" href="/assistant">返回 AI 数据助手</Link>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-950">待审核口径申请队列</h2>
              <p className="mt-1 text-sm text-slate-600">从诚实拒答场景提交的 MetricRequest 会进入这里，由分析师确认后再入库。</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{pendingRequests.length} 个待审核</span>
          </div>
          <div className="mt-5 space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                暂无待审核指标申请。请打开 AI 数据助手，询问“为什么本月利润下降？”，并提交利润口径申请。
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">申请指标</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">{request.displayName ?? request.metricName}</h3>
                      <p className="mt-1 text-sm text-slate-500">{request.key ?? request.metricName}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-800">{statusLabel[request.status] ?? request.status}</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-md bg-white p-3">
                      <p className="text-xs font-medium text-slate-500">来源问题</p>
                      <p className="mt-1 text-sm text-slate-700">{request.sourceQuestion ?? request.businessQuestion}</p>
                    </div>
                    <div className="rounded-md bg-white p-3">
                      <p className="text-xs font-medium text-slate-500">申请原因</p>
                      <p className="mt-1 text-sm text-slate-700">{request.reason ?? request.businessQuestion}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="inline-flex h-9 items-center rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800" type="button" onClick={() => approve(request.id)}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      批准口径
                    </button>
                    <button className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100" type="button" onClick={() => rejectMetricRequest(request.id, "在 MVP 审核演示中被拒绝。")}>
                      <XCircle className="mr-2 h-4 w-4" />
                      拒绝
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-slate-950">分析师审批表预填内容</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Field label="展示名称" value={suggestedProfitDefinition.displayName} />
            <Field label="指标 key" value={suggestedProfitDefinition.key} />
            <Field label="公式" value={suggestedProfitDefinition.formula} />
            <Field label="数据源" value={suggestedProfitDefinition.dataSources.join(", ")} />
            <Field label="负责人" value={suggestedProfitDefinition.owner} />
            <Field label="口径说明" value={suggestedProfitDefinition.caveat} />
            <Field label="别名" value={suggestedProfitDefinition.aliases.join(", ")} />
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-slate-950">审核记录</h2>
        <div className="mt-4 space-y-3">
          {reviewActions.length === 0 ? (
            <p className="text-sm text-slate-600">暂无指标审核记录。</p>
          ) : (
            reviewActions.map((action) => (
              <div key={action.id} className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                <span className="font-medium text-slate-950">{statusLabel[action.action] ?? action.action}</span> {action.requestId}: {action.comment}
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="border-slate-200 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-950">已审批口径预览</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{approvedProfitDefinition.displayName}: {approvedProfitDefinition.formula}</p>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 leading-6 text-slate-800">{value}</p>
    </div>
  );
}
