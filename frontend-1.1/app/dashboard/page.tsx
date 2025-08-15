"use client"

import { motion } from "framer-motion"
import { Appbar } from "../../components/appbar"
import { Balance } from "../../components/balance"
import { Users } from "../../components/users"
import { QuickActions } from "../../components/quick-actions"
import { RecentTransactions } from "../../components/recent-transactions"
import { FloatingActionButton } from "../../components/floating-action-button"
import { DashboardSkeleton } from "../../components/loading-skeleton"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Appbar />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2"
              >
                Welcome to Your Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-muted-foreground text-lg"
              >
                Manage your finances with ease and security
              </motion.p>
            </div>

            {/* Balance and Quick Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Balance />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Users Section */}
              <div className="xl:col-span-2">
                <Users />
              </div>

              {/* Recent Transactions */}
              <div>
                <RecentTransactions />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <FloatingActionButton />
    </div>
  )
}
