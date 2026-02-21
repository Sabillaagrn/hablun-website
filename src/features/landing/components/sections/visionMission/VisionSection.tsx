export default function VisionSection() {
  return (
    <div className="relative py-28 md:py-32 overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-islamic-green-50/40 via-white to-white pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-islamic-green-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-islamic-green-50/50 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-5">
          Our Direction
        </p>

        <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight text-gray-900">
          Visi{" "}
          <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
            Hablun
          </span>
        </h2>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-[1px] w-14 bg-islamic-green-400/50" />
          <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
          <div className="h-[1px] w-14 bg-islamic-green-400/50" />
        </div>

        <p className="mt-10 text-lg md:text-xl text-gray-600 leading-relaxed">
          “Menjadi ekosistem digital terdepan yang memberdayakan generasi muda
          untuk mencapai{" "}
          <span className="font-semibold text-gray-900">
            kemandirian finansial
          </span>
          ,{" "}
          <span className="font-semibold text-gray-900">
            kesalehan sosial
          </span>
          , dan{" "}
          <span className="font-semibold text-gray-900">
            pertumbuhan spiritual
          </span>{" "}
          dalam satu ikatan yang terintegrasi.”
        </p>

      </div>
    </div>
  )
}
