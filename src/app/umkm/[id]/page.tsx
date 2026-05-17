"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  MessageCircle,
  Tag,
  ChevronRight,
  ShieldCheck,
  Truck,
  Star,
  Leaf,
  Store,
  Check,
} from "lucide-react"

import { products } from "../data"

export default function DetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const product = products.find((p) => p.id === Number(id))

  const [activeImg, setActiveImg] = useState<string>(
    product?.images?.[0] ?? product?.image ?? "/products/default.jpg"
  )

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <Store size={24} className="text-red-400" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Produk tidak ditemukan
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Produk mungkin sudah dihapus atau tidak tersedia.
          </p>

          <button
            onClick={() => router.push("/umkm")}
            className="mt-6 h-11 rounded-2xl bg-green-700 px-5 text-sm font-medium text-white hover:bg-green-800 transition"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const details = [
    { label: "Kategori", value: product.category },
    { label: "Kondisi", value: product.condition },
    { label: "Asal Produk", value: product.origin },
    { label: "Jenis", value: product.type },
  ]

  return (
    <div className="min-h-screen bg-[#f6f7f8]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">

          <button
            onClick={() => router.push("/umkm")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-2 overflow-hidden text-sm">
            <span
              onClick={() => router.push("/umkm")}
              className="cursor-pointer whitespace-nowrap text-gray-400 hover:text-green-700 transition"
            >
              Produk UMKM
            </span>

            <ChevronRight size={14} className="text-gray-300" />

            <span className="truncate font-medium text-gray-800">
              {product.name}
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">

        {/* HERO */}
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">

          {/* IMAGE */}
          <div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">

              <div className="relative aspect-[4/3.3]">

                <Image
                  src={activeImg}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Produk Pilihan
                  </span>
                </div>
              </div>
            </div>

            {/* THUMBNAIL */}
            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {product.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(src)}
                    className={`relative h-[72px] w-[72px] overflow-hidden rounded-2xl border transition ${
                      activeImg === src
                        ? "border-green-600"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-4">

            {/* TITLE */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <div className="mb-4 flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-700">
                  <Tag size={11} />
                  {product.category}
                </span>

                <div className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                  <Star
                    size={11}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  Produk berkualitas
                </div>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-6 border-t border-dashed border-gray-100 pt-5">
                <p className="mb-2 text-xs text-gray-400">
                  Harga Produk
                </p>

                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-green-700">
                    Rp {product.price.toLocaleString("id-ID")}
                  </h2>

                  <span className="mb-1 text-sm text-gray-400">
                    / produk
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-3xl bg-green-700 p-6 text-white">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                  <Leaf size={18} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-green-200">
                    Deskripsi Produk
                  </p>

                  <h3 className="text-lg font-semibold">
                    Tentang Produk
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-7 text-white/90">
                {product.description}
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-3">

              {[
                {
                  icon: ShieldCheck,
                  label: "Terjamin",
                },
                {
                  icon: Truck,
                  label: "Pengiriman",
                },
                {
                  icon: Leaf,
                  label: "Produk Lokal",
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-4 text-center"
                >
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <Icon size={16} className="text-green-700" />
                  </div>

                  <p className="text-[11px] font-medium text-gray-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ABOUT */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50">
                  <Leaf size={18} className="text-green-700" />
                </div>

                <div>
                  <p className="text-xs font-medium text-green-700">
                    Informasi Produk
                  </p>

                  <h2 className="text-xl font-bold text-gray-900">
                    Tentang Produk
                  </h2>
                </div>
              </div>

              <div className="space-y-4">

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm leading-7 text-gray-600">
                    {product.about}
                  </p>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                  <p className="mb-2 text-sm font-semibold text-green-800">
                    Cerita Produk
                  </p>

                  <p className="text-sm leading-7 text-green-900/80">
                    {product.story}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm leading-7 text-gray-600">
                    {product.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* BENEFITS */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Keunggulan Produk
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">

                {product.benefits?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check size={12} className="text-green-700" />
                    </div>

                    <p className="text-sm leading-6 text-gray-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* DETAIL */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-900">
                Detail Produk
              </h3>

              <div className="space-y-4">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-dashed border-gray-100 pb-4 last:border-none last:pb-0"
                  >
                    <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-400">
                      {item.label}
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SELLER */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50">
                <Store size={18} className="text-green-700" />
              </div>

              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                Penjual Produk
              </p>

              <h3 className="text-xl font-bold text-gray-900">
                {product.seller}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {product.sellerDescription}
              </p>

              <a
                href={`https://wa.me/${product.sellerPhone}?text=${encodeURIComponent(
                  `Halo ${product.seller}, saya tertarik dengan produk ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6 flex h-11 w-full items-center justify-center gap-2
                  rounded-2xl bg-green-700
                  text-sm font-medium text-white
                  transition hover:bg-green-800
                "
              >
                <MessageCircle size={16} />
                Hubungi Penjual
              </a>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-14">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="mb-1 text-xs font-medium text-green-700">
                  Rekomendasi Produk
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Produk Terkait
                </h2>
              </div>

              <button
                onClick={() => router.push("/umkm")}
                className="text-sm text-green-700 hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/umkm/${p.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:shadow-md"
                >

                  <div className="relative aspect-[4/4.2] overflow-hidden bg-gray-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">

                    <p className="min-h-[44px] text-sm font-medium leading-6 text-gray-800 line-clamp-2">
                      {p.name}
                    </p>

                    <p className="mt-3 text-base font-bold text-green-700">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
} 