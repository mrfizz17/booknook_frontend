"use client";

import { BookOpenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";


export function BorrowButton({book}:{book:Book}) {

  const router =  useRouter();

  const session = useSession();

  const BorrowedUserEmail = session?.data?.user.email;
  const BorrowedUserName = session?.data?.user.name;

  const handleBorrow=async  ()=>{
    const id = book._id;
    const {_id,count,userEmail,userName,...updateData} ={...book,BorrowedUserEmail:BorrowedUserEmail,BorrowedUserName:BorrowedUserName,OldId:id} ;
    


    console.log(updateData)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-books/borrow/${id}`,{
      method:"POST",
      headers:{
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(updateData)
    });

    const data =await res.json();
    toast.success(data.msg)
    router.refresh()
    
  }

  return (
    <Button
      type="button"
      onClick={handleBorrow}
      disabled={book.count===0}
      className="group relative min-h-14 flex-1 overflow-hidden rounded-full bg-amber text-base font-bold text-ink shadow-[0_16px_30px_-14px_rgba(232,163,61,0.9)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-4 focus-visible:ring-amber/30"
    >
      {/* Shine sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-[300%]"
      />

      {/* Button label */}
      <span className="relative z-10 inline-flex items-center gap-2">
        <BookOpenIcon className="size-5" />
        Borrow Book
      </span>
    </Button>
  );
}

export default BorrowButton;
