"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"

// 1. Pindahkan seluruh logika utama ke komponen internal ini
function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    // VALIDASI
    if (!email) {
      setError("Email tidak ditemukan")
      return
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        "/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(
          data.error ||
            "Gagal reset password"
        )
      } else {
        setSuccess(
          "Password berhasil diubah"
        )

        // redirect login
        setTimeout(() => {
          router.push("/login")
        }, 1500)
      }
    } catch (err) {
      setError("Server error")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Reset Password
          </h1>
          <p className="text-gray-500 mt-2">
            Buat password baru akunmu
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* PASSWORD */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password baru"
              className="w-full border border-gray-300 p-3 pl-10 pr-12 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            {/* SHOW PASSWORD */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Konfirmasi password"
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <Loader2
                className="animate-spin"
                size={18}
              />
            )}
            {loading
              ? "Loading..."
              : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  )
}

// 2. Komponen utama halaman sekarang aman dibungkus dengan Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
          <Loader2 className="animate-spin text-green-600" size={32} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}