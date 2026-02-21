export default function CommunityHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-24">
      <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-6">
        Community Appeal
      </p>

      <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight text-gray-900">
        Mengapa{" "}
        <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
          Hablun Dicintai
        </span>{" "}
        Komunitas
      </h2>

      <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
        Hablun bukan sekadar aplikasi, melainkan{" "}
        <span className="font-semibold text-gray-900">
          Safe & Productive Circle
        </span>{" "}
        — ruang aman bagi generasi muda untuk mengelola ekonomi,
        membangun relasi sosial, dan bertumbuh secara spiritual
        dalam satu ekosistem terintegrasi.
      </p>

      <div className="flex items-center justify-center gap-4 mt-10">
        <div className="h-[1px] w-14 bg-islamic-green-400/50" />
        <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
        <div className="h-[1px] w-14 bg-islamic-green-400/50" />
      </div>
    </div>
  )
}
