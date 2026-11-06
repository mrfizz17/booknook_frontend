import type { Metadata } from "next";

import { MyBooksList } from "@/components/my-books/MyBooksList";
import type { Book } from "@/types/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "My Books — BookNook",
  description: "Manage the books you have shared with the BookNook community.",
};

// TODO: replace with backend data once the API is wired up.


export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  // console.log(email);

  const res = await fetch(`http://localhost:8000/api/my-books/${email}`);
  const books = await res.json();

  // console.log(books);
  return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <MyBooksList books={books} />
      </div>
    </main>
  );
}
