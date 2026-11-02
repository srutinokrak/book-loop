"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage("");
    setIsUploading(true);
    const data = new FormData();
    data.set("image", file);

    try {
      const response = await fetch("/api/books/upload", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Image upload failed.");
      setImageUrl(result.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
      setMessageType("error");
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSaving(true);

   const res = await fetch("http://localhost:8000/books/add",{
    method: 'POST',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify(form)
   })

   const data = await res.json()
   console.log(data);


    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          author: formData.get("author"),
          category: formData.get("category"),
          image: imageUrl,
          description: formData.get("description"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not add the book.");
      setMessage("Book added successfully!");
      setMessageType("success");
      form.reset();
      setImageUrl("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add the book.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  }

  if (isPending || !session) {
    return <div className="mx-auto my-16 max-w-xl px-4 text-center text-slate-600">Loading your account…</div>;
  }




  return (
    <div className="mx-auto my-10 w-full max-w-2xl px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#2878a5]">Add a New Book</CardTitle>
          <FieldDescription>Share a book with the BookNook community.</FieldDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Book Title</FieldLabel>
                <Input id="title" name="title" placeholder="Book title" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="author">Author Name</FieldLabel>
                <Input id="author" name="author" placeholder="Author name" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select id="category" name="category" required defaultValue="" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="book-image">Book Image</FieldLabel>
                {/* <Input id="book-image" type="file" accept="image/*" onChange={handleImageChange} disabled={isUploading || isSaving} required={!imageUrl} />
                <FieldDescription>
                  {isUploading ? "Uploading image…" : imageUrl ? "Image uploaded successfully." : "Choose an image (up to 10 MB); it will be uploaded to ImgBB."}
                </FieldDescription> */}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Short Description</FieldLabel>
                <Textarea id="description" name="description" placeholder="A few words about this book" maxLength={500} required />
              </Field>

              <Field>
                <FieldLabel htmlFor="user-name">Your Name</FieldLabel>
                <Input id="user-name" value={session.user.name} readOnly />
              </Field>

              <Field>
                <FieldLabel htmlFor="user-email">Your Email</FieldLabel>
                <Input id="user-email" type="email" value={session.user.email} readOnly />
              </Field>

              {/* {message && (
                <p role={messageType === "error" ? "alert" : "status"} className={`rounded-md p-3 text-sm ${messageType === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                  {message}
                </p>
              )} */}

              <Button type="submit" disabled={isSaving || isUploading || !imageUrl} className="bg-[#2878a5]">
                {isSaving ? "Adding book…" : "Add Book"}
              </Button>
              <FieldDescription className="text-center"><Link href="/books" className="underline">Back to books</Link></FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
