export default function AboutIntro() {
  return (
    <section id="tentang" className="relative py-32 overflow-hidden bg-white">

      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-islamic-green-50/50 via-white to-white pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-islamic-green-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-islamic-green-50/60 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a05_1px,transparent_1px),linear-gradient(to_bottom,#16a34a05_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight text-gray-900">
          Apa Itu{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Hablun
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-islamic-green-100 rounded-full blur-sm opacity-70" />
          </span>
          ?
        </h2>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-[1px] w-14 bg-islamic-green-500/40" />
          <p className="text-xs tracking-[0.3em] font-semibold text-islamic-green-700 uppercase">
            Makna & Filosofi
          </p>
          <div className="h-[1px] w-14 bg-islamic-green-500/40" />
        </div>

        <p className="mt-12 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          <span className="font-semibold text-gray-900">Hablun</span> (حبل)
          berarti “tali” atau “ikatan” — simbol hubungan yang menyatukan
          spiritualitas, sosial, dan ekonomi dalam satu ekosistem digital.
        </p>

      </div>
    </section>
  )
}
