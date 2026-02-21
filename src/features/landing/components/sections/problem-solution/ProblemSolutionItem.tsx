type Props = {
  problem: string
  solution: string
}

export default function ProblemSolutionItem({
  problem,
  solution
}: Props) {
  return (
    <div className="relative grid md:grid-cols-2 gap-16 items-start">
      {/* Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-islamic-green-600 rounded-full shadow-md hidden md:block" />

      {/* Problem */}
      <div className="md:text-right md:pr-16">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
          Tantangan
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {problem}
        </p>
      </div>

      {/* Solution */}
      <div className="md:pl-16">
        <p className="text-xs uppercase tracking-[0.3em] text-islamic-green-600 mb-4">
          Solusi Hablun
        </p>
        <p className="text-gray-900 text-sm leading-relaxed font-semibold">
          {solution}
        </p>
      </div>
    </div>
  )
}
