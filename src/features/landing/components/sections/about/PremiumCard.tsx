import { LucideIcon } from "lucide-react"

interface PremiumCardProps {
  icon: LucideIcon
  title: string
  desc: string
}

export default function PremiumCard({
  icon: Icon,
  title,
  desc,
}: PremiumCardProps) {
  return (
    <div className="relative p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300">

      <div className="flex items-start gap-4">

        <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-islamic-green-100 to-islamic-green-50 text-islamic-green-700 shadow-sm">
          <Icon size={20} />
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-semibold text-gray-900">
            {title}
          </h4>

          <div className="h-[2px] w-6 bg-islamic-green-600/70 rounded-full" />

          <p className="text-gray-600 text-sm leading-relaxed">
            {desc}
          </p>
        </div>

      </div>
    </div>
  )
}
