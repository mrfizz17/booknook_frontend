import type { Metadata } from "next";

import { MyBooksList } from "@/components/my-books/MyBooksList";
import type { Book } from "@/types/book";

export const metadata: Metadata = {
  title: "My Books — BookNook",
  description: "Manage the books you have shared with the BookNook community.",
};

// TODO: replace with backend data once the API is wired up.
const mockBooks: Book[] = [
  {
    _id: "bk_001",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classic",
    image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    description:
      "Elizabeth Bennet navigates love, family, and first impressions in Regency England.",
    addedAt: "2026-10-28",
  },
  {
    _id: "bk_002",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    description:
      "Jay Gatsby chases an impossible dream through the glittering world of the Jazz Age.",
    addedAt: "2026-10-20",
  },
  {
    _id: "bk_003",
    title: "Dracula",
    author: "Bram Stoker",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg",
    description:
      "A young solicitor discovers the terrifying secret of Count Dracula's Transylvanian castle.",
    addedAt: "2026-10-12",
  },
  {
    _id: "bk_004",
    title: "Little Women",
    author: "Louisa May Alcott",
    category: "Kids",
    image: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg",
    description:
      "Four sisters grow up together, finding their own paths through love and loss.",
    addedAt: "2026-10-02",
  },
  {
    _id: "bk_005",
    title: "Moby-Dick",
    author: "Herman Melville",
    category: "History",
    image: "https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg",
    description:
      "Captain Ahab leads his crew on an obsessive hunt for the great white whale.",
    addedAt: "2026-09-25",
  },
];

export default function MyBooksPage() {
  return (
    <main className="flex-1 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <MyBooksList books={mockBooks} />
      </div>
    </main>
  );
}
