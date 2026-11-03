"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { BookPlus, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const initialForm = {
  title: "",
  author: "",
  category: "",
  imageUrl: "",
  description: "",
};

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
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

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          category: form.category,
          image: form.imageUrl,
          description: form.description,
        }),
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
      setForm(initialForm);
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
    <Card className="mx-auto my-10 w-full max-w-2xl">
      <CardContent>
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
              value={form.imageUrl}
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
              {isSaving ? "Adding book…" : "Add Book"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
