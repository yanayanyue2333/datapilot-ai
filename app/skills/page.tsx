import Link from "next/link";
import { agentSkills } from "@/data/mock-skills";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

export default function SkillsPage() {
  return (
    <>
      <PageHeader title="Agent Skill Gallery" description="Reusable AI workflows for product analytics, product operations, post-launch review, and governed SQL assistance." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agentSkills.map((skill) => (
          <Link key={skill.id} href={`/skills/${skill.id}`}>
            <Card className="h-full transition hover:border-blue-300 hover:shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-950">{skill.name}</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{skill.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{skill.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-slate-600">
                <span>{skill.usageCount} runs</span>
                <span>{skill.satisfactionScore}/5 sat</span>
                <span>{Math.round(skill.failureRate * 100)}% fail</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
