"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeConfig } from "@/providers/active-theme.provider";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export function ModeToggle() {
  const { modeTheme, setModeTheme } = useThemeConfig();
  const [showCircle, setShowCircle] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [circleColor, setCircleColor] = useState("#ffffff"); // blanco por defecto
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMode = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    // Cambiar el color que tendrá la animación
    setCircleColor(modeTheme === "dark" ? "#ffffff" : "#000000");

    // Mostrar el círculo animado
    setShowCircle(true);

    // Cambiar el tema luego del inicio del efecto
    setTimeout(() => {
      setModeTheme(modeTheme === "dark" ? "light" : "dark");
    }, 400); // espera que la animación avance

    // Ocultar el círculo después
    setTimeout(() => {
      setShowCircle(false);
    }, 1000);
  };

  return (
    <>
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        onClick={toggleMode}
        className="flex items-center justify-center rounded-full overflow-hidden relative z-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          {modeTheme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Círculo animado */}
      <AnimatePresence>
        {showCircle && (
          <motion.div
            key="circle"
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
              backgroundColor: circleColor,
            }}
            animate={{
              width: 5000,
              height: 5000,
              backgroundColor: modeTheme === "dark" ? "#000000" : "#ffffff",
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4 },
            }}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              borderRadius: "9999px",
              transform: "translate(-50%, -50%)",
              zIndex: 40,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
