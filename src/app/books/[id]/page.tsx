import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";
import { cn } from "cn";
import { format } from "date-fns";

import { buttonVariants } from "@/components/ui/button";
import { getCategoryStyle } from "@/lib/category-styles";

import EditBooksdialog from "@/components/EditBooksdialog";
import DeleteBooks from "@/components/DeleteBooks";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName?: string;
  userEmail?: string;
  addedAt?: string;
};

const BOOKS_API_BASE = process.env.BOOKS_API_URL ?? "http://localhost:8000";

const getBook = cache(async (id: string): Promise<Book | null> => {
  const response = await fetch(`${BOOKS_API_BASE}/book/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`The books service responded with ${response.status}.`);
  }

  // The service replies with an empty body when no book matches the id.
  const body = await response.text();
  if (!body.trim()) {
    return null;
  }

  const data: unknown = JSON.parse(body);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  return data as Book;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const book = await getBook(id);
    if (!book) {
      return { title: "Book not found | BookNook" };
    }

    return {
      title: `${book.title} by ${book.author} | BookNook`,
      description: book.description,
    };
  } catch {
    return { title: "Book Details | BookNook" };
  }
}

function BookMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex min-h-[calc(100vh-76px)] items-center bg-[#f8fafc] px-5 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <BookOpen size={26} strokeWidth={1.8} />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-[#243b53]">{title}</h1>
        <p className="mt-2 max-w-sm leading-7 text-slate-600">{description}</p>
        <Link
          href="/books"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
          )}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to all books
        </Link>
      </div>
    </section>
  );
}

const BooksDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let book: Book | null = null;
  let loadFailed = false;

  try {
    book = await getBook(id);
  } catch (error) {
    console.error("Could not load book:", error);
    loadFailed = true;
  }

  if (loadFailed) {
    return (
      <BookMessage
        title="We couldn't load this book"
        description="Something went wrong while reaching the books service. Please refresh the page and try again."
      />
    );
  }

  if (!book) {
    return (
      <BookMessage
        title="Book not found"
        description="This book may have been removed from the shelf. Browse the other books instead."
      />
    );
  }

  const addedBy = book.userName?.trim() || "A BookNook reader";
  const addedOn = book.addedAt ? new Date(book.addedAt) : null;
  const addedOnLabel =
    addedOn && !Number.isNaN(addedOn.getTime())
      ? format(addedOn, "MMM d, yyyy")
      : null;
  const categoryStyle = getCategoryStyle(book.category);

  return (
    <section className="min-h-[calc(100vh-76px)]  bg-[#f8fafc] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:gap-3 hover:text-sky-800"
        >
          <ArrowLeft size={16} />
          Back to all books
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div
              className={cn(
                "flex items-center justify-center p-6 sm:p-10 lg:p-12",
                categoryStyle.soft,
              )}
            >
              <div className="aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-200 shadow-lg ring-1 ring-black/5">
                {book.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- covers are user-supplied URLs from any host
                  <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-slate-400">
                    <BookOpen size={56} strokeWidth={1.2} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <span
                className={cn(
                  "w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                  categoryStyle.badge,
                )}
              >
                {book.category}
              </span>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-2 text-base text-slate-500">
                by{" "}
                <span className="font-semibold text-slate-700">
                  {book.author}
                </span>
              </p>

              <div className="mt-7 border-t border-slate-100 pt-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  About this book
                </h2>
                <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">
                  {book.description?.trim() || "No description provided yet."}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800">
                  {book.userName?.trim() ? (
                    <span className="text-sm font-bold uppercase">
                      {book.userName.trim().charAt(0)}
                    </span>
                  ) : (
                    <UserRound size={20} strokeWidth={1.8} />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Added by
                  </p>
                  <p className="truncate font-semibold text-[#243b53]">
                    {addedBy}
                  </p>
                  {book.userEmail && (
                    <p className="truncate text-sm text-slate-500">
                      {book.userEmail}
                    </p>
                  )}
                  {addedOnLabel && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                      <CalendarDays size={13} />
                      {addedOnLabel}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                     <button
                  type="button"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 w-full rounded-full bg-[#334e68] px-8 text-base text-white hover:bg-[#243b53] sm:w-auto",
                  )}
                >
                  <BookOpenCheck data-icon="inline-start" />
                  Borrow This Book
                </button>

               
                  <EditBooksdialog book= {book}/>
                   <DeleteBooks id={id}/>
           
                </div>
                
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BooksDetailsPage;
