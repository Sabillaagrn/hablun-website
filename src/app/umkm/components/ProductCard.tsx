"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  PhoneCallIcon,
  MapPin,
  BadgeCheck,
} from "lucide-react"

import { Product } from "../types"

export default function ProductCard({
  product,
}: {
  product: Product
}) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/umkm/${product.id}`)}
      className="
        group cursor-pointer overflow-hidden
        rounded-2xl border border-gray-200/80
        bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-black/5
        hover:border-green-100
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />

        {/* category */}
        <div
          className="
            absolute top-3 left-3
            inline-flex items-center gap-1.5
            rounded-full
            bg-white/90 backdrop-blur-md
            border border-white/60
            px-2.5 py-1
            text-[10px] font-semibold text-gray-700
            shadow-sm
          "
        >
          <BadgeCheck size={11} className="text-green-600" />
          {product.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3.5">

        {/* TITLE */}
        <h3
          className="
            line-clamp-2
            min-h-[40px]
            text-sm font-semibold
            leading-snug text-gray-800
            transition-colors
            group-hover:text-green-700
          "
        >
          {product.name}
        </h3>

        {/* SELLER */}
        <div className="mt-2 flex items-center gap-1.5">
          <MapPin size={12} className="text-gray-400" />

          <p className="truncate text-[11px] text-gray-500">
            {product.origin || "Indonesia"}
          </p>
        </div>

        {/* PRICE + BUTTON */}
        <div className="mt-4 flex items-end justify-between gap-2">

          {/* PRICE */}
          <div>
            <p className="text-[10px] text-gray-400 mb-1">
              Harga
            </p>

            <p className="text-base font-bold text-green-700 leading-none">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* BUTTON */}
          <a
            href={`https://wa.me/${product.sellerPhone}?text=${encodeURIComponent(
              `Halo ${product.seller}, saya tertarik dengan produk ${product.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              inline-flex items-center justify-center gap-1.5
              h-9 px-3.5
              rounded-xl
              bg-green-700
              text-white text-[11px] font-semibold
              transition-all duration-200
              hover:bg-green-800
              hover:shadow-md hover:shadow-green-200
              active:scale-[0.98]
              flex-shrink-0
            "
          >
            <PhoneCallIcon size={13} />
            Hubungi
          </a>
        </div>
      </div>
    </div>
  )
}