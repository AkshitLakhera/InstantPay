"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CheckCircle, Home, Send } from "lucide-react"
import { Button } from "../../components/button"
import { Heading } from "../../components/heading"
import { SubHeading } from "../../components/sub-heading"

export default function ConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 card-shadow border border-border/50 text-center max-w-md w-full"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto relative">
            <CheckCircle className="w-12 h-12 text-white" />

            {/* Animated rings */}
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
              className="absolute inset-0 border-4 border-green-500 rounded-full"
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 border-4 border-green-400 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Heading label="Transfer Successful!" level={2} />
          <SubHeading label="Your money has been transferred successfully. The recipient will receive it instantly." />
        </motion.div>

        {/* Transfer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-background/50 rounded-lg p-4 border border-border/30 mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Transaction completed at {new Date().toLocaleTimeString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Transaction ID: TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="space-y-4"
        >
          <Button label="Back to Dashboard" onClick={() => router.push("/dashboard")} size="lg" className="w-full" />

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/send")}
              className="flex items-center justify-center gap-2 p-3 bg-background/50 hover:bg-muted/50 border border-border/30 rounded-lg transition-all duration-200 text-sm"
            >
              <Send className="w-4 h-4" />
              Send Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 p-3 bg-background/50 hover:bg-muted/50 border border-border/30 rounded-lg transition-all duration-200 text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
