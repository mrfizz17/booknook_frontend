import type { Metadata } from "next";

import { BorrowList } from "@/components/my-borrows/BorrowList";
import { getCurrentTime } from "@/lib/borrow-dates";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { BookOpenIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "My Borrows — BookNook",
  description: "Keep track of the books you have borrowed from BookNook.",
};



export default async function MyBorrowsPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  const token = jwtToken?.token;
 
  const email = session?.user.email;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-borrowed/${email}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  const borrowedBooks = await res.json();
  const now = getCurrentTime();

  if (!res.ok) {
    return(
      <>
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-tint text-tint-foreground">
              <BookOpenIcon className="size-6" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
              {borrowedBooks.msg}
            </h2>
          
           
          </div>
      </>
    )
  }else{
    return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <BorrowList books={borrowedBooks} now={now} />
      </div>
    </main>
  );
  }


  
}
