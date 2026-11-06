import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BorrowButton } from "@/components/books/BorrowButton";
import type { Book } from "@/types/book";
import { format } from "date-fns";

export function BookDetailsCard({ book }: { book: Book }) {
  console.log(book)
  const userName = book.userName || "BookNook Reader";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    const addedDate = format(book.addedAt,"d MMMM yyyy");







  return (
    <Card className="mx-auto w-full max-w-[1200px] rounded-[32px] border border-[#E9E2D6] bg-white p-7 shadow-[0_30px_80px_-40px_rgba(30,42,58,0.35)] ring-0">
      <div className="grid gap-7 md:grid-cols-[400px_1fr]">
        {/* Book cover */}
        <div className="flex min-h-[500px] items-center justify-center rounded-3xl bg-[#F1EBDF] p-6">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              width={320}
              height={320}
              className=" w-70 rounded-r-2xl object-cover shadow-xl"
            />
          ) : (
            <div className="flex aspect-[3/4] w-60 items-center justify-center rounded-r-2xl bg-[#F1EBDF] text-muted-foreground shadow-xl">
              <BookOpenIcon className="size-12" />
            </div>
          )}
        </div>

        {/* Book information */}
        <div className="flex flex-col">
          <Badge className="h-auto w-fit bg-[#FBE9C6] px-3 py-1 text-xs font-medium text-[#7A4F0C]">
            {book.category}
          </Badge>

          <h1 className="mt-4 font-heading text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            by {book.author}
          </p>

          <Separator className="my-6 bg-[#E9E2D6]" />

          {/* About this book */}
          <p className="text-xs font-semibold tracking-[0.18em] text-[#B7791F] uppercase">
            About this book
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          {/* Info tiles */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#E9E2D6] bg-[#FBF8F3] p-4">
              <Avatar>
                <AvatarFallback className="bg-teal font-semibold text-paper">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Added by
                </p>
                <p className="text-sm font-semibold text-ink">{userName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#E9E2D6] bg-[#FBF8F3] p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#FBE9C6] text-[#7A4F0C]">
                <CalendarIcon className="size-4" />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Added on
                </p>
                <p className="text-sm font-semibold text-ink">{addedDate}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <BorrowButton book={book}/>

            <Link href={"/"}>
            <Button
              variant="outline"
              className="h-14 rounded-full border-[#E9E2D6] px-7 text-base font-semibold text-ink hover:bg-cream"
            >
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
            </Link>
            
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BookDetailsCard;
