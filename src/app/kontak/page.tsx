"use client"

import { Mail, Phone, MapPin, Send, Facebook, Instagram } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import { useState } from "react"
import { UserProvider } from "../../features/landing/context/UserContext" 
import Navbar from "../../features/landing/components/layout/Navbar"
import Footer from "../../features/landing/components/layout/Footer"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Pesan berhasil dikirim 🚀")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <UserProvider>
      <Navbar />

      <section
        id="kontak"
        className="relative pt-28 pb-20 md:pt-32 md:pb-24 bg-[#f8faf9] overflow-hidden"
      >
        {/* Background dekoratif */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <header className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
              Get in Touch
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
              Hubungi{" "}
              <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
                Hablun
              </span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Kami siap membantu Anda terkait layanan, investasi Syirkah,
              komunitas, maupun pertanyaan lainnya.
            </p>
          </header>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT INFO */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="text-islamic-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">marketing@hablunhub.com</p>
                  <p className="text-gray-600">sony.sumaryo@yahoo.co.id</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-islamic-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">0813 1230 9340</p>
                  <p className="text-gray-600">0813 2211 4435</p>
                  <p className="text-gray-600">0812 2237 8349</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-islamic-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Alamat</h3>
                  <p className="text-gray-600">Jakarta Selatan, Indonesia</p>
                </div>
              </div>

              <div className="bg-islamic-green-50 p-6 rounded-2xl border border-islamic-green-200">
                <p className="text-gray-700">
                  Jam operasional: <br />
                  Senin - Jumat, 09.00 – 17.00 WIB
                </p>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61585475575531&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-islamic-green-50 hover:bg-islamic-green-100 transition cursor-pointer"
                >
                  <Facebook className="text-islamic-green-600" size={24} />
                </a>

                <a
                  href="https://www.instagram.com/hablunhub?igsh=YWE3bTk0aXdvbWwy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-islamic-green-50 hover:bg-islamic-green-100 transition cursor-pointer"
                >
                  <Instagram className="text-islamic-green-600" size={24} />
                </a>

                <a
                  href="https://www.tiktok.com/@hablunhub?_r=1&_t=ZS-944hYRTZgns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-islamic-green-50 hover:bg-islamic-green-100 transition cursor-pointer"
                >
                  <FaTiktok className="text-islamic-green-600 w-6 h-6" />
                </a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-3xl p-8 space-y-6 border border-gray-100"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-islamic-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-islamic-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Pesan
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-islamic-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-islamic-green-600 text-white py-3 rounded-xl hover:bg-islamic-green-700 transition font-medium"
              >
                Kirim Pesan
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </UserProvider>
  )
}
