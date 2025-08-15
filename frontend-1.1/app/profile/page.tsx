"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Edit3, Camera, Save, X } from "lucide-react"
import { Button } from "../../components/button"
import { InputBox } from "../../components/input-box"
import { Heading } from "../../components/heading"
import { SubHeading } from "../../components/sub-heading"
import { Appbar } from "../../components/appbar"

interface UserProfile {
  firstName: string
  lastName: string
  username: string
  createdAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/currentUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        const userData = response.data
        setProfile(userData)
        setEditForm({
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleSave = async () => {
    const newErrors: Record<string, string> = {}
    if (!editForm.firstName.trim()) newErrors.firstName = "First name is required"
    if (!editForm.lastName.trim()) newErrors.lastName = "Last name is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSaving(true)
    try {
      await axios.put("http://localhost:3000/api/v1/user/profile", editForm, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      setProfile((prev) => (prev ? { ...prev, ...editForm } : null))
      setEditing(false)
      setErrors({})
    } catch (error) {
      console.error("Error updating profile:", error)
      setErrors({ general: "Failed to update profile. Please try again." })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
    setEditing(false)
    setErrors({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Appbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-48"></div>
              <div className="bg-card rounded-2xl p-8 space-y-4">
                <div className="h-24 w-24 bg-muted rounded-full mx-auto"></div>
                <div className="h-6 bg-muted rounded w-32 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Appbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heading label="My Profile" level={2} />
            <SubHeading label="Manage your account information and preferences" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50"
          >
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">{profile?.firstName.charAt(0).toUpperCase()}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              {!editing ? (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {profile?.firstName} {profile?.lastName}
                  </h3>
                  <p className="text-muted-foreground">{profile?.username}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-md mx-auto">
                  <InputBox
                    label="First Name"
                    placeholder="Enter first name"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    error={errors.firstName}
                    required
                  />
                  <InputBox
                    label="Last Name"
                    placeholder="Enter last name"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    error={errors.lastName}
                    required
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {!editing ? (
                <Button
                  label="Edit Profile"
                  onClick={() => setEditing(true)}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    label="Cancel"
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    label={saving ? "Saving..." : "Save Changes"}
                    onClick={handleSave}
                    loading={saving}
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/30">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">₹25,000</p>
                <p className="text-sm text-muted-foreground">Total Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">Contacts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
