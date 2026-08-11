"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/vendors/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleVariant = "default" | "outline" | "ghost";
type ThemeToggleSize = "default" | "icon";

export interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ThemeToggleVariant;
  size?: ThemeToggleSize;
}

export const ThemeToggle = ({
  variant = "outline",
  size = "icon",
  className,
  ...props
}: ThemeToggleProps) => {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {size === "default" && (
        <span>{dark ? "Light mode" : "Dark mode"}</span>
      )}
    </button>
  );
};
