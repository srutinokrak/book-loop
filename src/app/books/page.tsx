import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, BookPlus, LibraryBig, TriangleAlert } from "lucide-react";
import { cn } from "cn";

import { BookCard, type Book } from "@/components/book-card";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Books",
  description: "Browse every book shared on the BookNook shelves.",
};

export const dynamic = "force-dynamic";

const BOOKS_API_URL =
  process.env.BOOKS_API_URL ?? "https://book-loop-backend.vercel.app/books";

const primaryButton = cn(
  buttonVariants({ size: "lg" }),
  "w-fit rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
);

async function getBooks(): Promise<Book[]> {
  const response = await fetch(BOOKS_API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`The books service responded with ${response.status}.`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("The books service returned an unexpected response.");
  }

  return data as Book[];
}

const AllBooks = async () => {
  let books: Book[] = [];
  let loadFailed = false;

  try {
    books = await getBooks();
  } catch (error) {
    console.error("Could not load books:", error);
    loadFailed = true;
  }

  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              The whole collection
            </p>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#dcefe9] text-[#407b67]">
                <LibraryBig size={23} strokeWidth={1.8} />
              </span>
              All Books
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              Browse every book on the BookNook shelves and find your next great
              read.
            </p>
          </div>

          <Link href="/books/add" className={primaryButton}>
            <BookPlus data-icon="inline-start" />
            Add a book
          </Link>
        </header>

        {!loadFailed && books.length > 0 && (
          <p className="mt-6 text-sm text-slate-500">
            {books.length} {books.length === 1 ? "book" : "books"} on the shelf
          </p>
        )}

        {loadFailed ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <TriangleAlert size={26} strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-[#243b53]">
              We couldn&apos;t load the books
            </h2>
            <p className="mt-2 max-w-sm leading-7 text-slate-600">
              Something went wrong while reaching the books service. Please
              refresh the page and try again.
            </p>
            <Link href="/books" className={`${primaryButton} mt-6`}>
              Try again
            </Link>
          </div>
        ) : books.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <BookOpen size={26} strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-[#243b53]">
              The shelf is empty
            </h2>
            <p className="mt-2 max-w-sm leading-7 text-slate-600">
              No books have been added yet. Be the first to share one with the
              neighborhood.
            </p>
            <Link href="/books/add" className={`${primaryButton} mt-6`}>
              <BookPlus data-icon="inline-start" />
              Add the first book
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;
