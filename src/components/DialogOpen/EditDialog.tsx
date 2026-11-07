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
  Link2Icon,
  LockKeyholeIcon,
  LogOutIcon,
  PencilIcon,
  PlusIcon,
  UploadIcon,
} from "lucide-react";

import { redirect, useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Book } from "@/types/book";
import { FormEvent } from "react";
import { toast } from "sonner";
import { IupdatedData } from "@/types/updateBook";

const categories = [
  { value: "Fiction", label: "Fiction" },
  { value: "Science", label: "Science" },
  { value: "History", label: "History" },
  { value: "Kids", label: "Kids" },
  { value: "Others", label: "Others" },
];



const fieldBase =
  "h-13 w-full rounded-2xl border-border text-sm text-ink shadow-none placeholder:text-muted-foreground/70 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/25";

export function EditDialog({ book }: { book: Book }) {
  const router = useRouter();
  const session = useSession();

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData:IupdatedData= Object.fromEntries(formData.entries()) as unknown as  IupdatedData;

    updatedData.count= Number(updatedData.count);

    const id = book._id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-books/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    toast.success(data.msg);
    console.log(data);

    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            aria-label={`Edit`}
            // onClick={() => console.log("Edit book", book._id)}
            className="rounded-xl border-[#E9E2D6] bg-white text-[#5A6675] hover:bg-[#FBF4E6] hover:text-ink"
          >
            <PencilIcon className="size-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl bg-accent-foreground p-5">
        <form onSubmit={handleUpdate} noValidate>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-[34px]">
            Update Book details
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
                  defaultValue={book.title}
                  placeholder="e.g. The Great Gatsby"
                  className={cn(fieldBase, "bg-paper")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author-name">Author Name</Label>
                <Input
                  id="author-name"
                  name="author"
                  defaultValue={book.author}
                  placeholder="e.g. F. Scott Fitzgerald"
                  className={cn(fieldBase, "bg-paper")}
                />
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select items={categories} name="category" defaultValue={book.category}>
                <SelectTrigger
                  id="category"
                  className={cn(
                    fieldBase,
                    "justify-between bg-paper px-4 data-placeholder:text-muted-foreground/70",
                  )}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border border-border bg-card p-1 shadow-xl">
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
            </div> */}
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
                <Select items={categories} name="category" defaultValue={book.category}>
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
                  defaultValue={book.image}
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
                defaultValue={book.description}
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
                    value={session?.data?.user.name}
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
                    value={session?.data?.user.email}
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
          <DialogClose
            render={
              <Button
                type="submit"
                className="relative mt-7 h-14 w-full overflow-hidden rounded-full bg-amber text-base font-bold text-ink shadow-[0_14px_30px_-12px_rgba(232,163,61,0.8)] transition-colors hover:bg-amber/90 focus-visible:border-amber focus-visible:ring-3 focus-visible:ring-amber/30"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 animate-shine bg-white/35 blur-md"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Update Book
                  <UploadIcon className="size-5" />
                </span>
              </Button>
            }
          />
        </form>
        {/* <form onSubmit={handleUpdate} noValidate>
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
            </form> */}
      </DialogContent>
    </Dialog>
  );
}
