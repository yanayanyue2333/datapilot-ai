import { aiRadarItems } from "@/data/mock-ai-radar";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

export default function AIRadarPage() {
  return (
    <>
      <PageHeader title="AI Radar" description="Structured AI product research notes that translate market mechanisms into DataPilot AI feature opportunities." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {aiRadarItems.map((item) => (
          <Card key={item.id}>
            <h2 className="text-base font-semibold text-slate-950">{item.productName}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.updateOrMechanism}</p>
            <p className="mt-4 text-xs font-semibold uppercase text-blue-600">Opportunity</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.featureOpportunity}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
