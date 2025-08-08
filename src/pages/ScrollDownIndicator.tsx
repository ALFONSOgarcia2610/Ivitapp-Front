"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollDownIndicator() {
  const [visible, setVisible] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const atBottom = scrollTop + windowHeight >= fullHeight - 50;

      if (atBottom) {
        setScrolledToBottom(true);
        setVisible(false);
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (scrolledToBottom) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -8, 0, 0],
          }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-label="Indica que baje más"
        >
          <ChevronDown className="w-10 h-10 text-black" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
