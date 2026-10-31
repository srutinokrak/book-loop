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

  const { title, author, category, image, description } = body as Record<string, unknown>;
  if (
    typeof title !== "string" || !title.trim() ||
    typeof author !== "string" || !author.trim() ||
    typeof category !== "string" || !categories.includes(category) ||
    typeof image !== "string" || !image.trim() ||
    typeof description !== "string" || !description.trim()
  ) {
    return NextResponse.json({ message: "Please complete all book fields." }, { status: 400 });
  }

  const result = await db.collection("books").insertOne({
    title: title.trim(),
    author: author.trim(),
    category,
    image: image.trim(),
    description: description.trim(),
    userName: session.user.name,
    userEmail: session.user.email,
    addedAt: new Date(),
  });

  return NextResponse.json({ id: result.insertedId.toString(), message: "Book added successfully." }, { status: 201 });
}
