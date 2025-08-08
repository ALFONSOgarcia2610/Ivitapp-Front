"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaPenFancy } from "react-icons/fa";

type AnimatedWritingProps = {
  initialText?: string;
  text: string;
  color?: string;
  className?: string;
  speed?: number;
};

export const AnimatedWriting = ({
  initialText = "",
  text,
  color = "text-pink-600",
  className = "",
  speed = 100,
}: AnimatedWritingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [displayedText, setDisplayedText] = useState(initialText);
  const [index, setIndex] = useState(initialText.length);
  const [penX, setPenX] = useState(0);

  // Animar texto sólo cuando esté en vista
  useEffect(() => {
    if (!isInView) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, isInView]);

  // Función para actualizar posición lápiz
  const updatePenPosition = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const span = container.querySelector("#animated-text");
    if (span) {
      const rect = span.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeX = rect.right - containerRect.left;
      // Agregar margen extra para que no tape la última letra
      setPenX(relativeX + 4); // <-- aquí el margen horizontal
    }
  };

  // Actualizar posición cuando cambia texto
  useEffect(() => {
    updatePenPosition();
  }, [displayedText]);

  // También actualizar posición al cambiar tamaño ventana
  useEffect(() => {
    window.addEventListener("resize", updatePenPosition);
    return () => window.removeEventListener("resize", updatePenPosition);
  }, []);

  const isWriting = index < text.length && isInView;

  return (
    <div
      ref={containerRef}
      className={`relative inline-block font-mono text-lg select-text ${color} ${className}`}
      style={{ paddingLeft: "1.5rem" }}
    >
      <span id="animated-text">{displayedText}</span>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: penX,
          translateX: "-50%",
        }}
        animate={
          isWriting
            ? {
                rotate: [0, 10, 0, -10, 0],
                y: [0, -3, 0, -3, 0],
              }
            : { rotate: 0, y: 0 }
        }
        transition={{
          repeat: isWriting ? Infinity : 0,
          duration: 2,
          ease: "easeInOut",
        }}
        className="pointer-events-none"
      >
        <FaPenFancy
          className="text-current"
          style={{ width: "24px", height: "24px" }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedWriting;
