"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import { BookOpenCheck } from "lucide-react";
import { cn } from "cn";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

type Props = {
  book: {
    _id: string;
    title: string;
    image: string;
  };
};

const BORROWS_API = "http://localhost:8000";

const BorrowBookDialog = ({ book }: Props) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!session) {
      router.replace("/login");
      return;
    }

    setIsBorrowing(true);
    try {
      const borrowedOn = new Date();
      const dueOn = addDays(borrowedOn, 14);

      const response = await fetch(`${BORROWS_API}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: session.user.email,
          borrowDate: borrowedOn.toISOString(),
          returnDate: dueOn.toISOString(),
        }),
      });

      const result: { message?: string } | null = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Could not borrow this book.");
      }

      toast.add({
        type: "success",
        title: "Book borrowed!",
        description: `Please return it by ${format(dueOn, "MMM d, yyyy")}.`,
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Borrow failed",
        description:
          error instanceof Error ? error.message : "Could not borrow this book.",
      });
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-full bg-[#334e68] px-8 text-base text-white hover:bg-[#243b53] sm:w-auto",
            )}
          />
        }
      >
        <BookOpenCheck data-icon="inline-start" />
        Borrow This Book
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow this book</DialogTitle>
          <DialogDescription>
            Confirm your details to borrow &quot;{book.title}&quot; for 14 days.
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <p className="py-6 text-center text-sm text-slate-500">
            Loading your account…
          </p>
        ) : !session ? (
          <div className="py-6 text-center">
            <p className="text-sm text-slate-600">
              Please log in to borrow this book.
            </p>
            <Button
              type="button"
              className="mt-4 rounded-full"
              onClick={() => router.replace("/login")}
            >
              Log in
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleBorrow();
            }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <Label htmlFor="borrow-user-name">User Name</Label>
              <Input id="borrow-user-name" value={session.user.name} readOnly />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="borrow-user-email">User Email</Label>
              <Input
                id="borrow-user-email"
                type="email"
                value={session.user.email}
                readOnly
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full"
                disabled={isBorrowing}
              >
                {isBorrowing ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <BookOpenCheck data-icon="inline-start" />
                )}
                {isBorrowing ? "Borrowing…" : "Confirm Borrow"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
