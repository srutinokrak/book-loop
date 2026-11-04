import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMyBorrows() {
  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-slate-200 pb-8 text-center">
          <Skeleton className="mx-auto size-11 rounded-2xl" />
          <Skeleton className="mx-auto mt-4 h-9 w-52" />
          <Skeleton className="mx-auto mt-4 h-5 w-72" />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-slate-100 px-4 py-4 last:border-0"
            >
              <Skeleton className="h-16 w-12 rounded-lg" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
