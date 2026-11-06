
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import React from "react";

const loading = () => {
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

          <div className="relative z-10 w-full flex min-h-[400px] flex-col justify-center px-6 pt-15 pb-25 sm:px-10 sm:pb-20 lg:min-h-[500px] lg:px-14">
            <div className="max-w-full flex justify-center items-center gap-5 text-4xl text-amber font-semibold">
              
                <Spinner data-icon="inline-start" className="size-8" />
                Please wait
              
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default loading;
