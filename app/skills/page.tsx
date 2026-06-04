import Link from "next/link";
import { agentSkills } from "@/data/mock-skills";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const statusLabel = {
  stable: "稳定版",
  beta: "Beta",
  experimental: "实验中",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader title="Agent Skill / 智能体技能" description="可复用的 AI 工作流，用于产品分析、产品运营、上线复盘和受治理的 SQL 辅助。" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agentSkills.map((skill) => (
          <Link key={skill.id} href={`/skills/${skill.id}`}>
            <Card className="h-full transition hover:border-blue-300 hover:shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-950">{skill.name}</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{statusLabel[skill.status]}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{skill.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-slate-600">
                <span>{skill.usageCount} 次运行</span>
                <span>满意度 {skill.satisfactionScore}/5</span>
                <span>失败率 {Math.round(skill.failureRate * 100)}%</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
