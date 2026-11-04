"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpenIcon } from "lucide-react";

import { BorrowTicket, type BorrowedBook } from "@/components/my-borrows/BorrowTicket";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BorrowList({ books }: { books: BorrowedBook[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#16202D] px-6 pt-8 pb-20 text-paper sm:px-10 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -left-12 size-72 animate-pulse rounded-full bg-amber/35 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[18%] -bottom-28 size-80 animate-pulse rounded-full bg-teal/45 blur-[120px] [animation-delay:1.2s]"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
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
              <span className="text-paper/85">My Borrows</span>
            </nav>

            <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-paper">
              Books You have <span className="text-amber italic">borrowed</span>
            </h1>

            <p className="mt-2 text-sm text-paper/65 sm:text-base">
              Keep track of your borrowed books and return them when you are done.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              render={<Link href="/books" />}
              className="h-11 rounded-full bg-amber px-6 text-sm font-semibold text-[#16202D] shadow-[0_14px_34px_-14px_rgba(232,163,61,0.95)] hover:bg-[#F2B157] hover:text-[#16202D]"
            >
              Browse More Books
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Tickets */}
      <section className="relative z-10 mt-12 flex flex-col gap-6">
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[28px] border border-[#E9E2D6] bg-white px-6 py-16 text-center shadow-[0_18px_45px_-30px_rgba(30,42,58,0.4)]">
            <span className="flex size-14 items-center justify-center rounded-full bg-[#F1EBDF] text-[#7A6A52]">
              <BookOpenIcon className="size-6" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              No borrowed books right now
            </h2>
            <p className="mt-1 max-w-sm text-sm text-[#6B7685]">
              Your reading list is empty. Find something lovely on the shelf and
              it will show up here.
            </p>
            <Button
              render={<Link href="/books" />}
              className="mt-6 h-10 rounded-full bg-amber px-5 text-sm font-semibold text-[#16202D] hover:bg-[#F2B157] hover:text-[#16202D]"
            >
              Browse Books
            </Button>
          </div>
        ) : (
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="flex flex-col gap-6"
          >
            {books.map((book) => (
              <BorrowTicket key={book._id} book={book} reduceMotion={reduceMotion} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default BorrowList;
