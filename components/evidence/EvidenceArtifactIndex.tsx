import Link from "next/link";
import { Camera } from "lucide-react";
import { evidenceArtifacts } from "@/data/mock-evidence";
import { Card } from "@/components/ui/card";

export function EvidenceArtifactIndex() {
  return (
    <Card>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
        <Camera className="h-4 w-4" />
        Screenshot artifacts
      </div>
      <h2 className="mt-2 text-xl font-semibold text-slate-950">可补充到作品集的证据截图</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {evidenceArtifacts.map((artifact) => (
          <div key={artifact.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <Link href={artifact.route} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
              {artifact.title}
            </Link>
            <p className="mt-2 text-xs leading-5 text-slate-600">{artifact.purpose}</p>
            <p className="mt-3 rounded-md bg-white p-2 text-xs leading-5 text-slate-700">{artifact.screenshotHint}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
