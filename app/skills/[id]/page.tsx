import { notFound } from "next/navigation";
import { getSkillById } from "@/lib/skills/skillEngine";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = getSkillById(params.id);
  if (!skill) notFound();

  return (
    <>
      <PageHeader title={skill.name} description={skill.description} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><h2 className="font-semibold">Target User</h2><p className="mt-2 text-sm text-slate-600">{skill.targetUser}</p></Card>
        <Card><h2 className="font-semibold">Use Case</h2><p className="mt-2 text-sm text-slate-600">{skill.useCase}</p></Card>
        <Card><h2 className="font-semibold">Input Parameters</h2><p className="mt-2 text-sm text-slate-600">{skill.inputParameters.join(", ")}</p></Card>
        <Card><h2 className="font-semibold">Output Structure</h2><p className="mt-2 text-sm text-slate-600">{skill.outputStructure.join(", ")}</p></Card>
        <Card className="lg:col-span-2"><h2 className="font-semibold">Latest Iteration</h2><p className="mt-2 text-sm text-slate-600">{skill.latestIterationNote}</p></Card>
      </div>
    </>
  );
}
