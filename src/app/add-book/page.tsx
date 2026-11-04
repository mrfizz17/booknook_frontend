"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { AddBookForm } from "@/components/add-book/AddBookForm";

export default function AddBookPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="flex-1 pb-14">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <section className="relative overflow-hidden rounded-[32px] bg-dark text-paper">
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
            className="pointer-events-none absolute -top-24 -left-16 size-80 animate-pulse rounded-full bg-amber/25 blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -bottom-28 size-96 animate-pulse rounded-full bg-teal/30 blur-[120px] [animation-delay:1.2s]"
          />

          <div className="relative z-10 flex min-h-[300px] flex-col justify-end px-6 pt-15 pb-25 sm:px-10 sm:pb-20 lg:min-h-[200px] lg:px-14">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs font-medium text-paper/55 sm:text-sm"
              >
                <Link
                  href="/"
                  className="transition-colors hover:text-paper"
                >
                  Home
                </Link>
                <span aria-hidden className="text-paper/30">
                  /
                </span>
                <span className="text-paper/85">Add Book</span>
              </nav>

              <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-paper sm:text-5xl lg:text-6xl">
                Add a book to the{" "}
                <span className="text-amber italic">shelf</span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/65 sm:text-base">
                Share a book you love. It only takes a minute and helps another
                reader find their next story.
              </p>
            </motion.div>
          </div>
        </section>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 mx-auto -mt-[45px] w-full max-w-[820px] rounded-[32px] border border-border bg-card p-6 shadow-[0_30px_80px_-32px_rgba(30,42,58,0.35)] sm:p-11"
        >
          <AddBookForm />
        </motion.div>
      </div>
    </main>
  );
}
