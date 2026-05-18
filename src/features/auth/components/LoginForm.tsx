"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // 🔐 LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login gagal")
        setLoading(false)
        return
      }

      // ✅ redirect sesuai backend
      router.push(data.redirectTo)

    } catch (err) {
      setError("Terjadi kesalahan server")
    }

    setLoading(false)
  }

  // 🔐 FORGOT PASSWORD
  const handleForgotPassword = () => {
    setError("")

    if (!email) {
      setError("Masukkan email terlebih dahulu")
      return
    }

    // ✅ langsung ke halaman reset password
    router.push(`/reset-password?email=${email}`)
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white relative overflow-hidden px-4 py-10">

      {/* DECORATION */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-200 rounded-full opacity-40 animate-pulse"></div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center relative z-10">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
            <Image
              src="/logo-hablun.png"
              alt="Logo Hablun"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Selamat Datang di Hablun
          </h1>

          <p className="text-gray-500 mt-2 text-center text-sm sm:text-base">
            Masuk untuk melanjutkan
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full"
        >

          {/* EMAIL */}
          <div className="relative">
            <Mail
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full pl-10 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              className="w-full pl-10 pr-12 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* SHOW PASSWORD */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-islamic-green-700 hover:underline transition"
            >
              Lupa Password?
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 shadow-lg hover:from-islamic-green-700 hover:to-islamic-green-800 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <Loader2
                className="animate-spin"
                size={18}
              />
            )}

            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-islamic-green-700 font-semibold hover:underline"
          >
            Daftar
          </a>
        </div>
      </div>
    </div>
  )
}