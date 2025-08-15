"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react" // Import React to declare JSX

interface HeadingProps {
  label: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export function Heading({ label, level = 1, className }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements

  const sizes = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {React.createElement(
        Component,
        { className: cn("font-serif font-bold text-foreground mb-4", sizes[level], className) },
        label,
      )}
    </motion.div>
  )
}
