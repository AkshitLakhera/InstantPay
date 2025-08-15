"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { ArrowLeft, User, DollarSign, Shield, CheckCircle } from "lucide-react"
import { Button } from "../../components/button"
import { InputBox } from "../../components/input-box"
import { Heading } from "../../components/heading"
import { SubHeading } from "../../components/sub-heading"

interface TransferStep {
  id: number
  title: string
  description: string
}

const steps: TransferStep[] = [
  { id: 1, title: "Recipient", description: "Confirm recipient details" },
  { id: 2, title: "Amount", description: "Enter transfer amount" },
  { id: 3, title: "Review", description: "Review and confirm" },
]

export default function SendMoneyPage() {
  const [searchParams] = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const recipientId = searchParams.get("id")
  const recipientName = searchParams.get("name")

  useEffect(() => {
    if (!recipientId || !recipientName) {
      router.push("/dashboard")
    }
  }, [recipientId, recipientName, router])

  const validateAmount = () => {
    const newErrors: Record<string, string> = {}
    const numAmount = Number.parseFloat(amount)

    if (!amount) newErrors.amount = "Amount is required"
    else if (isNaN(numAmount) || numAmount <= 0) newErrors.amount = "Please enter a valid amount"
    else if (numAmount < 1) newErrors.amount = "Minimum transfer amount is ₹1"
    else if (numAmount > 100000) newErrors.amount = "Maximum transfer amount is ₹1,00,000"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 2 && !validateAmount()) return
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
    else router.push("/dashboard")
  }

  const handleTransfer = async () => {
    if (!validateAmount()) return

    setLoading(true)
    setErrors({}) // Clear previous errors

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setErrors({ general: "Authentication token not found. Please login again." })
        router.push("/signin")
        return
      }

      console.log("[v0] Starting transfer:", { to: recipientId, amount: Number.parseFloat(amount) })

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: recipientId,
          amount: Number.parseFloat(amount), // Ensure it's a number like in original
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("[v0] Transfer successful:", response.data)
      router.push("/confirmation")
    } catch (error: any) {
      console.error("[v0] Transfer error:", error)

      // Better error handling
      if (error.response?.status === 401) {
        setErrors({ general: "Session expired. Please login again." })
        localStorage.removeItem("token")
        router.push("/signin")
      } else if (error.response?.status === 400) {
        setErrors({ general: error.response.data?.message || "Invalid transfer request." })
      } else if (error.response?.status === 403) {
        setErrors({ general: "Insufficient balance or unauthorized transfer." })
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        setErrors({
          general: "Cannot connect to server. Please check if the backend is running on http://localhost:3000",
        })
      } else {
        setErrors({ general: error.response?.data?.message || "Transfer failed. Please try again." })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-xl font-serif font-bold">Send Money</h1>
              <p className="text-sm text-muted-foreground">Transfer funds securely</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: currentStep >= step.id ? 1 : 0.8,
                      backgroundColor: currentStep >= step.id ? "var(--primary)" : "var(--muted)",
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                      className="h-1 w-24 bg-primary mx-4 origin-left"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{steps[currentStep - 1].title}</h2>
              <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && <RecipientStep recipientName={recipientName} />}
              {currentStep === 2 && (
                <AmountStep amount={amount} setAmount={setAmount} note={note} setNote={setNote} error={errors.amount} />
              )}
              {currentStep === 3 && (
                <ReviewStep
                  recipientName={recipientName}
                  amount={amount}
                  note={note}
                  onTransfer={handleTransfer}
                  loading={loading}
                  error={errors.general}
                />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex gap-4 mt-8">
                <Button label="Back" onClick={handleBack} variant="outline" className="flex-1 bg-transparent" />
                <Button label="Next" onClick={handleNext} variant="primary" className="flex-1" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function RecipientStep({ recipientName }: { recipientName: string | null }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto border-4 border-primary/10">
        <User className="w-10 h-10 text-primary" />
      </div>

      <div>
        <Heading label={`Send money to ${recipientName}`} level={3} />
        <SubHeading label="Confirm you're sending money to the right person" />
      </div>

      <div className="bg-background/50 rounded-lg p-4 border border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{recipientName?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">{recipientName}</p>
            <p className="text-sm text-muted-foreground">InstantPay User</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AmountStep({
  amount,
  setAmount,
  note,
  setNote,
  error,
}: {
  amount: string
  setAmount: (value: string) => void
  note: string
  setNote: (value: string) => void
  error?: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <Heading label="Enter Amount" level={3} />
        <SubHeading label="How much would you like to send?" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-muted-foreground">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>

        <InputBox
          label="Note (Optional)"
          placeholder="What's this for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {[500, 1000, 2000].map((quickAmount) => (
            <motion.button
              key={quickAmount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAmount(quickAmount.toString())}
              className="p-3 bg-background/50 hover:bg-primary/10 border border-border/30 hover:border-primary/30 rounded-lg transition-all duration-200"
            >
              <span className="font-semibold">₹{quickAmount}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ReviewStep({
  recipientName,
  amount,
  note,
  onTransfer,
  loading,
  error,
}: {
  recipientName: string | null
  amount: string
  note: string
  onTransfer: () => void
  loading: boolean
  error?: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <Heading label="Review Transfer" level={3} />
        <SubHeading label="Please review the details before confirming" />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="bg-background/50 rounded-lg p-4 border border-border/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">To</span>
            <span className="font-semibold">{recipientName}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-bold text-2xl text-primary">₹{Number.parseFloat(amount).toLocaleString()}</span>
          </div>
          {note && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Note</span>
              <span className="font-medium">{note}</span>
            </div>
          )}
        </div>

        <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Shield className="w-4 h-4" />
            <span>Transfer Details</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Transfer Fee</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time</span>
              <span>Instant</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        label={loading ? "Processing..." : "Confirm Transfer"}
        onClick={onTransfer}
        loading={loading}
        disabled={loading}
        size="lg"
        className="w-full"
      />
    </motion.div>
  )
}
