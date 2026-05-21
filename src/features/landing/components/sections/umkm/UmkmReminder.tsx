"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Store, ArrowRight } from "lucide-react"

interface ProfileData {
  publish_to_umkm?: string
}

interface User {
  role: string
}

export default function UmkmReminder() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showReminder, setShowReminder] = useState(false)

  useEffect(() => {
    const checkReminder = async () => {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache"
          }
        })
        const data = await res.json()

        const user: User = data.user
        const profile: ProfileData = data.partner_profile || data.member_profile

        // DEBUGGING: Cek console browser untuk memastikan data terbaca dengan benar
        console.log("DEBUG REMINDER:", { role: user?.role, profile })

        // 1. Cek apakah role user adalah partner ATAU member
        const isEligibleRole = user?.role === "partner" || user?.role === "member"
        
        // 2. Cek status publikasi. Jika "no", berarti dia punya bisnis tapi menunda upload.
        // Kita buang pengecekan has_business agar logikanya tidak terblokir oleh perbedaan tipe data
        const deferredPublish = profile?.publish_to_umkm === "no"

        // Tampilkan HANYA jika role-nya sesuai dan dia benar-benar menunda (status "no")
        if (isEligibleRole && deferredPublish) {
          setShowReminder(true)
        } else {
          setShowReminder(false)
        }
      } catch (err) {
        console.error("Gagal mengecek status UMKM:", err)
      } finally {
        setLoading(false)
      }
    }

    checkReminder()
  }, [])

  if (loading || !showReminder) return null

  return (
    <section className="bg-[#f7faf8] px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100">
              <Store className="h-6 w-6 text-amber-700" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Publikasikan Produk Anda
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                Bisnis Anda belum diajukan ke katalog Produk Hablun. 
                Lengkapi template usaha agar produk dan layanan Anda dapat 
                dipublikasikan dan ditemukan oleh komunitas Hablun.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/umkm-submission")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 whitespace-nowrap"
          >
            Lengkapi Sekarang
            <ArrowRight size={16} />
          </button>
          
        </div>
      </div>
    </section>
  )
}