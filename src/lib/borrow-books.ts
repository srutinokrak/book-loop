"use server"
import { getTokenServer } from "./getTokenserver";
import { addDays } from "date-fns";

const BACKEND_URL = `${process.env.BOOKS_API_BASE}` ;

type Props = {
  book: {
    _id: string;
    title: string;
    image: string;
  };
};
export const makeBorrowBook=async (book: Props['book'],email: string)=>{
    
     
    const token = await getTokenServer();
    const borrowedOn = new Date();
          const dueOn = addDays(borrowedOn, 14);
      const response = await fetch(`${BACKEND_URL}/borrows`, {
        method: "POST",
        headers: {
           authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: email,
          borrowDate: borrowedOn.toISOString(),
          returnDate: dueOn.toISOString(),
        }),
      });

      const result = await response.json()
      return result
}