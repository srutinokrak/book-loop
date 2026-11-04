"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

const DeleteBooks = ({ id }: { id: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDeletebooks = async () => {
    setOpen(false);

    try {
      const res = await fetch(`http://localhost:8000/book/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.add({
        type: "success",
        title: "Deleted",
        description: "Book deleted successfully.",
      });

      router.refresh();
    } catch {
      toast.add({
        type: "error",
        title: "Could not delete the book",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "destructive", size: "lg" }),
              "h-12 w-full rounded-full px-6 text-base sm:w-auto",
            )}
          >
            <Trash2 data-icon="inline-start" />
            Delete
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this book
            from your shelf.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletebooks}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBooks;
