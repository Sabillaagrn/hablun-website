import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "../../features/landing/components/layout/Navbar"
import Footer from "../../features/landing/components/layout/Footer"

export const metadata = {
  title: "Kebijakan Privasi | Hablun",
}

/* ======================== TYPES ======================== */

type SectionItem = {
  title?: string
  text: string
}

type Section = {
  title: string
  content: SectionItem[]
}

/* ======================== PAGE ======================== */

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#f8faf9]">

        {/* Decorative Background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-4xl mx-auto px-6">

          {/* Header */}
          <header className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
              Data Protection & Privacy
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
              Kebijakan Privasi{" "}
              <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
                Hablun
              </span>
            </h1>

            <p className="mt-5 text-sm text-gray-500">
              Terakhir diperbarui: 3 Februari 2026
            </p>

            <Divider />
          </header>

          {/* Content Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-xl p-8 md:p-14 space-y-14">
            <Intro />

            {sections.map((section, index) => (
              <PrivacySection key={index} section={section} />
            ))}

            <ContactBox />
          </div>

        </div>
      </section>
    </>
  )
}

/* ======================== COMPONENTS ======================== */

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <div className="h-px w-14 bg-islamic-green-400/50" />
      <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
      <div className="h-px w-14 bg-islamic-green-400/50" />
    </div>
  )
}

function Intro() {
  return (
    <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
      <p>
        Hablun (&apos;Kami&apos;) berkomitmen untuk melindungi dan menghormati privasi Anda.
        Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
        menyimpan, dan melindungi data pribadi sesuai dengan
        UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
      </p>
    </div>
  )
}

function PrivacySection({ section }: { section: Section }) {
  return (
    <article className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        <span className="bg-gradient-to-r from-islamic-green-600 to-islamic-green-800 bg-clip-text text-transparent">
          {section.title}
        </span>
      </h2>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        {section.content.map((item, index) => (
          <p key={index}>
            {item.title && (
              <span className="font-semibold text-islamic-green-700">
                {item.title}{" "}
              </span>
            )}
            {item.text}
          </p>
        ))}
      </div>
    </article>
  )
}

function ContactBox() {
  return (
    <div className="bg-islamic-green-50 border border-islamic-green-200 rounded-2xl p-8 text-center space-y-5">

      <h3 className="text-xl font-semibold text-islamic-green-800">
        Punya Pertanyaan Terkait Privasi?
      </h3>

      <p className="text-gray-700 max-w-md mx-auto leading-relaxed">
        Jika Anda memiliki pertanyaan atau ingin menggunakan hak Anda
        sebagai subjek data, silakan hubungi kami melalui halaman resmi
        Kontak Kami.
      </p>

      <Link
        href="/kontak"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-islamic-green-600 text-white hover:bg-islamic-green-700 transition shadow-md"
      >
        Kunjungi Halaman Kontak
        <ArrowRight size={18} />
      </Link>

    </div>
  )
}

/* ======================== DATA ======================== */

const sections: Section[] = [
  {
    title: "1. Data yang Kami Kumpulkan",
    content: [
      { title: "Identitas Pribadi:", text: "Nama lengkap, NIK, email, nomor telepon, dan foto profil." },
      { title: "Data Transaksi:", text: "Donasi, investasi Syirkah, riwayat E-commerce, dan aktivitas P2P Lending." },
      { title: "Data Ibadah & Komunitas:", text: "Preferensi waktu salat dan grup komunitas." },
      { title: "Data Teknis:", text: "Alamat IP, jenis perangkat, serta log aktivitas platform." },
    ],
  },
  {
    title: "2. Tujuan Pemrosesan Data",
    content: [
      { text: "Menyediakan layanan finansial, sosial, dan ibadah." },
      { text: "Verifikasi Know Your Customer (KYC)." },
      { text: "Meningkatkan performa platform melalui analisis anonim." },
      { text: "Mengirim notifikasi transaksi dan aktivitas komunitas." },
    ],
  },
  {
    title: "3. Dasar Pemrosesan Data",
    content: [
      { title: "Persetujuan:", text: "Saat pengguna mendaftar akun." },
      { title: "Kewajiban Kontrak:", text: "Untuk transaksi Syirkah atau E-commerce." },
      { title: "Kewajiban Hukum:", text: "Kepatuhan terhadap regulasi Indonesia." },
    ],
  },
]
