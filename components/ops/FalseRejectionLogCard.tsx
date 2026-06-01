import { Bot, MessageSquareWarning, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { SemanticMappingUpdate } from "@/components/ops/SemanticMappingUpdate";
import { UserCorrectionBadge } from "@/components/ops/UserCorrectionBadge";

export interface FalseRejectionCase {
  id: string;
  originalQuestion: string;
  originalJudgment: string;
  userFeedback: string;
  mappingFrom: string;
  mappingTo: string;
  status: "已更新" | "待审核";
  impactedSkill: string;
}

export function FalseRejectionLogCard({ item }: { item: FalseRejectionCase }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">False rejection</p>
          <h3 className="mt-2 text-base font-semibold text-slate-950">{item.originalQuestion}</h3>
        </div>
        <UserCorrectionBadge status={item.status} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Info icon={<Bot className="h-4 w-4" />} label="系统原判断" value={item.originalJudgment} />
        <Info icon={<UserRound className="h-4 w-4" />} label="用户反馈" value={item.userFeedback} />
      </div>
      <div className="mt-4">
        <SemanticMappingUpdate from={item.mappingFrom} to={item.mappingTo} />
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-600">
        <MessageSquareWarning className="h-4 w-4 text-blue-600" />
        Impacted Skill: {item.impactedSkill}
      </div>
    </Card>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
