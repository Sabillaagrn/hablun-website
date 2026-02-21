"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Globe, Facebook, Instagram } from "lucide-react"
import { FaTiktok } from "react-icons/fa" // TikTok official icon

export default function Footer() {
  const phones = [
    "0813 1230 9340",
    "0813 2211 4435",
    "0812 2237 8349",
  ]

  const emails = [
    "marketing@hablunhub.com",
    "sony.sumaryo@yahoo.co.id",
  ]

  return (
    <footer id="kontak" className="relative overflow-hidden text-white">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-islamic-green-800 via-islamic-green-700 to-islamic-green-600 pointer-events-none -z-10" />

      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-islamic-green-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-islamic-green-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-14 z-10">

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-12 gap-14">

          {/* ===== BRAND ===== */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 relative rounded-2xl bg-white shadow-lg overflow-hidden">
                <Image
                  src="/logo-hablun.png"
                  alt="Logo Hablun"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Hablun
              </h3>
            </div>

            <p className="text-white/90 text-sm leading-relaxed max-w-md">
              Safe & Productive Digital Circle untuk generasi yang ingin
              bertumbuh secara finansial, sosial, dan spiritual dalam
              ekosistem komunitas yang terintegrasi.
            </p>

            <p className="font-semibold tracking-wide text-islamic-green-100">
              Tebar Manfaat • Raih Berkah
            </p>
          </div>

          {/* ===== WEBSITE ===== */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-islamic-green-200">
              Website
            </h4>

            <a
              href="https://hablunhub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-white/90 hover:text-islamic-green-200 transition"
            >
              <Globe size={16} />
              hablunhub.com
            </a>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.25em] text-islamic-green-200">
              Kontak
            </h4>

            <div className="space-y-3 text-sm">
              {phones.map((phone, i) => {
                const formatted = phone.replace(/\D/g, "").replace(/^0/, "62")
                return (
                  <a
                    key={i}
                    href={`https://wa.me/${formatted}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/90 hover:text-islamic-green-200 transition"
                  >
                    <Phone size={15} />
                    {phone}
                  </a>
                )
              })}

              {emails.map((email, i) => (
                <a
                  key={i}
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-white/90 hover:text-islamic-green-200 transition"
                >
                  <Mail size={15} />
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* ===== SOCIAL ===== */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-islamic-green-200">
              Media Sosial
            </h4>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61585475575531&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-islamic-green-500/30 hover:bg-islamic-green-400 transition duration-300 hover:scale-105"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/hablunhub?igsh=YWE3bTk0aXdvbWwy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-islamic-green-500/30 hover:bg-islamic-green-400 transition duration-300 hover:scale-105"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.tiktok.com/@hablunhub?_r=1&_t=ZS-944hYRTZgns"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-islamic-green-500/30 hover:bg-islamic-green-400 transition duration-300 hover:scale-105"
              >
                <FaTiktok size={20}  />
              </a>
            </div>
          </div>

        </div>

        {/* ===== BOTTOM ===== */}
        <div className="mt-16 border-t border-islamic-green-400/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">

          <p>
            © {new Date().getFullYear()} Hablun. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-islamic-green-200 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-islamic-green-200 transition"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}
