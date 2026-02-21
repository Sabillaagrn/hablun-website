"use client"

import Image from "next/image"
import { Download, Smartphone, ShieldCheck } from "lucide-react"
import { useUser } from "../../features/landing/context/UserContext"

export default function DownloadPage() {
  const { user } = useUser()

  // 🔹 Pilih hero image berdasarkan role
  const heroImage = user?.role === "member" ? "/apk/hero1.jpeg" : "/apk/hero2.jpeg"

  return (
    <section className="relative pt-32 pb-24 bg-[#f8faf9] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
                Official Mobile App
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Download Aplikasi{" "}
                <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
                  Hablun
                </span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                Kelola komunitas, donasi, investasi syirkah, dan aktivitas ibadah
                dalam satu aplikasi terintegrasi yang aman dan terpercaya.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 text-gray-700 text-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="text-islamic-green-600" size={22} />
                <span>Platform komunitas & finansial Islami</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-islamic-green-600" size={22} />
                <span>Keamanan data sesuai standar industri</span>
              </div>
              <div className="flex items-center gap-3">
                <Download className="text-islamic-green-600" size={22} />
                <span>Gratis & mudah digunakan</span>
              </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            {user && (
              <div className="pt-6">
                <a
                  href="/hablun-app.apk"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-islamic-green-600 text-white font-semibold text-lg shadow-xl hover:bg-islamic-green-700 hover:shadow-2xl transition-all duration-300"
                >
                  <Download size={22} />
                  Download APK Sekarang
                </a>
                <p className="text-sm text-gray-400 mt-3">Versi terbaru • Android 8.0+</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE – PHONE MOCKUP */}
          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 bg-islamic-green-400/20 blur-3xl rounded-full" />
            <div className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[42px] shadow-2xl p-4">
              <div className="relative w-full h-full bg-black rounded-[34px] overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage}
                    alt="Hablun App Preview"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full border border-gray-800 z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}