"use client"

import {
  Grid2X2,
  UtensilsCrossed,
  Coffee,
  Shirt,
  BriefcaseBusiness,
  Package,
} from "lucide-react"

interface Props {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

const categoryIcons: Record<string, any> = {
  Semua: Grid2X2,
  Makanan: UtensilsCrossed,
  Minuman: Coffee,
  Fashion: Shirt,
  Jasa: BriefcaseBusiness,
  Kerajinan: Package,
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: Props) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex gap-2 min-w-max pb-1">

        {categories.map((cat) => {
          const isActive = active === cat

          const Icon =
            categoryIcons[cat] || Package

          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`
                flex items-center gap-2
                px-4 h-11
                rounded-xl
                border
                whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? `
                      bg-green-700
                      border-green-700
                      text-white
                      shadow-sm
                    `
                    : `
                      bg-white
                      border-gray-200
                      text-gray-600
                      hover:border-green-200
                      hover:text-green-700
                    `
                }
              `}
            >

              {/* Icon */}
              <Icon
                size={16}
                className={
                  isActive
                    ? "text-white"
                    : "text-green-700"
                }
              />

              {/* Text */}
              <span className="text-sm font-medium">
                {cat}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}