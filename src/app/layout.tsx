import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook — A cozy home for your next read",
  description:
    "Discover, borrow, and share books from a curated neighborhood library.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="booknook-theme"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "!bg-[#E8A33D] !text-[#1E2A3A] !border-zinc-800",
                title: "font-semibold !text-white !text-[16px]",
                description: "!text-zinc-400",
                actionButton: "!bg-blue-600 !text-white",
                cancelButton: "!bg-zinc-700 !text-zinc-200",
                success:
                  "!border-l-4 !border-l-[#E8A33D] [&_[data-icon]]:!text-[#1E2A3A]",
                error:
                  "!border-l-4 !border-l-rose-500 [&_[data-icon]]:!text-rose-500",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
