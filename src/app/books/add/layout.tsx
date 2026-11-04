import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookLayout({ children }: { children: ReactNode }) {
  return children;
}
