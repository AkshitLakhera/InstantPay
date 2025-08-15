"use client"

import { motion } from "framer-motion"

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className={`bg-muted rounded ${className}`}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Balance Card Skeleton */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <LoadingSkeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-3 w-16" />
            </div>
          </div>
          <LoadingSkeleton className="w-8 h-8 rounded-full" />
        </div>
        <LoadingSkeleton className="h-8 w-48 mb-2" />
        <LoadingSkeleton className="h-4 w-32" />
      </div>

      {/* Users List Skeleton */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <LoadingSkeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <LoadingSkeleton className="h-5 w-24" />
            <LoadingSkeleton className="h-3 w-32" />
          </div>
        </div>
        <LoadingSkeleton className="h-10 w-full mb-6 rounded-lg" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3">
                <LoadingSkeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <LoadingSkeleton className="h-4 w-24" />
                  <LoadingSkeleton className="h-3 w-16" />
                </div>
              </div>
              <LoadingSkeleton className="h-8 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
