import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroContent() {
  return (
    <>
      {/* Top Content - Badge, Title, Subtitle */}
      <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-1">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-islamic-green-100 text-islamic-green-700 text-xs sm:text-sm font-medium animate-fade-up">
          <Sparkles size={14} className="sm:w-4 sm:h-4" />
          Ekosistem Digital Komunitas
        </div>

        {/* Title */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight animate-fade-up delay-100">
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Hablun
            </span>
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 animate-fade-up delay-200 justify-center lg:justify-start">
            <div className="h-[1px] w-8 sm:w-12 bg-islamic-green-500/60" />
            <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-semibold text-islamic-green-700 uppercase">
              Tebar Manfaat, Raih Berkah
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up delay-300 px-4 sm:px-0">
          Menghubungkan nilai, ekonomi, dan spiritualitas dalam satu
          platform yang transparan, aman, dan saling menguatkan.
        </p>
      </div>

      {/* CTA - Separated for ordering */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fade-up delay-500 order-3 lg:order-2">
        <Link
          href="#"
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-islamic-green-700 text-white font-semibold shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.05] text-center"
        >
          <span className="relative z-10">Bergabung</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
        </Link>

        <Link
          href="#"
          className="flex items-center gap-2 text-islamic-green-700 font-medium hover:gap-3 transition-all duration-300"
        >
          Pelajari lebih lanjut
          <ArrowRight size={18} />
        </Link>
      </div>
    </>
  )
}