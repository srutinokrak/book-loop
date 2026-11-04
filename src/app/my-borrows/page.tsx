import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LibraryBig, TriangleAlert } from "lucide-react";
import { cn } from "cn";

import { auth } from "@/lib/auth";
import { BorrowsTable, type Borrow } from "@/components/borrows/BorrowsTable";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Borrows",
  description: "Track the books you have borrowed from BookNook.",
};

const BORROWS_API = process.env.BORROWS_API_URL ?? "https://book-loop-backend.vercel.app";

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  let borrows: Borrow[] = [];
  let loadFailed = false;

  try {
    const response = await fetch(
      `${BORROWS_API}/borrows?email=${encodeURIComponent(session.user.email)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`The borrows service responded with ${response.status}.`);
    }

    const data: unknown = await response.json();
    borrows = Array.isArray(data) ? (data as Borrow[]) : [];
  } catch (error) {
    console.error("Could not load borrows:", error);
    loadFailed = true;
  }

  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-slate-200 pb-8 text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#dcefe9] text-[#407b67]">
              <LibraryBig size={23} strokeWidth={1.8} />
            </span>
            My Borrows
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Books you are reading right now.
          </p>
        </header>

        {loadFailed ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <TriangleAlert size={26} strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-[#243b53]">
              We couldn&apos;t load your borrows
            </h2>
            <p className="mt-2 max-w-sm leading-7 text-slate-600">
              Something went wrong while reaching the borrows service. Please
              refresh the page and try again.
            </p>
            <Link
              href="/my-borrows"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
              )}
            >
              Try again
            </Link>
          </div>
        ) : (
          <BorrowsTable borrows={borrows} />
        )}
      </div>
    </section>
  );
}
