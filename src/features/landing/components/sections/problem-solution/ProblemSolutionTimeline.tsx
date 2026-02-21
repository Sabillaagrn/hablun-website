import ProblemSolutionItem from "./ProblemSolutionItem"
import { problemSolutionItems } from "./problem-solution-data"

export default function ProblemSolutionTimeline() {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-islamic-green-200 -translate-x-1/2 hidden md:block" />

      <div className="space-y-24">
        {problemSolutionItems.map((item, index) => (
          <ProblemSolutionItem
            key={index}
            problem={item.problem}
            solution={item.solution}
          />
        ))}
      </div>
    </div>
  )
}
