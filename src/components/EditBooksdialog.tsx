"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "cn";
import { Pencil } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { BookPlus, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];



type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
};

type Props = {
  book: Book;
};

const EditBooksdialog = ({book}:Props) => {

    console.log(book);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(book);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    const {_id, ...updatedData} = form

    try {
      const response = await fetch(`http://localhost:8000/book/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not add the book.");
      }

      toast.add({
        type: "success",
        title: "Book added successfully!",
        description: "Your book has been added to the library.",
      });
      setMessageType("success");
      setForm(book);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not add the book.",
      );
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="mx-auto my-16 max-w-xl px-4 text-center text-slate-600">
        Loading your account…
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div
          
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 w-full rounded-full border-slate-300 bg-white px-6 text-base text-slate-700 hover:bg-slate-100 sm:w-auto",
          )}
        >
          <Pencil data-icon="inline-start" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className={'min-w-xl'}>
        <DialogHeader>
          <DialogTitle>Edit books</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="mt-2 space-y-5">
              <h1 className="text-center text-2xl font-semibold text-[#2878a5]">
                Add a New Book
              </h1>

              <div className="space-y-1.5">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Book title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category || null}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value ?? "" })
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Write a short description of the book"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={500}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="user-name">Your Name</Label>
                <Input id="user-name" value={session.user.name} readOnly />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="user-email">Your Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={session.user.email}
                  readOnly
                />
              </div>

              {message && (
                <p
                  role={messageType === "error" ? "alert" : "status"}
                  className={`rounded-md p-3 text-sm ${
                    messageType === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  <Undo2 />
                  Cancel
                </Button>

                <Button type="submit" disabled={isSaving}>
                  <BookPlus data-icon="inline-start" />
                  {isSaving ? "Editing book…" : "Edit Book"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditBooksdialog;
