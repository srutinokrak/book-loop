import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBooks() {
  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-slate-200 pb-8">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="mt-4 h-10 w-56" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <Skeleton className="aspect-[2/3] w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-9 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
