"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Send, Plus, History, CreditCard } from "lucide-react"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: Send,
      label: "Send Money",
      description: "Transfer to friends",
      onClick: () => router.push("/send"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Plus,
      label: "Add Money",
      description: "Top up balance",
      onClick: () => {},
      color: "from-green-500 to-green-600",
    },
    {
      icon: History,
      label: "History",
      description: "View transactions",
      onClick: () => {},
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CreditCard,
      label: "Cards",
      description: "Manage cards",
      onClick: () => {},
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
    >
      <h3 className="text-lg font-serif font-bold text-foreground mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="p-4 bg-background/50 hover:bg-muted/50 rounded-xl border border-border/30 transition-all duration-200 text-left group"
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium text-foreground text-sm">{action.label}</p>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
