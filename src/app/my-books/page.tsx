import type { Metadata } from "next";

import { MyBooksList } from "@/components/my-books/MyBooksList";
import type { Book } from "@/types/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import { BookOpenIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "My Books — BookNook",
  description: "Manage the books you have shared with the BookNook community.",
};

// TODO: replace with backend data once the API is wired up.

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwtToken?.token;

  const email = session?.user?.email;
  // console.log(email);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/my-books/${email}`,
    {
      headers:{
        authorization: `Bearer ${token}`
      }
    },
  );
  const books = await res.json();
  

  if (!res.ok) {
    return(
      <>
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-[#F1EBDF] text-[#7A6A52]">
              <BookOpenIcon className="size-6" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              {books.msg}
            </h2>
          
           
          </div>
      </>
    )
  } else {
    // const books: Book[] = await res.json();

    return (
      <main className="flex-1 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
          <MyBooksList books={books} />
        </div>
      </main>
    );
  }
}
