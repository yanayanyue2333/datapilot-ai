"use client";

import Link from "next/link";
import { CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import { approvedProfitDefinition, useMetricRegistryStore } from "@/lib/metrics/metricRegistryStore";
import { Card } from "@/components/ui/card";

const suggestedProfitDefinition = {
  key: "profit",
  displayName: "利润",
  description: "Operating gross profit for internal product analysis.",
  formula: "revenue - marketing_cost - refund_amount - fulfillment_cost",
  dataSources: ["orders_daily", "finance_daily", "marketing_daily"],
  owner: "Data Analytics",
  caveat: "This is operating gross profit, not financial net profit. It does not include fixed costs, tax, or payroll expenses.",
  aliases: ["利润", "profit", "经营毛利", "毛利"]
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
              <h2 className="text-sm font-semibold text-emerald-950">Profit definition approved</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-900">The assistant can now answer profit questions using the operating gross profit definition.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link className="inline-flex h-9 items-center rounded-md bg-emerald-700 px-3 text-sm font-medium text-white hover:bg-emerald-800" href="/metric-registry">View registry</Link>
                <Link className="inline-flex h-9 items-center rounded-md border border-emerald-200 bg-white px-3 text-sm font-medium text-emerald-800 hover:bg-emerald-100" href="/assistant">Return to assistant</Link>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Pending MetricRequest queue</h2>
              <p className="mt-1 text-sm text-slate-600">Requests submitted from honest refusal moments appear here for analyst approval.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{pendingRequests.length} pending</span>
          </div>
          <div className="mt-5 space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                No pending metric requests. Open the assistant, ask “为什么本月利润下降？”, and submit the metric definition request.
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Requested metric</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">{request.displayName ?? request.metricName}</h3>
                      <p className="mt-1 text-sm text-slate-500">{request.key ?? request.metricName}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-800">{request.status}</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-md bg-white p-3">
                      <p className="text-xs font-medium text-slate-500">Source question</p>
                      <p className="mt-1 text-sm text-slate-700">{request.sourceQuestion ?? request.businessQuestion}</p>
                    </div>
                    <div className="rounded-md bg-white p-3">
                      <p className="text-xs font-medium text-slate-500">Reason</p>
                      <p className="mt-1 text-sm text-slate-700">{request.reason ?? request.businessQuestion}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="inline-flex h-9 items-center rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800" type="button" onClick={() => approve(request.id)}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Approve
                    </button>
                    <button className="inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100" type="button" onClick={() => rejectMetricRequest(request.id, "Rejected in MVP review demo.")}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-slate-950">Suggested analyst approval form</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Field label="displayName" value={suggestedProfitDefinition.displayName} />
            <Field label="key" value={suggestedProfitDefinition.key} />
            <Field label="formula" value={suggestedProfitDefinition.formula} />
            <Field label="dataSources" value={suggestedProfitDefinition.dataSources.join(", ")} />
            <Field label="owner" value={suggestedProfitDefinition.owner} />
            <Field label="caveat" value={suggestedProfitDefinition.caveat} />
            <Field label="aliases" value={suggestedProfitDefinition.aliases.join(", ")} />
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-slate-950">Review history</h2>
        <div className="mt-4 space-y-3">
          {reviewActions.length === 0 ? (
            <p className="text-sm text-slate-600">No metric review actions yet.</p>
          ) : (
            reviewActions.map((action) => (
              <div key={action.id} className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                <span className="font-medium text-slate-950">{action.action}</span> {action.requestId}: {action.comment}
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="border-slate-200 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-950">Approved definition preview</h2>
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
