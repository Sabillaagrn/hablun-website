import ProblemSolutionHeader from "./ProblemSolutionHeader"
import ProblemSolutionTimeline from "./ProblemSolutionTimeline"

export default function ProblemSolutionSection() {
  return (
    <section
      id="problems-solutions"
      className="relative py-28 md:py-32 overflow-hidden bg-gradient-to-b from-[#f9fdfb] via-white to-[#f4faf7]"
    >
      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-islamic-green-400/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[500px] h-[500px] bg-islamic-green-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-6">
        <ProblemSolutionHeader />
        <ProblemSolutionTimeline />
      </div>
    </section>
  )
}
