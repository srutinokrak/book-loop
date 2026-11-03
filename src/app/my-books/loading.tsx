import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMyBooks() {
  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-slate-200 pb-8">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-10 w-52" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:flex-row"
            >
              <Skeleton className="aspect-[2/3] w-24 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
