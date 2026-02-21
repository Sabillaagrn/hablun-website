export default function ProblemSolutionHeader() {
  return (
    <div className="text-center mb-24">
      <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-6">
        Why We Exist
      </p>

      <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight text-gray-900">
        Dari{" "}
        <span className="text-gray-400 font-semibold">Tantangan</span>{" "}
        Menuju{" "}
        <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
          Solusi Terintegrasi
        </span>
      </h2>

      <p className="mt-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Hablun lahir dari realitas generasi muda hari ini —
        mengubah berbagai tantangan sosial, finansial, dan spiritual
        menjadi solusi yang terintegrasi dalam satu ekosistem.
      </p>

      <div className="flex items-center justify-center gap-4 mt-10">
        <div className="h-[1px] w-14 bg-islamic-green-400/50" />
        <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
        <div className="h-[1px] w-14 bg-islamic-green-400/50" />
      </div>
    </div>
  )
}
