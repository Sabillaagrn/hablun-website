"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
  current: number
  total: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null

  // limit jumlah page yg ditampilkan
  const getPages = () => {
    const pages: number[] = []

    const start = Math.max(1, current - 2)
    const end = Math.min(total, current + 2)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
    }

  const pages = getPages()

  return (
    <div className="flex items-center justify-center mt-8 gap-2 flex-wrap">
      
      {/* PREV */}
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className={`flex items-center justify-center w-9 h-9 rounded-lg border transition
        ${
          current === 1
            ? "text-gray-300 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* FIRST (kalau jauh) */}
      {pages[0] > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="w-9 h-9 rounded-lg border text-sm hover:bg-gray-100"
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {/* PAGE NUMBERS */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition
          ${
            current === p
              ? "bg-islamic-green-600 text-white shadow-md"
              : "border text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {/* LAST (kalau jauh) */}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && (
            <span className="px-1 text-gray-400">...</span>
          )}
          <button
            onClick={() => onChange(total)}
            className="w-9 h-9 rounded-lg border text-sm hover:bg-gray-100"
          >
            {total}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className={`flex items-center justify-center w-9 h-9 rounded-lg border transition
        ${
          current === total
            ? "text-gray-300 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}