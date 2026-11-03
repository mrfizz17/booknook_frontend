

import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedArrival from "./AnimatedArrival";





export async function NewArrivals() {

  const res = await fetch("http://localhost:8000/api/new-arrival");
  const data = await res.json();

  console.log("New Book",data);

  return (
    <section
      id="new-arrivals"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">
            Fresh on the shelf
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-ink">
            New Arrivals
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The latest books added by our readers.
          </p>
        </div>
      </div>

      <AnimatedArrival books={data} />

      

      <div className="mt-12 flex justify-center">
        <Button
          className="h-10 rounded-full px-6"
        >
          See All Books
          <ArrowRightIcon />
        </Button>
      </div>
    </section>
  );
}

export default NewArrivals;
