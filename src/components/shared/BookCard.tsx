import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";
import Image from "next/image";

type BookCardBook = Book;

export function BookCard({ book }: { book: BookCardBook }) {
  const bookTitle = book.title;
  const authorName = book.author ;
  const bookImage = book.image ;
  const { category } = book;

  // console.log(book)
 

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
   
        <span className="absolute top-5 left-5 z-10 rounded-full bg-dark px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-paper uppercase">
          New
        </span>
   

      <div
        className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-xl"
       
      >
        
        <div
          className="relative   overflow-hidden rounded-l-sm rounded-r-md shadow-[0_18px_28px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/15 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
          
        >
          <Image 
           src={bookImage}
           alt={bookTitle}
           width={180}
           height={180}
           className="h-auto"
          />
        
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <Badge
          variant="secondary"
          className="w-fit bg-cream text-[11px] font-medium text-ink"
        >
          {category}
        </Badge>

        <h3 className="mt-2 font-heading text-lg leading-snug font-semibold text-ink">

            {bookTitle}
        
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">by {authorName}</p>

        <Link href={`/books/${book._id}`}>
        <Button
          className="mt-4 h-9 w-full rounded-full bg-dark text-sm text-paper hover:bg-ink cursor-pointer"
        >
          View Details
          <ArrowRightIcon />
        </Button>
        
        </Link>

        
      </div>
    </article>
  );
}

export default BookCard;
