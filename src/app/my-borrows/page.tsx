import type { Metadata } from "next";

import { BorrowList } from "@/components/my-borrows/BorrowList";
import type { BorrowedBook } from "@/components/my-borrows/BorrowTicket";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "My Borrows — BookNook",
  description: "Keep track of the books you have borrowed from BookNook.",
};



export default async function MyBorrowsPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const email = session?.user.email;

  const res = await fetch(`http:localhost:8000/api/my-borrowed/${email}`)
  const borrowedBooks = await res.json();


  return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <BorrowList books={borrowedBooks} />
      </div>
    </main>
  );
}
