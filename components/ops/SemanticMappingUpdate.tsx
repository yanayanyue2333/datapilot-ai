import { ArrowRight } from "lucide-react";

export function SemanticMappingUpdate({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md bg-slate-50 p-3 text-sm">
      <span className="font-medium text-slate-950">{from}</span>
      <ArrowRight className="h-4 w-4 text-slate-400" />
      <span className="text-blue-700">{to}</span>
    </div>
  );
}
