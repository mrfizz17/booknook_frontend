"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { cn } from "cn";
import {
  BookOpenIcon,
  Clock3Icon,
  LockKeyholeIcon,
  PencilIcon,
  UploadIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Book } from "@/types/book";


import { toast } from "sonner";

const fieldBase =
  "h-13 w-full rounded-2xl border-border text-sm text-foreground shadow-none placeholder:text-muted-foreground/70 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/25";

export function BorrowConfirmDialog({ book }: { book: Book }) {
  const router = useRouter();
  const session = useSession();

  const BorrowedUserEmail = session?.data?.user.email;
  const BorrowedUserName = session?.data?.user.name;

  const handleBorrow = async () => {
    const id = book._id;
    const borrowDate= new Date();
    const { _id, count, userEmail, userName, ...updateData } = {
      ...book,
      BorrowedUserEmail: BorrowedUserEmail,
      BorrowedUserName: BorrowedUserName,
      OldId: id,
      borrowDate:borrowDate,
    };
    console.log(updateData);

    const { data: jwtToken, error } = await authClient.token();
    const token = jwtToken?.token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-books/borrow/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      },
    );
    const data = await res.json();

    if(!res.ok){
        toast.error(data.msg);
        return;
    }

    toast.success(data.msg);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            disabled={book.count === 0}
            className="group relative min-h-14 flex-1 overflow-hidden rounded-full bg-amber text-base font-bold text-foreground shadow-[0_16px_30px_-14px_rgba(232,163,61,0.9)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-4 focus-visible:ring-amber/30"
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
        }
      />
      <DialogContent className="sm:max-w-xl p-5">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-[34px]">
            Confirm Borrow Book
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Check who borrowing this book below.
          </p>
         

          <div className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="book-title">Book Title</Label>
                <p className={cn(
                      fieldBase,
                      "cursor-default pl-4 border-dashed bg-muted pr-11 text-foreground/70 focus-visible:border-border focus-visible:ring-0 flex justify-center items-center",
                    )}> {book.title}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author-name">Author Name</Label>
                <p className={cn(
                      fieldBase,
                      "cursor-default border-dashed pl-4 pt-4 bg-muted pr-11 text-foreground/70 focus-visible:border-border focus-visible:ring-0",
                    )}>{book.author}</p>

              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="user-name">User Name</Label>
                <div className="relative">
                  <Input
                    id="user-name"
                    value={session?.data?.user.name}
                    readOnly
                    name="userName"
                    aria-readonly
                    className={cn(
                      fieldBase,
                      "cursor-default border-dashed bg-muted pr-11 text-foreground/70 focus-visible:border-border focus-visible:ring-0",
                    )}
                  />
                  <LockKeyholeIcon
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-email">User Email</Label>
                <div className="relative">
                  <Input
                    id="user-email"
                    name="userEmail"
                    type="email"
                    value={session?.data?.user.email}
                    readOnly
                    aria-readonly
                    className={cn(
                      fieldBase,
                      "cursor-default border-dashed bg-muted pr-11 text-foreground/70 focus-visible:border-border focus-visible:ring-0",
                    )}
                  />
                  <LockKeyholeIcon
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogClose
            render={
              <Button
                onClick={handleBorrow}
                className="relative mt-7 h-14 w-full overflow-hidden rounded-full bg-amber text-base font-bold text-foreground shadow-[0_14px_30px_-12px_rgba(232,163,61,0.8)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/30"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 animate-shine bg-white/35 blur-md"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                   Confrim
                  <BookOpenIcon className="size-5" />

                </span>
              </Button>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
