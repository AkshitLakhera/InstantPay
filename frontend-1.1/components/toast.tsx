"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

let toastContext: ToastContextType = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  toastContext = { toasts, addToast, removeToast }

  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = toastContext

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "from-green-500 to-green-600",
    error: "from-red-500 to-red-600",
    warning: "from-yellow-500 to-yellow-600",
    info: "from-blue-500 to-blue-600",
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
      className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg shadow-xl p-4 min-w-[300px] max-w-[400px]"
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 bg-gradient-to-br ${colors[toast.type]} rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{toast.title}</h4>
          {toast.message && <p className="text-sm text-muted-foreground mt-1">{toast.message}</p>}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(toast.id)}
          className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Export toast function for use in other components
export const toast = {
  success: (title: string, message?: string) => toastContext.addToast({ type: "success", title, message }),
  error: (title: string, message?: string) => toastContext.addToast({ type: "error", title, message }),
  warning: (title: string, message?: string) => toastContext.addToast({ type: "warning", title, message }),
  info: (title: string, message?: string) => toastContext.addToast({ type: "info", title, message }),
}
