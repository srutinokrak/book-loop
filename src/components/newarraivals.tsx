import Link from "next/link";
import { BookCard, type Book } from "@/components/book-card";

const NEW_ARRIVALS_API_URL =
  process.env.NEW_ARRIVALS_API_URL ?? "http://localhost:8000/new-arrivals";

async function getLatestBooks(): Promise<Book[]> {
  const response = await fetch(`${NEW_ARRIVALS_API_URL}?limit=6`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Books API returned ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Books API returned an unexpected response");
  }

  return data as Book[];
}

export default async function NewArrivals() {
  let books: Book[];

  try {
    books = await getLatestBooks();
  } catch (error) {
    console.error("Could not load new arrivals:", error);

    return (
      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-[#243b53]">
            New Arrivals
          </h2>
          <p className="mt-4 text-slate-600">
            Could not load new books. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold text-[#243b53]">
          New Arrivals
        </h2>

        {books.length === 0 ? (
          <p className="mt-6 text-slate-600">No books have been added yet.</p>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            <div className="mt-9 flex justify-center">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-full bg-[#334e68] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#243b53]"
              >
                See All Books
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
