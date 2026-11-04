"use client";

import { BookOpenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BorrowButton() {
  return (
    <Button
      type="button"
      onClick={() => console.log("Borrow Book clicked")}
      className="group relative h-14 flex-1 overflow-hidden rounded-full bg-amber text-base font-bold text-ink shadow-[0_16px_30px_-14px_rgba(232,163,61,0.9)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-4 focus-visible:ring-amber/30"
    >
      {/* Shine sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-[300%]"
      />

      {/* Button label */}
      <span className="relative z-10 inline-flex items-center gap-2">
        <BookOpenIcon className="size-5" />
        Borrow Book
      </span>
    </Button>
  );
}

export default BorrowButton;
