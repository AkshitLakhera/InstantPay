"use client"

import { motion } from "framer-motion"
import { Plus, Send, History, Settings } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const actions = [
    { icon: Send, label: "Send Money", onClick: () => router.push("/send"), color: "from-blue-500 to-blue-600" },
    { icon: History, label: "History", onClick: () => router.push("/history"), color: "from-purple-500 to-purple-600" },
    { icon: Settings, label: "Settings", onClick: () => router.push("/settings"), color: "from-gray-500 to-gray-600" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Items */}
      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
        className="absolute bottom-16 right-0 space-y-3"
      >
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
              scale: isOpen ? 1 : 0.8,
            }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="bg-card/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border border-border/50"
            >
              {action.label}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={action.onClick}
              className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center shadow-lg`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>
    </div>
  )
}
