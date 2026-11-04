import { Spinner } from "@/components/ui/spinner";

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[calc(100vh-76px)] flex-col items-center justify-center gap-4 bg-[#f8fafc] px-5 text-center">
      <Spinner className="size-8 text-sky-600" />
      <p className="text-sm font-medium text-slate-500">{label}…</p>
    </div>
  );
}
