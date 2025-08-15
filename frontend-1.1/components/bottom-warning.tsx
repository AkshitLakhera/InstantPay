"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface BottomWarningProps {
  label: string
  buttonText: string
  to: string
}

export function BottomWarning({ label, buttonText, to }: BottomWarningProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-6"
    >
      <span>{label}</span>
      <Link
        href={to}
        className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors duration-200"
      >
        {buttonText}
      </Link>
    </motion.div>
  )
}
