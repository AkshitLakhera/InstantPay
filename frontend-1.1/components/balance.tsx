"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { Eye, EyeOff, TrendingUp, Wallet } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

export function Balance() {
  const [balance, setBalance] = useState("")
  const [loading, setLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        setBalance(response.data.balance)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load balance")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatBalance = (amount: string) => {
    if (!amount) return "0.00"
    return Number.parseFloat(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-2xl hover-lift relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full -z-10"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full -z-10"></div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute -top-10 -right-10 w-32 h-32 border border-white/10 rounded-full"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Wallet className="w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold opacity-90">Total Balance</h3>
            <p className="text-sm opacity-75">Available funds</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        >
          <motion.div animate={{ rotate: showBalance ? 0 : 180 }} transition={{ duration: 0.3 }}>
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </motion.div>
        </motion.button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-48 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-32"></div>
          </div>
        ) : error ? (
          <div className="text-red-200">
            <p className="text-2xl font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <>
            <motion.div
              key={showBalance ? "visible" : "hidden"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold"
            >
              {showBalance ? (
                <AnimatedCounter value={Number.parseFloat(balance) || 0} prefix="₹ " duration={1.5} />
              ) : (
                "₹ ••••••"
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-2 text-sm opacity-90"
            >
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <TrendingUp className="w-4 h-4" />
              </motion.div>
              <span>+2.5% from last month</span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}
