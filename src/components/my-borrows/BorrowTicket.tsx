"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Undo2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type BorrowedBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description:string;
  BorrowedUserEmail:string;
  BorrowedUserName:string;
  OldId:string;
  borrowDate?: string;
  returnDate?: string;
};

function displayDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

export function BorrowTicket({
  book,
  reduceMotion,
}: {
  book: BorrowedBook;
  reduceMotion: boolean | null;
}) {

  const session = useSession();
  const router = useRouter();

  const email = session?.data?.user.email;
  const id = book._id;


  const handlereturn=async ()=>{
     const {data:jwtToken,error}= await authClient.token();
     const token = jwtToken?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-borrows/delete/${id}/${email}`,{
      method:"DELETE",
      headers:{
        authorization:`Bearer ${token}`
      }
    });

    const data = await res.json();
    toast.success(data.msg);
    router.refresh()
  }


  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_18px_45px_-30px_rgba(30,42,58,0.4)] transition-shadow duration-300 hover:shadow-[0_38px_70px_-32px_rgba(30,42,58,0.45)] dark:bg-ink md:grid-cols-[200px_1fr_360px]"
    >
      {/* Cover */}
      <div className="flex items-center justify-center border-b border-dashed border-border bg-muted px-6 py-8 md:border-r md:border-b-0">
        <div className="h-[128px] w-[90px] shrink-0 rotate-[-5deg] overflow-hidden rounded-r-xl bg-tint shadow-[0_16px_24px_-12px_rgba(30,42,58,0.55)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-0">
          
            <Image
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover"
              loading="lazy"
              width={200}
              height={200}
            />
          
        </div>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-col justify-center border-b border-dashed border-border px-7 py-6 md:border-r md:border-b-0">
        <Badge
          variant="outline"
          className="h-auto rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground"
        >
          {book.category}
        </Badge>
        <h2 className="mt-3 font-heading text-2xl leading-snug font-semibold text-foreground">
          {book.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">by {book.author}</p>

        <div className="mt-4 space-y-1 border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
          <p>Borrowed: {displayDate(book.borrowDate)}</p>
          <p>Return by: {displayDate(book.returnDate)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-7 py-6">
        <Link href={`/books/${book.OldId}`}>
          <Button
          variant="outline"
          className="h-11 rounded-full border-border bg-card px-6 text-sm font-medium text-foreground hover:bg-subtle hover:text-foreground"
        >
          Details
        </Button>
        
        </Link>
        
        <Button
          onClick={handlereturn}
          className="h-11 flex-1 rounded-full bg-foreground text-sm font-semibold text-background transition-colors duration-300 group-hover:bg-amber hover:bg-amber hover:text-dark group-hover:text-dark"
        >
          <Undo2Icon className="size-4" strokeWidth={2.2} />
          Return Book
        </Button>
      </div>
    </motion.article>
  );
}

export default BorrowTicket;
