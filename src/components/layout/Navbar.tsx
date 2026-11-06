"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DialogDemo} from "@/components/layout/DialogDemo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { Dialog } from "@base-ui/react";

// TODO: swap for real session state once auth is wired up.

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
];

const privateLinks = [
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
  { href: "/add-book", label: "Add Book" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 text-ink">
      <span className="flex size-8 items-center justify-center rounded-lg bg-amber text-dark shadow-sm transition-transform group-hover:-rotate-6">
        <BookOpenIcon className="size-4" strokeWidth={2.2} />
      </span>
      <span className="font-heading text-xl font-semibold tracking-tight">
        BookNook
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = useSession();

  const [openDialog , setOpenDialog] = useState(false);


  const isLoggedIn = session?.data?.user;

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 lg:flex lg:border-2 border-amber p-2 rounded-3xl shadow-lg"
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-dark text-paper"
                    : "text-muted-foreground hover:bg-cream hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Open account menu"
                  />
                }
              >
                <Avatar>
                  <AvatarFallback className="bg-amber text-xs font-semibold text-paper">
                    {session?.data?.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-1.5 py-2">
                    <span className="block text-sm font-semibold text-base">
                      {session?.data?.user.name}
                    </span>
                    <span className="block truncate text-xs font-normal">
                      {session?.data?.user.email}
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <UserIcon />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                
                
              </DropdownMenuContent>
            </DropdownMenu>

            {<DialogDemo />}
            
            </>
            
            
          ) : (
            <>
              <Link href={"/login"}>
                <Button variant="outline" className="rounded-full px-4">
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button className="rounded-full px-4">Register</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 gap-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              {/* <Logo onClick={() => setMobileOpen(false)} /> */}
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-dark text-paper"
                        : "text-muted-foreground hover:bg-cream hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-border p-4">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-teal text-sm font-semibold text-paper">
                        {session?.data?.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {session?.data?.user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session?.data?.user.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    render={
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    <UserIcon />
                    My Profile
                  </Button>
                  <DialogDemo />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    render={
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    Login
                  </Button>

                  <Link href={"/register"}>
                    <Button className="w-full rounded-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
