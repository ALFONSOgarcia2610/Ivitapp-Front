"use client";

// import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useThemeConfig } from "@/providers/active-theme.provider";
import { ModeToggle } from "./mode-toggle";

// import { motion, AnimatePresence } from "framer-motion";

const COLOR_THEMES = [
  { name: "Default", value: "default", color: "#f5f5f5" },
  { name: "Red", value: "red", color: "#ef4444" },
  { name: "Rose", value: "rose", color: "#ec4899" },
  { name: "Orange", value: "orange", color: "#f59e0b" },
  { name: "Green", value: "green", color: "#22c55e" },
  { name: "Blue", value: "blue", color: "#3b82f6" },
  { name: "Yellow", value: "yellow", color: "#eab308" },
  { name: "Violet", value: "violet", color: "#a855f7" },
];

export function ThemeSelector() {
  const { colorTheme, setColorTheme } = useThemeConfig();
  const currentColor = COLOR_THEMES.find((theme) => theme.value === colorTheme);

  // const [animatingColor, setAnimatingColor] = useState<string | null>(null);

  // Referencia para guardar el color previo y evitar animación en la carga inicial
  // const prevColorTheme = useRef<string | null>(null);

  // useEffect(() => {
  //   if (!currentColor) return;

  //   // En la primera carga guardamos el color pero no animamos
  //   if (prevColorTheme.current === null) {
  //     prevColorTheme.current = colorTheme;
  //     return;
  //   }

  //   // Solo animar si el colorTheme cambia respecto al previo
  //   if (prevColorTheme.current !== colorTheme) {
  //     setAnimatingColor(currentColor.color);
  //     prevColorTheme.current = colorTheme;

  //     const timeout = setTimeout(() => setAnimatingColor(null), 1000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [colorTheme, currentColor]);

  return (
    <div className="relative flex gap-2 items-center">
      <div className="relative flex items-center">
        <Label htmlFor="color-selector" className="sr-only">
          Color
        </Label>
        <Select value={colorTheme} onValueChange={setColorTheme}>
          <SelectTrigger
            id="color-selector"
            size="sm"
            className="justify-start relative z-20"
          >
            {/* Círculo actual */}
            <span
              className="w-4 h-4 rounded-full shadow mr-2 border relative z-20"
              style={{
                backgroundColor: currentColor?.color || "#ffffff",
                borderColor: currentColor?.color || "#ffffff",
              }}
            />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Colores</SelectLabel>
              {COLOR_THEMES.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  <span
                    className="w-4 h-4 rounded-full inline-block mr-2"
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Animación de círculo */}
        {/* <AnimatePresence>
          {animatingColor && (
            <motion.span
              key="anim-circle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1000, opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                backgroundColor: animatingColor,
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none z-10"
            />
          )}
        </AnimatePresence> */}
      </div>

      <ModeToggle />
    </div>
  );
}
