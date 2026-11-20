"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <MoonIcon aria-hidden className="size-5 dark:hidden" />
      <SunIcon aria-hidden className="hidden size-5 dark:block" />
    </Button>
  );
}

export default ThemeToggle;
