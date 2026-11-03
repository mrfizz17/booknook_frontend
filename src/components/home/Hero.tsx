"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { Button } from "@/components/ui/button";
import { cn } from "cn";

const slides = [
  {
    eyebrow: "New books added every week",
    lead: "Share stories.",
    accent: "Borrow your next favorite read.",
    description:
      "Lend the books you have finished and borrow the ones you have been waiting for, all from readers in your community.",
  },
  {
    eyebrow: "Loved by local readers",
    lead: "Find your next",
    accent: "unforgettable story.",
    description:
      "From dog-eared classics to fresh sci-fi, every shelf here belongs to a neighbor who would love to pass it on.",
  },
  {
    eyebrow: "Give a book a second life",
    lead: "Pass it on.",
    accent: "Keep stories in motion.",
    description:
      "Add a finished book in under a minute, meet the next reader, and watch your shelf travel further than you thought.",
  },
];

type CoverProps = {
  title: string;
  author: string;
  from: string;
  to: string;
};

const covers: Array<CoverProps & {
  className: string;
  rotate: number;
  delay: number;
  duration: number;
}> = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    from: "#d7644b",
    to: "#a83e2c",
    className: "left-[10%] top-[36%] w-24 xl:w-35",
    rotate: -9,
    delay: 0,
    duration: 6,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    from: "#367c7d",
    to: "#1f5658",
    className: "left-[34%] top-[20%] w-28 xl:w-40",
    rotate: 3,
    delay: 0.6,
    duration: 7,
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    from: "#eab04a",
    to: "#c98a25",
    className: "left-[60%] top-[30%] w-32 xl:w-48",
    rotate: 8,
    delay: 1.2,
    duration: 6.5,
  },
];

function BookCover({ cover }: { cover: (typeof covers)[number] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", cover.className)}
      initial={{ rotate: cover.rotate }}
      animate={
        reduceMotion
          ? { rotate: cover.rotate }
          : {
              y: [0, -14, 0],
              rotate: [cover.rotate, cover.rotate + 2.5, cover.rotate],
            }
      }
      transition={{
        duration: cover.duration,
        delay: cover.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-l-sm rounded-r-md shadow-[0_24px_40px_-16px_rgba(0,0,0,0.65)] ring-1 ring-black/20"
        style={{
          backgroundImage: `linear-gradient(145deg, ${cover.from}, ${cover.to})`,
        }}
      >
        <span className="absolute inset-y-0 left-0 w-[7px] bg-black/20" />
        <span className="absolute inset-y-0 left-[7px] w-px bg-white/20" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.22),transparent_55%)]" />
        <span className="absolute inset-x-2 top-3 h-px bg-white/30" />
        <span className="absolute inset-x-2 bottom-3 h-px bg-white/20" />
        <div className="relative flex h-full flex-col justify-center gap-1 px-3 pl-4 text-center">
          <p className="font-heading text-sm leading-tight font-semibold text-white/95 xl:text-base">
            {cover.title}
          </p>
          <p className="text-[9px] tracking-wide text-white/65 uppercase">
            {cover.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 mb-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-dark text-paper">
        {/* dotted texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,248,243,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[8%] size-72 rounded-full bg-amber/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-[12%] size-80 rounded-full bg-teal/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-1/3 size-56 rounded-full bg-terracotta/20 blur-3xl"
        />

        {/* floating books */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
        >
          {covers.map((cover) => (
            <BookCover key={cover.title} cover={cover} />
          ))}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute top-[76%] left-[62%] rounded-full bg-paper px-3 py-1 text-[11px] font-medium text-ink shadow-sm"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-teal align-middle" />
            Free to borrow
          </motion.span>
        </div>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={900}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="relative z-10"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.lead}>
              <div className="flex min-h-[480px] flex-col justify-center px-6 pt-10 pb-24 sm:px-10 lg:min-h-[520px] lg:px-14 lg:pr-[46%]">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-3 py-1 text-xs font-medium text-paper/70">
                  <span className="size-1.5 rounded-full bg-amber" />
                  {slide.eyebrow}
                </span>

                <h1 className="mt-5 max-w-xl font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.lead}{" "}
                  <span className="text-amber italic">{slide.accent}</span>
                </h1>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/65 sm:text-base">
                  {slide.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button
                    className="h-10 rounded-full px-5 text-sm"
                    render={<Link href="/books" />}
                  >
                    Browse Books
                    <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* controls */}
        <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between sm:inset-x-10 lg:inset-x-14">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.lead}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-7 bg-amber"
                    : "w-4 bg-paper/25 hover:bg-paper/50"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex size-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <ArrowLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex size-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
