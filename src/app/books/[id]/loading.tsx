import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBookDetails() {
  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="h-4 w-32" />

        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex items-center justify-center bg-[#eaf6ff] p-6 sm:p-10 lg:p-12">
              <Skeleton className="aspect-[2/3] w-full max-w-sm rounded-2xl" />
            </div>

            <div className="space-y-4 border-t-4 border-sky-200 p-6 sm:p-8 lg:border-l-4 lg:border-t-0 lg:p-10">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-6 h-px w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-6 h-20 w-full rounded-2xl" />
              <Skeleton className="mt-2 h-12 w-52 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
