"use client"

import { ShoppingCart, GraduationCap, Heart, Wallet, Bell, LucideIcon } from "lucide-react"
import MockupHp from "./PhoneMockup"

interface FloatingCardProps {
  icon: LucideIcon
  color: string
  bg: string
  size?: number
  delay?: string
  className?: string
}

function FloatingCard({
  icon: Icon,
  color,
  bg,
  size = 20,
  delay = "0s",
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`absolute rounded-2xl bg-gradient-to-br ${bg} backdrop-blur-sm border-2 shadow-xl flex items-center justify-center ${className}`}
      style={{
        animation: "float 3s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <Icon className={color} size={size} strokeWidth={2} />
    </div>
  )
}

export default function HeroVisual() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rotate-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes float-circle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>

      <div className="relative flex justify-center items-center h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 -z-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/10" />

          <div
            className="absolute top-[10%] left-[15%] w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            style={{ animation: "float-circle 6s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[15%] right-[10%] w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
            style={{ animation: "float-circle 8s ease-in-out infinite", animationDelay: "1s" }}
          />
        </div>

        {/* Floating Cards */}
        <div className="hidden sm:block">
          <FloatingCard
            icon={ShoppingCart}
            color="text-emerald-600"
            bg="from-emerald-50 to-emerald-100"
            className="top-[10%] left-[5%] w-16 h-16 border-emerald-100"
          />
          <FloatingCard
            icon={GraduationCap}
            color="text-blue-600"
            bg="from-blue-50 to-blue-100"
            delay="0.5s"
            className="top-[10%] right-[11%] w-20 h-20 border-blue-100"
          />
          <FloatingCard
            icon={Heart}
            color="text-red-600"
            bg="from-red-50 to-rose-100"
            delay="1s"
            className="bottom-[45%] left-[2%] w-16 h-16 border-rose-100"
          />
          <FloatingCard
            icon={Wallet}
            color="text-amber-600"
            bg="from-amber-50 to-amber-100"
            delay="1.5s"
            className="bottom-[12%] left-[15%] w-16 h-16 border-amber-100"
          />
          <FloatingCard
            icon={Bell}
            color="text-purple-600"
            bg="from-purple-50 to-purple-100"
            delay="0.8s"
            className="bottom-[18%] right-[5%] w-20 h-20 border-purple-100"
          />
        </div>

        {/* Phone Mockup */}
        <MockupHp />

      </div>
    </>
  )
}
