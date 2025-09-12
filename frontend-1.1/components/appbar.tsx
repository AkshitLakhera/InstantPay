"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Bell, LogOut, Settings, User, History } from "lucide-react"

export function Appbar() {
  const [currentUser, setCurrentUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching currentUser...");
        const res = await axios.get("http://localhost:3000/api/v1/user/currentUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        console.log("Response:", res.data);
        setCurrentUser(res.data.firstName)
      } catch (error) {
        console.error("Error fetching data:", error)
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/signin")
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              InstantPay
            </h1>
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-muted rounded-full transition-colors duration-200 relative"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {loading ? "Loading..." : `Hello, ${currentUser}`}
                  </p>
                  <p className="text-xs text-muted-foreground">Welcome back</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {loading ? "?" : currentUser?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                >
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => router.push("/history")}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <History className="w-4 h-4" />
                    Transaction History
                  </button>
                  <button
                    onClick={() => router.push("/settings")}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
