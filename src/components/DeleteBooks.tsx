"use client"
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


import {  buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "cn";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/toast";

const DeleteBooks = ({id}:{id: string}) => {

  const handleDeletebooks = async() =>{
   const res = await  fetch(`http://localhost:8000/book/${id}`,{
    method: "DELETE",
    // headers : {
    //   auth
    // }
   })
   const data = await res.json()
   console.log(data);
 if (!res.ok) {
  throw new Error("Delete failed");
}

toast.add({
  type: "success",
  title: "Deleted",
  description: "Book deleted successfully.",
});

   redirect('/books')
  }


  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger render={<button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "lg" }),
                    "h-12 w-full rounded-full px-6 text-base sm:w-auto",
                  )}
                >
                  <Trash2 data-icon="inline-start" />
                  Delete
                </button>}>
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletebooks}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteBooks;
