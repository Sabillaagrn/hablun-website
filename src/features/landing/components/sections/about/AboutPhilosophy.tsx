import { Handshake, ShieldCheck, Network } from "lucide-react"
import PremiumCard from "./PremiumCard"

export default function AboutPhilosophy() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#f8faf9]">

      {/* Background */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Text */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold text-gray-900 leading-snug">
              Tali Ikatan yang Menguatkan
            </h3>

            <p className="text-gray-600 leading-relaxed text-lg">
              Terinspirasi dari konsep
              <span className="font-semibold"> Hablun minallah</span> dan
              <span className="font-semibold"> Hablun minannas</span>,
              platform ini menghubungkan nilai spiritual dan hubungan sosial
              produktif dalam satu sistem yang terintegrasi.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              Kami membangun ruang yang aman, transparan, dan saling
              menguatkan antar anggota komunitas dengan fondasi amanah
              dan keberlanjutan.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-5">
            <PremiumCard
              icon={Handshake}
              title="Hubungan"
              desc="Membangun koneksi yang kuat dan bermakna antar anggota komunitas."
            />

            <PremiumCard
              icon={ShieldCheck}
              title="Amanah"
              desc="Transparansi dan kepercayaan sebagai fondasi utama setiap interaksi."
            />

            <PremiumCard
              icon={Network}
              title="Ekosistem Terintegrasi"
              desc="Sosial, bisnis, dan komunitas dalam satu platform yang saling mendukung."
            />
          </div>

        </div>
      </div>
    </section>
  )
}
