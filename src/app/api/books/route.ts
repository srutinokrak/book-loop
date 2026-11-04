import { NextResponse } from "next/server";
import { auth, db } from "@/lib/auth";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ message: "Please log in to add a book." }, { status: 401 });
  }

  const body: unknown = await request.json();
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid book details." }, { status: 400 });
  }

  const { title, author, category, image, description, totalCopies } = body as Record<string, unknown>;
  if (
    typeof title !== "string" || !title.trim() ||
    typeof author !== "string" || !author.trim() ||
    typeof category !== "string" || !categories.includes(category) ||
    typeof image !== "string" || !image.trim() ||
    typeof description !== "string" || !description.trim()
  ) {
    return NextResponse.json({ message: "Please complete all book fields." }, { status: 400 });
  }

  const copies = totalCopies === undefined ? 1 : totalCopies;
  if (typeof copies !== "number" || !Number.isInteger(copies) || copies < 1) {
    return NextResponse.json({ message: "Total copies must be a whole number of at least 1." }, { status: 400 });
  }

  const result = await db.collection("books").insertOne({
    title: title.trim(),
    author: author.trim(),
    category,
    image: image.trim(),
    description: description.trim(),
    totalCopies: copies,
    availableCopies: copies,
    userName: session.user.name,
    userEmail: session.user.email,
    addedAt: new Date(),
  });

  return NextResponse.json({ id: result.insertedId.toString(), message: "Book added successfully." }, { status: 201 });
}
