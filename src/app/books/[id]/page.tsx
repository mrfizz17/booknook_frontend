import Link from "next/link";
import { BookDetailsCard } from "@/components/books/BookDetailsCard";
import type { Book } from "@/types/book";


interface Iparams {
  params : {
    id:string
  }
}

export default async function BookDetailsPage({params}:Iparams) {

  const {id} = await params;
 
  const res = await fetch(`http://localhost:8000/api/all-books/${id}`);
  const book:Book= await res.json();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 pb-24 sm:px-6">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#16202D] text-paper">
        {/* Dotted background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 size-80 rounded-full bg-amber/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-32 size-96 rounded-full bg-teal/40 blur-3xl"
        />

        {/* Banner text */}
        <div
          // initial={{ opacity: 0, y: 16 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 px-6 pt-9 pb-24 sm:px-10"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-paper/60"
          >
            <Link href="/" className="transition-colors hover:text-amber">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/all-books"
              className="transition-colors hover:text-amber"
            >
              All Books
            </Link>
            <span aria-hidden>/</span>
            <span className="text-paper/85">{book.title}</span>
          </nav>

          <h1 className="mt-4 font-heading text-4xl leading-tight font-semibold tracking-tight text-white">
            Book <span className="text-amber italic">details</span>
          </h1>
          <p className="mt-2 text-sm text-paper/65 sm:text-base">
            Everything you need to know before you borrow.
          </p>
        </div>
      </section>

      {/* Details card */}
      <div
        // initial={{ opacity: 0, y: 24 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 -mt-12"
      >
        <BookDetailsCard book={book} />
      </div>
    </main>
  );
}
