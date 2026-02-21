"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MemberProfileForm from "./forms/MemberProfileForm"
import PartnerProfileForm from "./forms/PartnerProfileForm"
import CommunityAdminProfileForm from "./forms/CommunityAdminProfileForm"

interface User {
  id: string
  email: string
  role: "member" | "partner" | "community_admin"
  is_profile_complete: boolean
}

export default function CompleteProfileClient() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" })
        const data = await res.json()

        if (!data.user) {
          router.replace("/login")
          return
        }

        if (data.user.is_profile_complete) {
          router.replace("/")
          return
        }

        setUser(data.user)
      } catch (err) {
        console.error(err)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleSuccess = () => {
    // 🔥 langsung redirect setelah profile selesai
    router.replace("/")
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {user.role === "member" && (
        <MemberProfileForm onSuccess={handleSuccess} />
      )}
      {user.role === "partner" && (
        <PartnerProfileForm onSuccess={handleSuccess} />
      )}
      {user.role === "community_admin" && (
        <CommunityAdminProfileForm onSuccess={handleSuccess} />
      )}
    </div>
  )
}
