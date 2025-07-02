"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SpinnerProps {
  size?: number;
  color?: string; // hex or Tailwind-compatible class like 'text-blue-500'
}

const Spinner = ({ size = 32, color }: SpinnerProps) => {
  const defaultBorderColor = "border-zinc-300 dark:border-zinc-700";
  const defaultTopColor = color
    ? color
    : "border-t-zinc-700 dark:border-t-zinc-300";

  return (
    <motion.div
      className={clsx(
        "rounded-full border-4 border-solid",
        defaultBorderColor,
        defaultTopColor
      )}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1.2,
      }}
    />
  );
};

export default Spinner;
