import { FilePlus2 } from "lucide-react";

export function MetricRequestCTA({ metricName }: { metricName: string }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
          <FilePlus2 className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-950">Submit metric definition request</h3>
          <p className="mt-1 text-sm leading-6 text-blue-900">Create a request for data team review before DataPilot AI uses {metricName} in business analysis.</p>
          <button className="mt-3 inline-flex h-9 items-center rounded-md bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-700" type="button">
            Submit request
          </button>
        </div>
      </div>
    </div>
  );
}
