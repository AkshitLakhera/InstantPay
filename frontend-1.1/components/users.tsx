"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Search, UsersIcon } from "lucide-react"
import { Button } from "./button"

interface User {
  _id: string
  firstName: string
  lastName: string
}

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        setUsers(response.data.user)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchUsers, 300)
    return () => clearTimeout(debounceTimer)
  }, [filter])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <UsersIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-foreground">Send Money</h2>
          <p className="text-sm text-muted-foreground">Choose a recipient to transfer funds</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Users List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <UsersIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No users found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <UserCard user={user} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

function UserCard({ user }: { user: User }) {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 bg-background/50 hover:bg-muted/50 rounded-lg border border-border/30 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border-2 border-primary/10">
          <span className="text-lg font-semibold text-primary">{user.firstName.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="font-medium text-foreground">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-muted-foreground">InstantPay User</p>
        </div>
      </div>

      <Button
        label="Send"
        onClick={() => router.push(`/send?id=${user._id}&name=${user.firstName}`)}
        variant="primary"
        size="sm"
        className="min-w-[80px]"
      />
    </motion.div>
  )
}
