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
import { LogOutIcon } from "lucide-react";

import { redirect, useRouter } from "next/navigation";


export function DialogDemo() {
  const router = useRouter();
  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
          // redirect to login page
          
        },
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger
        render={<Button className={"bg-amber rounded-[4px] text-white"}><LogOutIcon />Logout</Button>}
      />
      <DialogContent className="sm:max-w-sm bg-accent-foreground">
        <DialogHeader>
          <DialogTitle>Are You Sure to Log Out ?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose
            render={<Button onClick={handleLogOut}>Log out</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
