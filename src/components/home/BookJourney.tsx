"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRightIcon,
  BookOpenCheckIcon,
  BookPlusIcon,
  Repeat2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Shelf it",
    description:
      "Finished a book? Add it to your shelf in under a minute and give it a new address.",
    label: "Add a book",
    icon: BookPlusIcon,
  },
  {
    number: "02",
    title: "Discover it",
    description:
      "A neighbor browses the shelf, falls for a cover, and takes your book home for a while.",
    label: "Browse books",
    icon: BookOpenCheckIcon,
  },
  {
    number: "03",
    title: "Pass it on",
    description:
      "The book comes back with new stories attached, ready for the next reader in line.",
    label: "Keep it moving",
    icon: Repeat2Icon,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function BookJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-borrowing-works" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">
              <span className="h-px w-8 bg-terracotta" />
              The BookNook way
            </p>
            <h2 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              A good book never{" "}
              <span className="text-terracotta italic">sits still.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/65">
              Three small steps between your shelf and someone else&apos;s
              favorite memory.
            </p>
          </div>

          <div
            aria-hidden
            className="hidden rotate-3 rounded-xl border border-ink/10 bg-paper px-5 py-4 shadow-sm lg:block"
          >
            <p className="font-heading text-lg font-semibold text-ink">
              Library card No. 001
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-teal uppercase">
              Free to borrow · always
            </p>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={reduceMotion ? undefined : containerVariants}
          className="relative mt-12 grid gap-6 md:grid-cols-3"
        >
          <div
            aria-hidden
            className="absolute top-12 right-[16%] left-[16%] hidden border-t-2 border-dashed border-amber/60 md:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                variants={reduceMotion ? undefined : cardVariants}
                className="relative z-10 rounded-3xl border border-ink/10 bg-paper p-6 shadow-[0_18px_40px_-28px_rgba(22,32,45,0.6)] sm:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1 right-5 font-heading text-6xl font-semibold text-amber/25"
                >
                  {step.number}
                </span>
                <span
                  aria-hidden
                  className="absolute top-[42px] left-1/2 hidden size-3 -translate-x-1/2 rounded-full bg-amber ring-4 ring-cream md:block"
                />

                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-dark text-amber shadow-md">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {step.description}
                </p>
                <p className="mt-6 border-t border-dashed border-ink/15 pt-4 text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
                  {step.label}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-semibold tracking-[0.18em] text-ink/60 uppercase">
            <span>No cost</span>
            <span className="text-amber">✦</span>
            <span>No forms</span>
            <span className="text-amber">✦</span>
            <span>Just neighbors</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/add-book">
              <Button className="h-10 rounded-full px-6">
                Share a book
                <ArrowUpRightIcon />
              </Button>
            </Link>
            <Link href="/all-books">
              <Button
                variant="outline"
                className="h-10 rounded-full border-ink/20 bg-transparent px-6 text-ink hover:bg-paper hover:text-ink"
              >
                Browse the shelf
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookJourney;
