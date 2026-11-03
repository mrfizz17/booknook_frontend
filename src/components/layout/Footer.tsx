import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/all-books", label: "All Books" },
      { href: "/add-book", label: "Add Book" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@booknook.com", label: "hello@booknook.com" },
      { href: "tel:+10000000000", label: "+1 (000) 000-0000" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];



export function Footer() {
  return (
    <footer className="bg-dark text-paper mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-amber text-dark">
                <BookOpenIcon className="size-4" strokeWidth={2.2} />
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight">
                BookNook
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">
              A friendly place to lend, borrow and discover books in your
              community.
            </p>
            <div className="mt-5 flex gap-2">
       
                <Link
                  href={"www.facebook.com"}
                  aria-label="facebook"
                  className="flex size-8 items-center justify-center rounded-full bg-paper/10 text-lg font-medium text-paper/70 transition-colors hover:bg-amber hover:text-dark"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href={"/"}
                  aria-label="instagram"
                  className="flex size-8 items-center justify-center rounded-full bg-paper/10 text-lg font-medium text-paper/70 transition-colors hover:bg-amber hover:text-dark"
                >
                  <FaInstagramSquare />

                </Link>
                <Link
                  href={"/"}
                  aria-label="twitter"
                  className="flex size-8 items-center justify-center rounded-full bg-paper/10 text-lg font-medium text-paper/70 transition-colors hover:bg-amber hover:text-dark"
                >
                  <FaSquareXTwitter />
                </Link>
           
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/60 transition-colors hover:text-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <p>Made for readers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
