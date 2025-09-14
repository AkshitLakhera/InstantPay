"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect ,useState} from "react";
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
export function RecentTransactions() {
   const [transactions, setTransactions] = useState<Transaction[]>([])
   const [loading, setLoading] = useState(true);
   const router=useRouter();
   const handleViewClick = () => {
    router.push("/history")
  }
  // Mock data - replace with actual API call
  useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/v1/account/transactions/history", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // token from login
            },
          });
          console.log("Response status:", res.status);
          const data = await res.json();
          console.log("data",data);
          if (res.ok) {
            // Transform backend data into your frontend Transaction interface
            const mapped = data.transactions.map((t: any) => {
              const isSent = t.fromUser._id === data.userId;
              return {
                id: t._id,
                type: isSent ? "sent" : "received",
                amount: t.amount,
                recipient: isSent ? t.toUser?.firstName || "Unknown" : undefined,
                sender: !isSent ? t.fromUser?.firstName || "Unknown" : undefined,
                date: t.date || t.createdAt,
                status: "completed",
                note: t.note,
              };
            });
    
            setTransactions(mapped);
          } else {
            console.error("Error:", data.message);
          }
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchTransactions();
    }, []);
  // const transactions = [
  //   {
  //     id: 1,
  //     type: "sent",
  //     amount: 1500,
  //     recipient: "John Doe",
  //     date: "2024-01-15",
  //     status: "completed",
  //   },
  //   {
  //     id: 2,
  //     type: "received",
  //     amount: 2500,
  //     sender: "Alice Smith",
  //     date: "2024-01-14",
  //     status: "completed",
  //   },
  //   {
  //     id: 3,
  //     type: "sent",
  //     amount: 750,
  //     recipient: "Bob Wilson",
  //     date: "2024-01-13",
  //     status: "pending",
  //   },
  // ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium" onClick={handleViewClick}>View All</button>
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
                  {new Date(transaction.date).toLocaleString()}
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
