"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

export function RecentTransactions() {
  // Mock data - replace with actual API call
  const transactions = [
    {
      id: 1,
      type: "sent",
      amount: 1500,
      recipient: "John Doe",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "received",
      amount: 2500,
      sender: "Alice Smith",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "sent",
      amount: 750,
      recipient: "Bob Wilson",
      date: "2024-01-13",
      status: "pending",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "sent" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}
              >
                {transaction.type === "sent" ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {transaction.type === "sent" ? `To ${transaction.recipient}` : `From ${transaction.sender}`}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {transaction.date}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className={`font-semibold text-sm ${transaction.type === "sent" ? "text-red-600" : "text-green-600"}`}>
                {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
              </p>
              <p
                className={`text-xs capitalize ${
                  transaction.status === "completed" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {transaction.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
