import Navbar from "../../features/landing/components/layout/Navbar"
import Footer from "../../features/landing/components/layout/Footer"

export const metadata = {
  title: "Syarat & Ketentuan | Hablun",
}

/* ======================== TYPES ======================== */

type SectionItem = {
  number: string
  text: string
}

type Section = {
  title: string
  content: SectionItem[]
}

/* ======================== PAGE ======================== */

export default function TermsPage() {
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
              Legal & Compliance
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
              Syarat & Ketentuan{" "}
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
              <LegalSection key={index} section={section} />
            ))}
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
        Selamat datang di <strong>Hablun</strong>. Dengan mendaftar,
        mengakses, atau menggunakan platform ini, Anda menyatakan telah
        membaca, memahami, dan menyetujui untuk terikat secara hukum oleh
        Syarat dan Ketentuan ini.
      </p>

      <p>
        Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini,
        mohon untuk segera menghentikan penggunaan layanan kami.
      </p>
    </div>
  )
}

function LegalSection({ section }: { section: Section }) {
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
            <span className="font-semibold text-islamic-green-700">
              {item.number}
            </span>{" "}
            {item.text}
          </p>
        ))}
      </div>
    </article>
  )
}

/* ======================== DATA ======================== */

const sections: Section[] = [
  {
    title: "1. Kepatuhan terhadap Regulasi Republik Indonesia",
    content: [
      {
        number: "1.1.",
        text: "Hablun beroperasi sepenuhnya di bawah hukum Negara Kesatuan Republik Indonesia.",
      },
      {
        number: "1.2.",
        text: "Platform ini melarang keras penggunaan identitas, simbol, narasi, maupun ajakan yang berafiliasi dengan organisasi yang telah dilarang oleh Pemerintah Republik Indonesia.",
      },
      {
        number: "1.3.",
        text: "Pelanggaran terhadap poin ini akan mengakibatkan pemutusan layanan permanen serta pelaporan kepada pihak berwenang.",
      },
    ],
  },
  {
    title: "2. Netralitas dan Moderasi Konten",
    content: [
      {
        number: "2.1.",
        text: "Hablun adalah platform netral yang memfasilitasi berbagai organisasi Islam legal.",
      },
      {
        number: "2.2.",
        text: "Pengguna dilarang melakukan ujaran kebencian, penodaan agama, atau memicu konflik SARA.",
      },
      {
        number: "2.3.",
        text: "Hablun berhak menghapus konten yang tidak sesuai dengan nilai moderasi beragama.",
      },
    ],
  },
  {
    title: "3. Ketentuan Modul Finansial",
    content: [
      {
        number: "3.1.",
        text: "Hablun bertindak sebagai penyedia platform teknologi dan bukan lembaga penjamin simpanan.",
      },
      {
        number: "3.2.",
        text: "Setiap aktivitas investasi memiliki risiko kerugian bisnis dan Hablun tidak bertanggung jawab atas kegagalan usaha mitra.",
      },
      {
        number: "3.3.",
        text: "Pengguna wajib memberikan data identitas (KYC) yang akurat sesuai hukum yang berlaku.",
      },
    ],
  },
  {
    title: "4. Batasan Tanggung Jawab (Disclaimer)",
    content: [
      {
        number: "4.1.",
        text: "Hablun tidak bertanggung jawab atas sengketa antar-pengguna dalam modul E-commerce atau interaksi sosial.",
      },
      {
        number: "4.2.",
        text: "Kami tidak menjamin layanan bebas gangguan teknis namun berkomitmen melakukan perbaikan berkala.",
      },
    ],
  },
  {
    title: "5. Privasi dan Data Pengguna",
    content: [
      {
        number: "5.1.",
        text: "Hablun melindungi data pribadi sesuai dengan UU Perlindungan Data Pribadi.",
      },
      {
        number: "5.2.",
        text: "Data dapat digunakan untuk analisis layanan dan kepatuhan regulasi keuangan syariah.",
      },
    ],
  },
  {
    title: "6. Perubahan Syarat dan Ketentuan",
    content: [
      {
        number: "6.1.",
        text: "Hablun berhak mengubah S&K sewaktu-waktu dan penggunaan berkelanjutan dianggap sebagai persetujuan.",
      },
    ],
  },
]
