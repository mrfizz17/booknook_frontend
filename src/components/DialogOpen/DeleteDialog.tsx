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
import { authClient, signOut } from "@/lib/auth-client";
import { Book } from "@/types/book";
import { LogOutIcon, Trash2Icon } from "lucide-react";

import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteDialog({ book }: { book: Book }) {
  const router = useRouter();

  const handleDelete = async () => {
    const id = book._id;
    const res = await fetch(`http://localhost:8000/api/my-books/delete/${id}`,{
        method:"DELETE"
    })

    const data = await res.json();
    console.log(data);
    toast.success("Deleted Succesfully")
    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon-lg"
            className="rounded-xl  border-transparent bg-[#FDF0EC] text-[#C8553D] hover:bg-[#FADDD5] hover:text-[#A8442F]"
          >
            <Trash2Icon className="size-6" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md bg-accent-foreground">
        <DialogHeader>
          {/* <DialogTitle>Are You Sure to Delete This Book ?</DialogTitle> */}
        
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-red-600 sm:text-[34px]">
            Are You Sure to Delete ?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Notice it will permanently delete from database
          </p>
          
        </DialogHeader>

        <DialogFooter className="">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose
            render={
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
