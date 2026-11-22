"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HeartHandshakeIcon,
  QuoteIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";
import { cn } from "cn";

const notes = [
  {
    quote:
      "I came for one book and left with three. There's something lovely about a shelf that belongs to everybody.",
    name: "Maya R.",
    initials: "MR",
    role: "Neighborhood reader",
    tilt: "-rotate-2",
    avatar: "from-terracotta to-amber",
  },
  {
    quote:
      "The copy I borrowed had a note tucked inside from someone who'd read it ten years ago. That never gets old.",
    name: "Daniel K.",
    initials: "DK",
    role: "Borrower & book lover",
    tilt: "rotate-1",
    avatar: "from-teal to-ink",
  },
  {
    quote:
      "My shelves finally have room again, and the books I loved are out in the world meeting new people.",
    name: "Priya S.",
    initials: "PS",
    role: "Shares a book most weeks",
    tilt: "-rotate-1",
    avatar: "from-amber to-terracotta",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const noteVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ReaderNotes() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-dark px-6 py-14 text-paper sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-28 left-1/3 size-72 rounded-full bg-teal/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full bg-terracotta/20 blur-3xl"
          />

          <div
            aria-hidden
            className="absolute top-8 right-8 hidden size-32 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-amber/40 text-center lg:flex"
          >
            <p className="text-[10px] leading-relaxed font-semibold tracking-[0.15em] text-amber/80 uppercase">
              Read · Shared
              <br />· Loved
            </p>
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber uppercase">
              <SparklesIcon className="size-3.5" />
              From our readers
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Notes from the <span className="text-amber italic">margins</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              Little notes left by neighbors after the last page.
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reduceMotion ? undefined : containerVariants}
            className="relative z-10 mt-12 grid gap-6 md:grid-cols-3"
          >
            {notes.map((note) => (
              <motion.figure
                key={note.name}
                variants={reduceMotion ? undefined : noteVariants}
                className={cn(
                  "relative rounded-2xl bg-paper/[0.06] p-6 ring-1 ring-paper/10 transition-transform duration-300 hover:rotate-0 sm:p-7",
                  note.tilt,
                )}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-8 h-6 w-16 -rotate-3 rounded-sm bg-amber/80 shadow-sm"
                />
                <QuoteIcon className="size-7 text-amber/70" />

                <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className="size-3.5 fill-amber text-amber"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-paper/85 sm:text-base">
                  “{note.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-paper/10 pt-5">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-xs font-semibold text-dark",
                      note.avatar,
                    )}
                  >
                    {note.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-paper">
                      {note.name}
                    </span>
                    <span className="block text-xs text-paper/50">
                      {note.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <p className="relative z-10 mt-12 flex items-center justify-center gap-2 text-center text-[11px] font-semibold tracking-[0.18em] text-paper/50 uppercase">
            <HeartHandshakeIcon className="size-4 text-amber" />
            Every story gets a second chapter.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReaderNotes;
