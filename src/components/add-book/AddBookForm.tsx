"use client";

import { useState, type FormEvent } from "react";
import { Link2Icon, LockKeyholeIcon, PlusIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { router } from "better-auth/api";


const categories = [
  { value: "Fiction", label: "Fiction" },
  { value: "Science", label: "Science" },
  { value: "History", label: "History" },
  { value: "Kids", label: "Kids" },
  { value: "Others", label: "Others" },
];

interface AddBookType {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  addedAt:string;
  userName?: string;
  userEmail?: string;
  count:number
}

const fieldBase =
  "h-13 w-full rounded-2xl border-border text-sm text-ink shadow-none placeholder:text-muted-foreground/70 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/25";

export function AddBookForm() {
  const session = useSession();
  const router = useRouter();

  const userName = session?.data?.user.name;
  const userEmail = session?.data?.user.email;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEntries = new FormData(event.currentTarget);
    const formData = Object.fromEntries(formEntries.entries()) as unknown as AddBookType;

    const date = new Date();
    const addedAt = format(date, "d MMMM yyyy");


    formData.addedAt = addedAt;
    formData.count=Number(formData.count);

    console.log(formData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    toast.success(data.msg);
    router.push("/my-books");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-[34px]">
        Book details
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Fill in the details below. All fields are required.
      </p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="book-title">Book Title</Label>
            <Input
              id="book-title"
              name="title"
              placeholder="e.g. The Great Gatsby"
              className={cn(fieldBase, "bg-paper")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author-name">Author Name</Label>
            <Input
              id="author-name"
              name="author"
              placeholder="e.g. F. Scott Fitzgerald"
              className={cn(fieldBase, "bg-paper")}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="book-title">No of Copies</Label>
            <Input
              id="book-count"
              name="count"
              type="value"
              placeholder="e.g. 5"
              className={cn(fieldBase, "bg-paper")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select items={categories} name="category">
              <SelectTrigger
                id="category"
                className={cn(
                  fieldBase,
                  "justify-between py-6  bg-paper px-4 data-placeholder:text-muted-foreground/70",
                )}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl  border border-border bg-card p-1 shadow-xl">
                {categories.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="rounded-xl px-3 py-2 text-sm focus:bg-cream"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        

        <div className="space-y-2">
          <Label htmlFor="book-image">Book Image URL</Label>
          <div className="relative">
            <Link2Icon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="book-image"
              type="url"
              name="image"
              placeholder="https://i.ibb.co/your-book-cover.jpg"
              className={cn(fieldBase, "bg-paper pl-11")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="What is this book about?"
            className="min-h-[140px] resize-none rounded-2xl border-border bg-paper px-4 py-3 text-sm text-ink shadow-none placeholder:text-muted-foreground/70 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/25"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="user-name">User Name</Label>
            <div className="relative">
              <Input
                id="user-name"
                value={userName}
                readOnly
                name="userName"
                aria-readonly
                className={cn(
                  fieldBase,
                  "cursor-default border-dashed bg-cream pr-11 text-ink/70 focus-visible:border-border focus-visible:ring-0",
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
                value={userEmail}
                readOnly
                aria-readonly
                className={cn(
                  fieldBase,
                  "cursor-default border-dashed bg-cream pr-11 text-ink/70 focus-visible:border-border focus-visible:ring-0",
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

      <Button
        type="submit"
        className="relative mt-7 h-14 w-full overflow-hidden rounded-full bg-amber text-base font-bold text-ink shadow-[0_14px_30px_-12px_rgba(232,163,61,0.8)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/30"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 animate-shine bg-white/35 blur-md"
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          Add Book
          <PlusIcon className="size-5" />
        </span>
      </Button>
    </form>
  );
}

export default AddBookForm;
