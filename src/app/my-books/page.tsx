import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookPlus, LibraryBig } from "lucide-react";
import { cn } from "cn";

import { auth, db } from "@/lib/auth";
import { MyBooksList } from "@/components/my-books-list";
import type { Book } from "@/components/book-card";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have added to BookNook.",
};

export default async function MyBooksPage() {
  const session = await auth.api.getSession(
    { 
      headers: await headers() 

    });

  if (!session) {
    redirect("/login");
  }

  const documents = await db
    .collection("books")
    .find({ userEmail: session.user.email })
    .sort({ addedAt: -1 })
    .toArray();

  const books: Book[] = documents.map((book) => ({
    _id: book._id.toString(),
    title: typeof book.title === "string" ? book.title : "",
    author: typeof book.author === "string" ? book.author : "",
    category: typeof book.category === "string" ? book.category : "Others",
    image: typeof book.image === "string" ? book.image : "",
    description:
      typeof book.description === "string" ? book.description : "",
  }));

  return (
    <section className="min-h-[calc(100vh-76px)] bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Your shelf
            </p>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#e9e3f5] text-[#68558b]">
                <LibraryBig size={23} strokeWidth={1.8} />
              </span>
              My Books
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              Books you have shared with the neighborhood. Keep their details
              fresh or remove a book from the shelf.
            </p>
          </div>

          <Link
            href="/books/add"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-fit rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
            )}
          >
            <BookPlus data-icon="inline-start" />
            Add a book
          </Link>
        </header>

        {books.length > 0 && (
          <p className="mt-6 text-sm text-slate-500">
            {books.length} {books.length === 1 ? "book" : "books"} added by you
          </p>
        )}

        <MyBooksList initialBooks={books} />
      </div>
    </section>
  );
}
