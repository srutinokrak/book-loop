import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-76px)] items-center bg-[#f8fafc] px-5 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <BookOpen size={26} strokeWidth={1.8} />
        </span>
        <p className="mt-5 text-6xl font-bold tracking-tight text-sky-600">404</p>
        <h1 className="mt-3 text-xl font-semibold text-[#243b53]">Page not found</h1>
        <p className="mt-2 max-w-sm leading-7 text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or removed.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 rounded-full bg-[#334e68] px-6 text-white hover:bg-[#243b53]",
          )}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
