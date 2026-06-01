export function UserCorrectionBadge({ status }: { status: "已更新" | "待审核" }) {
  return (
    <span className={status === "已更新" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700"}>
      {status}
    </span>
  );
}
