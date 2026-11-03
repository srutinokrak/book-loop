import Link from "next/link";
import { BookOpen, BookPlus, Pencil, Trash2 } from "lucide-react";
import { cn } from "cn";

import type { Book } from "@/components/book-card";
import { buttonVariants } from "@/components/ui/button";
import { getCategoryStyle } from "@/lib/category-styles";

export function MyBooksList({ initialBooks }: { initialBooks: Book[] }) {
  if (initialBooks.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <BookOpen size={26} strokeWidth={1.8} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-[#243b53]">
          You haven&apos;t added any books yet
        </h2>
        <p className="mt-2 max-w-sm leading-7 text-slate-600">
          Share a book with the neighborhood and it will show up on your shelf
          here.
        </p>
        <Link
          href="/books/add"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
          )}
        >
          <BookPlus data-icon="inline-start" />
          Add a book
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {initialBooks.map((book) => {
        const categoryStyle = getCategoryStyle(book.category);

        return (
          <article
            key={book._id}
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md sm:flex-row"
          >
            <Link
              href={`/books/${book._id}`}
              className="aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100"
            >
              {book.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- covers are user-supplied URLs from any host
                <img
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-slate-300">
                  <BookOpen size={28} strokeWidth={1.2} />
                </span>
              )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <span
                className={cn(
                  "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
                  categoryStyle.badge,
                )}
              >
                {book.category}
              </span>

              <h2 className="mt-2 line-clamp-1 text-lg font-semibold text-[#243b53]">
                {book.title}
              </h2>
              <p className="text-sm text-slate-500">
                by{" "}
                <span className="font-medium text-slate-600">{book.author}</span>
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {book.description?.trim() || "No description provided yet."}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <Link
                  href={`/books/${book._id}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full text-slate-600",
                  )}
                >
                  View
                </Link>

                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-full",
                  )}
                >
                  <Pencil data-icon="inline-start" />
                  Edit
                </button>

                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "sm" }),
                    "rounded-full",
                  )}
                >
                  <Trash2 data-icon="inline-start" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
