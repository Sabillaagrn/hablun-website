export default function HeroBackground() {
  return (
    <>
      {/* Glow - Responsive sizing */}
      <div className="absolute top-[-100px] sm:top-[-150px] lg:top-[-200px] left-[-100px] sm:left-[-150px] lg:left-[-200px] w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-islamic-green-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] sm:bottom-[-150px] lg:bottom-[-200px] right-[-100px] sm:right-[-150px] lg:right-[-200px] w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-islamic-green-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Grid - Responsive sizing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a0d_1px,transparent_1px),linear-gradient(to_bottom,#16a34a0d_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px] lg:bg-[size:60px_60px]" />
    </>
  )
}