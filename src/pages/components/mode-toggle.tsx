"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeConfig } from "@/providers/active-theme.provider";

export function ModeToggle() {
  const { modeTheme, setModeTheme } = useThemeConfig();

  const toggleMode = () => {
    setModeTheme(modeTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      className="flex items-center justify-center rounded-full"
    >
      {modeTheme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
