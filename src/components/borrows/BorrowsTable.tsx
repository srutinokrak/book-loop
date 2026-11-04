"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { BookOpen, Undo2 } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

const BORROWS_API = "https://book-loop-backend.vercel.app";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "MMM d, yyyy");
}

export function BorrowsTable({ borrows }: { borrows: Borrow[] }) {
  const router = useRouter();
  const [returningId, setReturningId] = useState<string | null>(null);

  if (borrows.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <BookOpen size={26} strokeWidth={1.8} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-[#243b53]">
          You haven&apos;t borrowed any books yet
        </h2>
        <p className="mt-2 max-w-sm leading-7 text-slate-600">
          Browse the shelves, borrow a book and it will show up here until you
          return it.
        </p>
        <Link
          href="/books"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 rounded-full bg-[#334e68] px-5 text-white hover:bg-[#243b53]",
          )}
        >
          Browse books
        </Link>
      </div>
    );
  }

  const handleReturn = async (id: string) => {
    setReturningId(id);
    try {
      const response = await fetch(`${BORROWS_API}/borrows/${id}`, {
        method: "DELETE",
      });

      const data: { message?: string } | null = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Could not return the book.");
      }

      toast.add({
        type: "success",
        title: "Book returned. Thank you!",
      });

      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Return failed",
        description:
          error instanceof Error ? error.message : "Could not return the book.",
      });
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Image
            </TableHead>
            <TableHead className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Title
            </TableHead>
            <TableHead className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Borrow Date
            </TableHead>
            <TableHead className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Return Date
            </TableHead>
            <TableHead className="px-4 py-4 text-right text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.map((borrow) => (
            <TableRow key={borrow._id}>
              <TableCell className="px-4 py-4">
                <div className="h-16 w-12 overflow-hidden rounded-lg bg-slate-100">
                  {borrow.bookImage ? (
                    // eslint-disable-next-line @next/next/no-img-element -- covers are user-supplied URLs from any host
                    <img
                      src={borrow.bookImage}
                      alt={`Cover of ${borrow.bookTitle}`}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center text-slate-300">
                      <BookOpen size={20} strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-4 py-4">
                <Link
                  href={`/books/${borrow.bookId}`}
                  className="font-semibold text-[#243b53] hover:text-sky-700"
                >
                  {borrow.bookTitle}
                </Link>
              </TableCell>
              <TableCell className="px-4 py-4 text-slate-600">
                {formatDate(borrow.borrowDate)}
              </TableCell>
              <TableCell className="px-4 py-4 text-slate-600">
                {formatDate(borrow.returnDate)}
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={returningId === borrow._id}
                  onClick={() => handleReturn(borrow._id)}
                >
                  {returningId === borrow._id ? (
                    <Spinner data-icon="inline-start" />
                  ) : (
                    <Undo2 data-icon="inline-start" />
                  )}
                  {returningId === borrow._id ? "Returning…" : "Return Book"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
