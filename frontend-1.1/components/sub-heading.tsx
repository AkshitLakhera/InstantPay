"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SubHeadingProps {
  label: string
  className?: string
}

export function SubHeading({ label, className }: SubHeadingProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn("text-muted-foreground text-base md:text-lg mb-6 leading-relaxed", className)}
    >
      {label}
    </motion.p>
  )
}
