"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "../../context/UserContext"

export default function Navbar() {
  const { user, setUser } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeAnchor, setActiveAnchor] = useState<string>("")
  const pathname = usePathname()
  const router = useRouter()

  // Menu items
  const menuItems = useMemo(() => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Tentang Kami", href: "#tentang" },
      { label: "Syarat & Ketentuan", href: "/terms" },
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Kontak Kami", href: "/kontak" },
    ]
    if (user) items.push({ label: "Download", href: "/download" })
    return items
  }, [user])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active anchor highlight for single-page sections
  useEffect(() => {
    if (pathname !== "/") {
      setActiveAnchor("")
      return
    }

    const handleSectionHighlight = () => {
      let found = false
      menuItems.forEach((item) => {
        if (!item.href.startsWith("#")) return
        const section = document.getElementById(item.href.replace("#", ""))
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveAnchor(item.href)
          found = true
        }
      })
      if (!found) setActiveAnchor("")
    }

    window.addEventListener("scroll", handleSectionHighlight)
    handleSectionHighlight()
    return () => window.removeEventListener("scroll", handleSectionHighlight)
  }, [pathname, menuItems])

  const handleAnchorClick = (href: string) => {
    const anchorId = href.replace("#", "")
    if (pathname === "/") {
      const section = document.getElementById(anchorId)
      if (section) section.scrollIntoView({ behavior: "smooth" })
      setActiveAnchor(href)
    } else {
      router.push(`/#${anchorId}`)
      setTimeout(() => setActiveAnchor(href), 50)
    }
    setMobileOpen(false)
  }

  const isActiveMenu = (itemHref: string) => {
    if (itemHref.startsWith("#")) return activeAnchor === itemHref
    if (itemHref === "/") return pathname === "/" && activeAnchor === ""
    return pathname === itemHref
  }

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null) // hapus user langsung
      // Navbar otomatis update → tombol login/daftar muncul
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500">
      <div
        className={`transition-all duration-500 w-full ${
          scrolled
            ? "max-w-6xl mt-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/40"
            : "max-w-full bg-white"
        }`}
      >
        <div
          className="flex items-center justify-between px-4 sm:px-6 md:px-16 transition-all duration-500"
          style={{
            paddingTop: scrolled ? "0.5rem" : "1.5rem",
            paddingBottom: scrolled ? "0.5rem" : "1.5rem",
          }}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 md:gap-3 group"
            onClick={() => setActiveAnchor("")}
          >
            <div
              className="relative transition-all duration-300"
              style={{ width: scrolled ? "32px" : "44px", height: scrolled ? "32px" : "44px" }}
            >
              <Image src="/logo-hablun.png" alt="Logo Hablun" fill className="object-contain" priority />
            </div>
            <span
              className="font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-300"
              style={{ fontSize: scrolled ? "1.2rem" : "1.5rem" }}
            >
              Hablun
            </span>
          </Link>

          {/* MENU Desktop */}
          <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-gray-700 justify-center flex-1">
            {menuItems.map((item, i) => {
              const active = isActiveMenu(item.href)
              return item.href.startsWith("#") ? (
                <button
                  key={i}
                  onClick={() => handleAnchorClick(item.href)}
                  className={`group relative py-2 transition-all duration-300 font-semibold ${
                    active ? "text-islamic-green-700" : "hover:text-islamic-green-700"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-islamic-green-500 to-islamic-green-700 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={i}
                  href={item.href}
                  className="relative group py-2 font-semibold"
                  style={{ fontSize: "0.85rem" }}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-islamic-green-500 to-islamic-green-700 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* AUTH BUTTONS Desktop */}
          <div className="hidden md:flex items-center gap-3 ml-auto transition-all duration-300">
            {user ? (
              <>
                <span className="text-gray-700 text-sm font-semibold">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-islamic-green-600 text-islamic-green-700 transition-all duration-300 text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:from-islamic-green-700 hover:to-islamic-green-800 text-sm"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-islamic-green-700 transition duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-lg border-t border-gray-200 transition-all duration-300">
            <nav className="flex flex-col px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4">
              {menuItems.map((item, i) =>
                item.href.startsWith("#") ? (
                  <button
                    key={i}
                    onClick={() => handleAnchorClick(item.href)}
                    className="py-1.5 sm:py-2 text-gray-700 font-semibold hover:text-islamic-green-700 transition duration-300 text-left text-sm"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={i}
                    href={item.href}
                    className="py-1.5 sm:py-2 text-gray-700 font-semibold hover:text-islamic-green-700 transition duration-300 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 text-sm">
                {user ? (
                  <>
                    <span className="text-gray-700 font-semibold">
                      {user.name} ({user.role})
                    </span>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileOpen(false)
                      }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-islamic-green-700 border border-islamic-green-600 text-center font-semibold hover:bg-islamic-green-50 transition-all duration-300"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 text-center font-semibold shadow-md hover:from-islamic-green-700 hover:to-islamic-green-800 transition-all duration-300"
                      onClick={() => setMobileOpen(false)}
                    >
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}