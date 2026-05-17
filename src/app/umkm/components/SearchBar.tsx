"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  const [focus, setFocus] = useState(false)

  return (
    <div
      className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border transition-all duration-200 bg-white
      ${
        focus
          ? "border-islamic-green-500 shadow-md ring-1 ring-islamic-green-200"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* ICON SEARCH */}
      <Search
        className={`w-5 h-5 transition ${
          focus ? "text-islamic-green-600" : "text-gray-400"
        }`}
      />

      {/* INPUT */}
      <input
        type="text"
        placeholder="Cari produk UMKM..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
      />

      {/* CLEAR BUTTON */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}