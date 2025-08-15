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

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) newErrors.firstName = "First name is required"
    if (!lastName.trim()) newErrors.lastName = "Last name is required"
    if (!username.trim()) newErrors.username = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(username)) newErrors.username = "Please enter a valid email"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const data = {
        username,
        firstName,
        lastName,
        password,
      }

      const response = await axios.post("http://localhost:3000/api/v1/user/signup", data, {
        headers: { "Content-Type": "application/json" },
      })

      localStorage.setItem("token", response.data.token)
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ general: "Failed to create account. Please try again." })
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
                src="/images/signin.jpg"
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
                <Heading label="Create Account" level={2} />
                <SubHeading label="Join InstantPay and start managing your finances with ease" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputBox
                    label="First Name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errors.firstName}
                    required
                  />
                  <InputBox
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={errors.lastName}
                    required
                  />
                </div>

                <InputBox
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={errors.username}
                  required
                />

                <InputBox
                  label="Password"
                  placeholder="Create a secure password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  required
                />

                <Button
                  label="Create Account"
                  onClick={handleSignup}
                  loading={loading}
                  disabled={loading}
                  size="lg"
                  icon="🚀"
                  className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>

              <BottomWarning label="Already have an account?" buttonText="Sign in here" to="/signin" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
