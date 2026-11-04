"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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

// TODO: swap for real session state once auth is wired up.
const isLoggedIn = true;
const mockUser = {
  name: "Ayesha Rahman",
  email: "ayesha@booknook.com",
  initials: "AR",
};

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
];

const privateLinks = [
  { href: "/my-books", label: "My Books" },
  { href: "/my-requests", label: "My Requests" },
  { href: "/add-book", label: "Add Book" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-ink"
    >
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

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex lg:border-2 border-amber p-2 rounded-3xl shadow-lg">
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
                    : "text-muted-foreground hover:bg-cream hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
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
                  <AvatarFallback className="bg-teal text-xs font-semibold text-paper">
                    {mockUser.initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="px-1.5 py-2">
                  <span className="block text-sm font-semibold text-foreground">
                    {mockUser.name}
                  </span>
                  <span className="block truncate text-xs font-normal">
                    {mockUser.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <UserIcon />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-full px-4"
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button className="rounded-full px-4" render={<Link href="/register" />}>
                Register
              </Button>
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

            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 p-4"
            >
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
                        : "text-muted-foreground hover:bg-cream hover:text-ink"
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
                        {mockUser.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {mockUser.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {mockUser.email}
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
                  <Button variant="ghost" className="w-full rounded-full">
                    <LogOutIcon />
                    Logout
                  </Button>
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
                  <Button
                    className="w-full rounded-full"
                    render={
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    Register
                  </Button>
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
