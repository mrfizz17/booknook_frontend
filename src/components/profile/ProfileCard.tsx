"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDaysIcon, MailIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatJoined(value: string | null) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

type ProfileCardProps = {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string | null;
};

export function ProfileCard({
  name,
  email,
  image,
  createdAt,
}: ProfileCardProps) {
  const reduceMotion = useReducedMotion();


  
  const joined = formatJoined(createdAt);

   const profilePicOrChar = (image) ? (
      <Image
        src={image}
        alt="Profile picture"
        className="rounded-full object-cover h-full w-full"
        height={400}
        width={400}
      />
    ) : (
      <p className="text-8xl text-amber-400">{name?.charAt(0).toUpperCase() || 'U'}</p>
    )
   

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#16202D] px-6 pt-9 pb-36 text-paper sm:px-10 lg:px-14">
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

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10"
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
            <span className="text-paper/85">My Profile</span>
          </nav>

          <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-paper">
            A reader in the <span className="text-amber italic">nook</span>
          </h1>

          <p className="mt-3 max-w-md text-sm text-paper/65 sm:text-base">
            The face behind the books you share and borrow.
          </p>
        </motion.div>
      </section>

      {/* Profile card */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="relative z-10 mx-auto -mt-16 w-full max-w-[640px] rounded-[32px] border border-[#E9E2D6] bg-white px-6 pt-0 pb-10 text-center shadow-[0_36px_90px_-40px_rgba(30,42,58,0.38)] sm:px-10"
      >
        {/* Avatar */}
        <div className="mx-auto -mt-16 flex size-40 items-center justify-center rounded-full bg-[#F1EBDF] p-1.5 ring-8 ring-white sm:size-44">
          <div className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-[#F1EBDF] ring-1 ring-black/5">
            {/* {showImage ? (
              <Image
                src={image as string}
                alt={name ? `${name}'s profile picture` : "Profile picture"}
                width={176}
                height={176}
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
                priority
              />
            ) : (
              <span
                aria-label={name ? `${name}'s initial` : "User initial"}
                className="font-heading text-6xl font-semibold text-[#B67A22] sm:text-7xl"
              >
                {initial}
              </span>
            )} */}

            {profilePicOrChar}
          </div>
        </div>

        <span className="mt-6 inline-flex items-center rounded-full bg-[#FBE9C6] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#7A4F0C] uppercase">
          BookNook Member
        </span>

        <h2 className="mt-4 wrap-break-word font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {name || "Unnamed reader"}
        </h2>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-[#E9E2D6] pt-6">
          <p className="flex max-w-full items-center gap-2.5 text-sm text-[#5A6675]">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1EBDF] text-[#7A6A52]">
              <MailIcon className="size-4" strokeWidth={1.8} />
            </span>
            <span className="truncate">{email}</span>
          </p>

          {joined ? (
            <p className="flex items-center gap-2.5 text-sm text-[#5A6675]">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1EBDF] text-[#7A6A52]">
                <CalendarDaysIcon className="size-4" strokeWidth={1.8} />
              </span>
              <span>
                Joined on <span className="font-medium text-ink">{joined}</span>
              </span>
            </p>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}

export default ProfileCard;
