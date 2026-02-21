interface MissionCardProps {
  index: number
  title: string
  desc: string
}

export default function MissionCard({
  index,
  title,
  desc,
}: MissionCardProps) {
  return (
    <div className="space-y-4 group">

      <span className="text-sm font-semibold text-islamic-green-600">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h4 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-islamic-green-700 transition-colors">
        {title}
      </h4>

      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>

      <div className="w-12 h-[1px] bg-islamic-green-300 group-hover:w-20 transition-all duration-300" />
    </div>
  )
}
