"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield, Bell, CreditCard, Lock, Eye, EyeOff, Smartphone, Mail, Globe, Moon, Sun } from "lucide-react"
import { Button } from "../../components/button"
import { InputBox } from "../../components/input-box"
import { Heading } from "../../components/heading"
import { SubHeading } from "../../components/sub-heading"
import { Appbar } from "../../components/appbar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("security")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    transactions: true,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const tabs = [
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
  ]

  const handlePasswordChange = async () => {
    // Implementation for password change
    console.log("Password change:", passwordForm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Appbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heading label="Settings" level={2} />
            <SubHeading label="Manage your account settings and preferences" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50">
                {activeTab === "security" && (
                  <SecuritySettings
                    passwordForm={passwordForm}
                    setPasswordForm={setPasswordForm}
                    showCurrentPassword={showCurrentPassword}
                    setShowCurrentPassword={setShowCurrentPassword}
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    onPasswordChange={handlePasswordChange}
                  />
                )}
                {activeTab === "notifications" && (
                  <NotificationSettings notifications={notifications} setNotifications={setNotifications} />
                )}
                {activeTab === "preferences" && <PreferenceSettings darkMode={darkMode} setDarkMode={setDarkMode} />}
                {activeTab === "payment" && <PaymentSettings />}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings({
  passwordForm,
  setPasswordForm,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  onPasswordChange,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2">Security Settings</h3>
        <p className="text-muted-foreground">Manage your account security and authentication</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Change Password
        </h4>

        <div className="space-y-4 max-w-md">
          <div className="relative">
            <InputBox
              label="Current Password"
              placeholder="Enter current password"
              type={showCurrentPassword ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="relative">
            <InputBox
              label="New Password"
              placeholder="Enter new password"
              type={showNewPassword ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <InputBox
            label="Confirm New Password"
            placeholder="Confirm new password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
          />

          <Button label="Update Password" onClick={onPasswordChange} />
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="pt-6 border-t border-border/30">
        <h4 className="font-semibold flex items-center gap-2 mb-4">
          <Smartphone className="w-4 h-4" />
          Two-Factor Authentication
        </h4>
        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
          <div>
            <p className="font-medium">SMS Authentication</p>
            <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
          </div>
          <Button label="Enable" variant="outline" size="sm" />
        </div>
      </div>
    </div>
  )
}

function NotificationSettings({ notifications, setNotifications }: any) {
  const toggleNotification = (key: string) => {
    setNotifications((prev: any) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2">Notification Settings</h3>
        <p className="text-muted-foreground">Choose how you want to be notified</p>
      </div>

      <div className="space-y-4">
        {[
          { key: "email", label: "Email Notifications", description: "Receive updates via email", icon: Mail },
          { key: "push", label: "Push Notifications", description: "Browser push notifications", icon: Bell },
          { key: "sms", label: "SMS Notifications", description: "Text message alerts", icon: Smartphone },
          {
            key: "transactions",
            label: "Transaction Alerts",
            description: "Instant transaction notifications",
            icon: CreditCard,
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleNotification(item.key)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                notifications[item.key] ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: notifications[item.key] ? 24 : 2 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PreferenceSettings({ darkMode, setDarkMode }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2">Preferences</h3>
        <p className="text-muted-foreground">Customize your app experience</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              darkMode ? "bg-primary" : "bg-muted"
            }`}
          >
            <motion.div
              animate={{ x: darkMode ? 24 : 2 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
          </motion.button>
        </div>

        <div className="p-4 bg-background/50 rounded-lg border border-border/30">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5" />
            <p className="font-medium">Language & Region</p>
          </div>
          <select className="w-full p-2 bg-input border border-border rounded-lg">
            <option>English (US)</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2">Payment Methods</h3>
        <p className="text-muted-foreground">Manage your linked payment methods</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-background/50 rounded-lg border border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Bank Account</p>
                <p className="text-sm text-muted-foreground">****1234</p>
              </div>
            </div>
            <Button label="Manage" variant="outline" size="sm" />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 border-2 border-dashed border-border/50 rounded-lg hover:border-primary/50 transition-colors duration-200 text-muted-foreground hover:text-foreground"
        >
          + Add Payment Method
        </motion.button>
      </div>
    </div>
  )
}
