"use client";

import { useState } from "react";
import { AnomalyTriageCard, type TriageAnomaly } from "@/components/triage/AnomalyTriageCard";
import { DrilldownPath } from "@/components/triage/DrilldownPath";
import { TriageNextActionPanel } from "@/components/triage/TriageNextActionPanel";

const anomalies: TriageAnomaly[] = [
  { id: "gmv-drop", title: "本周 GMV 环比下降 12.3%", impact: "High", affectedMetrics: ["GMV", "paid_orders", "conversion_rate"], initialSignal: "下降主要集中在自然流量渠道。", recommendedNextStep: "从渠道、用户分群、转化漏斗三层继续拆解。" },
  { id: "d7-retention", title: "新用户 D7 留存下降 5.8%", impact: "Medium", affectedMetrics: ["D7 retention", "onboarding completion", "first purchase rate"], initialSignal: "下降集中在新注册但未完成首购用户。", recommendedNextStep: "检查 onboarding 到首购路径的断点。" },
  { id: "roi-risk", title: "渠道 ROI 低于安全阈值", impact: "High", affectedMetrics: ["CAC", "ROI", "paid_orders", "marketing_cost"], initialSignal: "付费投放成本增长快于收入增长。", recommendedNextStep: "拆分渠道 ROI、CAC 与新客质量。" }
];

export function DailyTriageDesk() {
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);
  const selected = anomalies.find((anomaly) => anomaly.id === selectedAnomalyId);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        {anomalies.map((anomaly) => (
          <AnomalyTriageCard key={anomaly.id} anomaly={anomaly} selected={selectedAnomalyId === anomaly.id} onDrilldown={() => setSelectedAnomalyId(anomaly.id)} />
        ))}
      </div>
      {selected ? (
        <>
          <DrilldownPath />
          <TriageNextActionPanel />
        </>
      ) : null}
    </div>
  );
}
