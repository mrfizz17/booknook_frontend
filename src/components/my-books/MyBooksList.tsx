"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpenIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";
import { EditDialog } from "../DialogOpen/EditDialog";
import { DeleteDialog } from "../DialogOpen/DeleteDialog";

const EASE = [0.22, 1, 0.36, 1] as const;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatAddedOn(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

function BookCover({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-[72px] w-[52px] shrink-0 items-center justify-center rounded-lg bg-[#F1EBDF] text-[#7A6A52]">
        <BookOpenIcon className="size-5" strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <div className="h-[72px] w-[52px] shrink-0 overflow-hidden rounded-lg bg-[#F1EBDF] shadow-[0_10px_18px_-8px_rgba(30,42,58,0.55)] ring-1 ring-black/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export function MyBooksList({ books }: { books: Book[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#16202D] px-6 pt-9 pb-20 text-paper sm:px-10 lg:px-14">
        {/* dotted texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -left-12 size-72 animate-pulse rounded-full bg-amber/35 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[18%] -bottom-28 size-80 animate-pulse rounded-full bg-teal/45 blur-[120px] [animation-delay:1.2s]"
        />

        <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="min-w-0"
          >
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-medium text-paper/55 sm:text-sm"
            >
              <Link href="/" className="transition-colors hover:text-paper">
                Home
              </Link>
              <span aria-hidden className="text-paper/30">
                /
              </span>
              <span className="text-paper/85">My Books</span>
            </nav>

            <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-paper">
              Books I have <span className="text-amber italic">shared</span>
            </h1>

            <p className="mt-3 text-sm text-paper/65 sm:text-base">
              Manage the books you added to the community shelf.
            </p>
          </motion.div>

          <div className="shrink-0">
            <Link href={"/add-book"}>
              <Button className="group relative h-11 overflow-hidden rounded-full bg-amber px-6 text-sm font-semibold text-[#16202D] shadow-[0_14px_34px_-14px_rgba(232,163,61,0.95)] transition-transform hover:bg-[#F2B157] hover:text-[#16202D]">
                <PlusIcon className="size-4" strokeWidth={2.4} />
                Add New Book
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-shine bg-linear-to-r from-transparent via-white/45 to-transparent"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* List card */}
      <section className="relative z-10 mx-auto -mt-12 w-full max-w-[1200px] rounded-[32px] border border-[#E9E2D6] bg-white p-5 shadow-[0_36px_90px_-40px_rgba(30,42,58,0.38)] sm:p-8">
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-[#F1EBDF] text-[#7A6A52]">
              <BookOpenIcon className="size-6" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              No books on your shelf yet
            </h2>
            <p className="mt-1 max-w-sm text-sm text-[#6B7685]">
              Share a book you love and it will show up here for the whole
              neighborhood to discover.
            </p>
            <Button
              render={<Link href="/add-book" />}
              className="mt-6 h-10 rounded-full bg-amber px-5 text-sm font-semibold text-[#16202D] hover:bg-[#F2B157] hover:text-[#16202D]"
            >
              <PlusIcon className="size-4" strokeWidth={2.4} />
              Add Book
            </Button>
          </div>
        ) : (
          <>
            {/* header */}
            <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-10 px-3 pb-4 md:grid">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#8A94A3] uppercase">
                Book
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#8A94A3] uppercase">
                Category
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#8A94A3] uppercase">
                Added on
              </span>
              <span className="text-right text-[11px] font-semibold tracking-[0.18em] text-[#8A94A3] uppercase">
                Actions
              </span>
            </div>

            <motion.ul
              variants={listVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              className="mt-1 flex flex-col gap-5"
            >
              {books.map((book) => (
                <motion.li key={book._id} variants={rowVariants}>
                  <Link href={`/books/${book._id}`}>
                    <div className="grid grid-cols-1 gap-4 border rounded-2xl px-3 py-4 transition-all duration-300 hover:translate-x-1.5 hover:bg-[#FBF4E6] md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-6">
                      {/* book */}
                      <div className="flex min-w-0 items-center gap-4">
                        <BookCover book={book} />
                        <div className="min-w-0">
                          <h3 className="truncate font-heading text-base font-semibold text-ink sm:text-lg">
                            {book.title}
                          </h3>
                          <p className="mt-0.5 truncate text-xs text-[#6B7685]">
                            by {book.author}
                          </p>
                        </div>
                      </div>

                      {/* category */}
                      <div>
                        <Badge
                          variant="secondary"
                          className="rounded-full bg-[#FBE9C6] px-3 py-1 text-xs font-medium text-[#7A4F0C]"
                        >
                          {book.category}
                        </Badge>
                      </div>

                      {/* added on */}
                      <div className="text-sm text-[#5A6675]">
                        <span className="md:hidden">Added </span>
                        {book.addedAt}
                      </div>

                      {/* actions */}
                      <div className="flex items-center justify-start gap-2 md:justify-end">
                        <EditDialog book={book} />
                        <DeleteDialog book={book} />
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </section>
    </div>
  );
}

export default MyBooksList;
