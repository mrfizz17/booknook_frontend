"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenIcon, Undo2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
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
  OldId:string
};

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
    const res = await fetch(`http://localhost:8000/api/my-borrows/delete/${id}/${email}`,{
      method:"DELETE"
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
      className="group grid grid-cols-1 overflow-hidden rounded-[28px] border border-[#E9E2D6] bg-white shadow-[0_18px_45px_-30px_rgba(30,42,58,0.4)] transition-shadow duration-300 hover:shadow-[0_38px_70px_-32px_rgba(30,42,58,0.45)] md:grid-cols-[200px_1fr_360px]"
    >
      {/* Cover */}
      <div className="flex items-center justify-center border-b border-dashed border-[#E3D9C6] bg-[#F7F1E5] px-6 py-8 md:border-r md:border-b-0">
        <div className="h-[128px] w-[90px] shrink-0 rotate-[-5deg] overflow-hidden rounded-r-xl bg-[#F1EBDF] shadow-[0_16px_24px_-12px_rgba(30,42,58,0.55)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-0">
          
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
      <div className="flex min-w-0 flex-col justify-center border-b border-dashed border-[#E3D9C6] px-7 py-6 md:border-r md:border-b-0">
        <Badge
          variant="secondary"
          className="h-auto rounded-full bg-[#FBE9C6] px-3 py-1 text-xs font-medium text-[#7A4F0C]"
        >
          {book.category}
        </Badge>
        <h2 className="mt-3 font-heading text-2xl leading-snug font-semibold text-ink">
          {book.title}
        </h2>
        <p className="mt-1 text-sm text-[#6B7685]">by {book.author}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-7 py-6">
        <Link href={`/books/${book.OldId}`}>
          <Button
          variant="outline"
          className="h-11 rounded-full border-[#E9E2D6] bg-white px-6 text-sm font-medium text-ink hover:bg-[#FBF4E6] hover:text-ink"
        >
          Details
        </Button>
        
        </Link>
        
        <Button
          onClick={handlereturn}
          className="h-11 flex-1 rounded-full bg-[#1E2A3A] text-sm font-semibold text-paper transition-colors duration-300 group-hover:bg-[#E8A33D] hover:bg-[#E8A33D] hover:text-ink group-hover:text-[#1E2A3A]"
        >
          <Undo2Icon className="size-4" strokeWidth={2.2} />
          Return Book
        </Button>
      </div>
    </motion.article>
  );
}

export default BorrowTicket;
