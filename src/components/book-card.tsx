import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getCategoryStyle } from "@/lib/category-styles";

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
};

export function BookCard({ book }: { book: Book }) {
  const categoryStyle = getCategoryStyle(book.category);

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl bg-white   py-0 shadow-sm ring-slate-200 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
        {book.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- covers are user-supplied URLs from any host
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-slate-300">
            <BookOpen size={46} strokeWidth={1.2} />
          </div>
        )}

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm",
            categoryStyle.badge,
          )}
        >
          {book.category}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <CardTitle className="line-clamp-2 text-lg leading-snug text-[#243b53]">
          {book.title}
        </CardTitle>
        <p className="mt-1.5 text-sm text-slate-500">
          by <span className="font-medium text-slate-600">{book.author}</span>
        </p>

        <Link
          href={`/books/${book._id}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-5 w-full rounded-full bg-[#334e68] text-white hover:bg-[#243b53]",
          )}
        >
          View Details
          <ArrowRight data-icon="inline-end" />
        </Link>
      </CardContent>
    </Card>
  );
}
