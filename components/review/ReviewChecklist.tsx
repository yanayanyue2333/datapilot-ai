import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const checklist = ["Metric definition checked", "Date range checked", "Abnormal event dates checked", "Segment logic checked", "SQL filter checked", "Business caveat checked"];

export function ReviewChecklist() {
  return (
    <Card>
      <h3 className="text-base font-semibold text-slate-950">Analyst checklist</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {checklist.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
