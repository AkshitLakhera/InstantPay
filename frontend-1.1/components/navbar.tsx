"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "./button"

export function Navbar() {
  const router = useRouter()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              InstantPay
            </h1>
          </motion.button>

          <div className="flex items-center gap-3">
          <Button
  label="Sign In"
  onClick={() => router.push("/signin")}
  variant="filled"            // prominent filled style
  size="md"                   // slightly bigger
  className="bg-red-600 text-white hover:bg-red-700 font-semibold rounded-lg shadow-md transition-all"
 />

            {/* <Button label="Sign In" onClick={() => router.push("/signup")} variant="primary" size="sm" /> */}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
