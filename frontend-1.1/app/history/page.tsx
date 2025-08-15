"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Search, Download, Clock } from "lucide-react"
import { Button } from "../../components/button"
import { Heading } from "../../components/heading"
import { SubHeading } from "../../components/sub-heading"
import { Appbar } from "../../components/appbar"

interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  recipient?: string
  sender?: string
  date: string
  status: "completed" | "pending" | "failed"
  note?: string
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("all")

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "sent",
        amount: 1500,
        recipient: "John Doe",
        date: "2024-01-15T10:30:00Z",
        status: "completed",
        note: "Lunch payment",
      },
      {
        id: "2",
        type: "received",
        amount: 2500,
        sender: "Alice Smith",
        date: "2024-01-14T15:45:00Z",
        status: "completed",
        note: "Freelance work",
      },
      {
        id: "3",
        type: "sent",
        amount: 750,
        recipient: "Bob Wilson",
        date: "2024-01-13T09:15:00Z",
        status: "pending",
        note: "Movie tickets",
      },
      {
        id: "4",
        type: "received",
        amount: 5000,
        sender: "Company Ltd",
        date: "2024-01-12T14:20:00Z",
        status: "completed",
        note: "Salary advance",
      },
      {
        id: "5",
        type: "sent",
        amount: 300,
        recipient: "Coffee Shop",
        date: "2024-01-11T08:30:00Z",
        status: "failed",
        note: "Coffee subscription",
      },
    ]

    setTimeout(() => {
      setTransactions(mockTransactions)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter
    const matchesSearch =
      searchTerm === "" ||
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const totalSent = transactions
    .filter((t) => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalReceived = transactions
    .filter((t) => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Appbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heading label="Transaction History" level={2} />
            <SubHeading label="View and manage all your transactions" />
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Received</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalReceived.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sent</p>
                  <p className="text-2xl font-bold text-red-600">₹{totalSent.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-primary">{transactions.length}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">All Transactions</option>
                <option value="sent">Sent</option>
                <option value="received">Received</option>
              </select>

              {/* Export */}
              <Button label="Export" variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50"
          >
            <div className="p-6">
              <h3 className="text-lg font-serif font-bold mb-4">Recent Transactions</h3>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-32"></div>
                          <div className="h-3 bg-muted rounded w-24"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : filteredTransactions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No transactions found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-background/50 hover:bg-muted/30 rounded-lg border border-border/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
                          <p className="font-medium text-foreground">
                            {transaction.type === "sent" ? `To ${transaction.recipient}` : `From ${transaction.sender}`}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            {transaction.note && (
                              <>
                                <span>•</span>
                                <span>{transaction.note}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold ${transaction.type === "sent" ? "text-red-600" : "text-green-600"}`}>
                          {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs capitalize ${
                            transaction.status === "completed"
                              ? "text-green-600"
                              : transaction.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
