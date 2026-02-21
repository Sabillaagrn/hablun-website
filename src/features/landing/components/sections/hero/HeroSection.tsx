"use client"

import HeroBackground from "./HeroBackground"
import HeroContent from "./HeroContent"
import HeroVisual from "./HeroVisual"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8faf9] py-16 sm:py-20 lg:py-0"
    >
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Flex container with ordering for mobile, grid for desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-20">
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            <HeroContent />
          </div>
          
          {/* Laptop visual - order-2 on mobile (appears between content and CTA) */}
          <div className="w-full order-2 lg:order-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}