"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"

interface User {
  id: string
  email: string
  role: string
  is_profile_complete: boolean
  name: string
}

interface UserContextValue {
  user: User | null
  setUser: (user: User | null) => void
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" })
      const data = await res.json()
      setUser(data.user ?? null)
    } catch (err) {
      console.error("Failed to fetch user:", err)
      setUser(null)
    }
  }

  // 🔹 Refresh user saat mount & route berubah
  useEffect(() => {
    refreshUser()
  }, [pathname])

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used inside UserProvider")
  return context
}