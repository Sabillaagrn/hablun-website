import { missionItems } from "./missionData"
import MissionCard from "./MissionCard"

export default function MissionSection() {
  return (
    <div className="relative py-28 md:py-32 overflow-hidden bg-[#f8faf9]">

      {/* Background */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-5">
            Our Commitments
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight text-gray-900">
            Misi{" "}
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Hablun
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1px] w-14 bg-islamic-green-400/50" />
            <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
            <div className="h-[1px] w-14 bg-islamic-green-400/50" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {missionItems.map((item, index) => (
            <MissionCard
              key={index}
              index={index}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
