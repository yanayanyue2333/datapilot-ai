import { falseRejectionLogs, topFailedQuestions, usageLogs } from "@/data/mock-ops";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

export default function OpsPage() {
  const latest = usageLogs.at(-1)!;
  return (
    <>
      <PageHeader title="Product Ops" description="Post-launch monitoring for adoption, answer quality, false rejections, human intervention, and iteration priorities." />
      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-xs text-slate-500">DAU</p><p className="mt-2 text-2xl font-semibold">{latest.dau}</p></Card>
        <Card><p className="text-xs text-slate-500">Questions</p><p className="mt-2 text-2xl font-semibold">{latest.questions}</p></Card>
        <Card><p className="text-xs text-slate-500">Satisfaction</p><p className="mt-2 text-2xl font-semibold">{latest.answerSatisfaction}/5</p></Card>
        <Card><p className="text-xs text-slate-500">Human Intervention</p><p className="mt-2 text-2xl font-semibold">{Math.round(latest.humanInterventionRate * 100)}%</p></Card>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Top Failed Questions</h2>
          <div className="mt-4 space-y-3">{topFailedQuestions.map((q) => <p key={q} className="rounded-md bg-slate-100 p-3 text-sm text-slate-700">{q}</p>)}</div>
        </Card>
        <Card>
          <h2 className="font-semibold">False Rejection Log</h2>
          <div className="mt-4 space-y-3">{falseRejectionLogs.map((log) => <p key={log.id} className="text-sm text-slate-600">{log.userQuestion} {"->"} {log.mappedIntent}</p>)}</div>
        </Card>
      </div>
    </>
  );
}
