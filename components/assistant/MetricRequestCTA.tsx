"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, FilePlus2 } from "lucide-react";
import { useMetricRegistryStore } from "@/lib/metrics/metricRegistryStore";

export function MetricRequestCTA({ metricName }: { metricName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const submitMetricRequest = useMetricRegistryStore((state) => state.submitMetricRequest);

  function onSubmit() {
    submitMetricRequest({
      id: "mr-profit-local",
      metricName: "profit",
      key: "profit",
      displayName: "利润",
      requester: "Business User",
      requestedBy: "Business User",
      businessQuestion: "为什么本月利润下降？",
      sourceQuestion: "为什么本月利润下降？",
      reason: "用户需要分析本月利润下降原因，但当前指标口径库缺少利润口径",
      proposedDefinition: "revenue - marketing_cost - refund_amount - fulfillment_cost",
      status: "pending",
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
          {submitted ? <CheckCircle2 className="h-4 w-4" /> : <FilePlus2 className="h-4 w-4" />}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-950">{submitted ? "口径申请已提交" : "提交指标口径申请"}</h3>
          <p className="mt-1 text-sm leading-6 text-blue-900">
            {submitted ? "profit / 利润 的口径申请已进入审核中心，等待分析师确认。" : `在 DataPilot AI 使用 ${metricName} 进行业务分析前，先提交给数据团队审核。`}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="inline-flex h-9 items-center rounded-md bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70" type="button" onClick={onSubmit} disabled={submitted}>
              {submitted ? "已提交" : "提交口径申请"}
            </button>
            {submitted ? (
              <Link className="inline-flex h-9 items-center rounded-md border border-blue-200 bg-white px-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100" href="/review">
                前往审核中心
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
