"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomWarning } from "../../components/bottom-warning"
import { Button } from "../../components/button"
import { Heading } from "../../components/heading"
import { InputBox } from "../../components/input-box"
import { SubHeading } from "../../components/sub-heading"
import { Navbar } from "../../components/navbar"

export default function SigninPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!username.trim()) newErrors.username = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(username)) newErrors.username = "Please enter a valid email"
    if (!password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignin = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      })
      console.log("✅ Signin success, backend response:", response.data)
      localStorage.setItem("token", response.data.token)
      router.push("/dashboard")
    } catch (error) {
      console.error("Signin error:", error)
      setErrors({ general: "Invalid email or password. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="relative">
              <Image
                src="/images/banking.jpg"
                alt="Modern banking illustration"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl hover-lift"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 card-shadow border border-border/50">
              <div className="text-center mb-8">
                <Heading label="Welcome Back" level={2} />
                <SubHeading label="Sign in to your InstantPay account to continue" />
              </div>

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6"
                >
                  {errors.general}
                </motion.div>
              )}

              <div className="space-y-6">
                <InputBox
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={errors.username}
                  required
                />

                <InputBox
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  required
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    Remember me
                  </label>
                  <button className="text-primary hover:text-primary/80 font-medium">Forgot password?</button>
                </div>

                <Button
                  label="Sign In"
                  onClick={handleSignin}
                  loading={loading}
                  disabled={loading}
                  size="lg"
                  icon="🔐"
                  className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>

              <BottomWarning label="Don't have an account?" buttonText="Create one here" to="/signup" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
