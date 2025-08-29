"use client";

import { useTheme } from "next-themes";

import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 px-0"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Icons.sun className="h-5 w-5 transition-all" />
      ) : (
        <Icons.moon className="h-5 w-5 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
