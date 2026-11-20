"use client";

import { BookOpenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";
import { BorrowConfirmDialog } from "../DialogOpen/BorrowConfirmDialog";


export function BorrowButton({book}:{book:Book}) {


  return (
    <BorrowConfirmDialog book={book} />
  );
}

export default BorrowButton;
