import CommunityHeader from "./CommunityHeader"
import PositioningCard from "./PositioningCard"
import SegmentCard from "./SegmentCard"
import { segmentItems } from "./community-attraction-data"

export default function CommunityAttractionSection() {
  return (
    <section
      id="benefits"
      className="relative py-28 md:py-32 overflow-hidden bg-gradient-to-b from-[#f9fdfb] via-white to-[#f4faf7]"
    >
      {/* Glow Background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-islamic-green-400/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 right-[-150px] w-[500px] h-[500px] bg-islamic-green-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <CommunityHeader />
        <PositioningCard />

        <div className="grid md:grid-cols-2 gap-10">
          {segmentItems.map((item, index) => (
            <SegmentCard
              key={index}
              label={item.label}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
