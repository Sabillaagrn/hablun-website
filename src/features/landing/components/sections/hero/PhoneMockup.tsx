"use client"

import Image from "next/image"

interface PhoneMockupProps {
  image1?: string
  image2?: string
}

export default function PhoneMockup({
  image1 = "/apk/hero1.jpeg",
  image2 = "/apk/hero2.jpeg",
}: PhoneMockupProps) {
  return (
    <>
      <style jsx>{`
        @keyframes phone-float-left {
          0%, 100% { transform: rotate(-15deg) translateY(-10px); }
          50% { transform: rotate(-15deg) translateY(-25px); }
        }
        @keyframes phone-float-right {
          0%, 100% { transform: rotate(15deg) translateY(10px); }
          50% { transform: rotate(15deg) translateY(-5px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">

        {/* ================= PHONE LEFT ================= */}
        <div
          className="relative w-[140px] sm:w-[160px] lg:w-[180px]"
          style={{
            transform: "rotate(-15deg)",
            animation: "phone-float-left 4s ease-in-out infinite",
          }}
        >
          <div className="relative w-full aspect-[9/19] rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 border-[6px] sm:border-[8px] border-gray-950 shadow-2xl overflow-hidden">
            
            {/* SCREEN */}
            <div className="absolute inset-[2px] rounded-[1.2rem] sm:rounded-[1.7rem] bg-black overflow-hidden">
              <Image
                src={image1}
                alt="APK Preview 1"
                fill
                className="object-contain"
                priority
              />
              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
            </div>

            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full z-20 border border-gray-800" />

            {/* Side reflection */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[2rem] opacity-60" />
          </div>

          {/* Glow */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-2xl rounded-full scale-110"
            style={{ animation: "glow 3s ease-in-out infinite" }}
          />
        </div>

        {/* ================= PHONE RIGHT ================= */}
        <div
          className="relative w-[140px] sm:w-[160px] lg:w-[180px]"
          style={{
            transform: "rotate(15deg)",
            animation: "phone-float-right 4s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        >
          <div className="relative w-full aspect-[9/19] rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 border-[6px] sm:border-[8px] border-gray-950 shadow-2xl overflow-hidden">

            {/* SCREEN */}
            <div className="absolute inset-[2px] rounded-[1.2rem] sm:rounded-[1.7rem] bg-black overflow-hidden">
              <Image
                src={image2}
                alt="APK Preview 2"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
            </div>

            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full z-20 border border-gray-800" />

            {/* Side reflection */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[2rem] opacity-60" />
          </div>

          {/* Glow */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 blur-2xl rounded-full scale-110"
            style={{ animation: "glow 3s ease-in-out infinite", animationDelay: "0.5s" }}
          />
        </div>

      </div>
    </>
  )
}
