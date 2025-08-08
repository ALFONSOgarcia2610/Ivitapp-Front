"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedFancyTextProps = {
  text: string;
  color?: string; // ejemplo: 'text-pink-500'
  fontSize?: string; // ejemplo: 'text-5xl'
  className?: string;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300 },
  },
};

export const AnimatedFancyText = ({
  text,
  color = "text-pink-500",
  fontSize = "text-5xl",
  className = "",
}: AnimatedFancyTextProps) => {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`text-center ${color} ${fontSize} ${className}`}
      style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, lineHeight: 1.2 }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <motion.div key={i} className="inline-block mr-3">
          {word.split("").map((char, j) => (
            <motion.span key={`${word}-${j}`} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedFancyText;
