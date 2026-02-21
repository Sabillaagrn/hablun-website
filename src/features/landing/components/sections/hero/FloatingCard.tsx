"use client"

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FloatingCardProps {
  icon: LucideIcon
  color: string
  bg: string
  size?: number
  delay?: string
  duration?: string
  className?: string
}

export default function FloatingCard({
  icon: Icon,
  color,
  bg,
  size = 20,
  delay = "0s",
  duration = "4s",
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`absolute rounded-2xl bg-gradient-to-br ${bg} backdrop-blur-sm border-2 shadow-xl flex items-center justify-center animate-float ${className}`}
      style={{
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <Icon className={color} size={size} strokeWidth={2} />
    </div>
  )
}