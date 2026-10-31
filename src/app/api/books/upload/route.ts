import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ message: "Please log in to upload a book image." }, { status: 401 });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "Add your IMGBB_API_KEY to the .env file to enable image uploads." }, { status: 503 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
  }
  if (image.size > 10 * 1024 * 1024) {
    return NextResponse.json({ message: "Image must be smaller than 10 MB." }, { status: 400 });
  }

  const uploadData = new FormData();
  uploadData.set("image", image);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body: uploadData,
  });
  const result = await response.json();
  if (!response.ok || !result.success || typeof result.data?.url !== "string") {
    return NextResponse.json({ message: "Image upload failed. Please try another image." }, { status: 502 });
  }

  return NextResponse.json({ url: result.data.url });
}
