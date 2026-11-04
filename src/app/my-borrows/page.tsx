import type { Metadata } from "next";

import { BorrowList } from "@/components/my-borrows/BorrowList";
import type { BorrowedBook } from "@/components/my-borrows/BorrowTicket";

export const metadata: Metadata = {
  title: "My Borrows — BookNook",
  description: "Keep track of the books you have borrowed from BookNook.",
};

// TODO: replace with backend data once the borrows API is wired up.
const borrowedBooks: BorrowedBook[] = [
  {
    _id: "bk_002",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    _id: "bk_003",
    title: "Dracula",
    author: "Bram Stoker",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg",
  },
  {
    _id: "bk_004",
    title: "Little Women",
    author: "Louisa May Alcott",
    category: "Kids",
    image: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg",
  },
  {
    _id: "bk_005",
    title: "Moby-Dick",
    author: "Herman Melville",
    category: "History",
    image: "https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg",
  },
];

export default function MyBorrowsPage() {
  return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <BorrowList books={borrowedBooks} />
      </div>
    </main>
  );
}
