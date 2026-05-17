"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import {
  ArrowLeft,
  Store,
  ChevronRight,
  ShieldCheck,
  Search,
} from "lucide-react"

import { products, categories } from "./data"
import ProductCard from "./components/ProductCard"
import CategoryFilter from "./components/CategoryFilter"
import Pagination from "./components/Pagination"

const heroSlides = [
  {
    title: "Kuliner UMKM Nusantara",
    subtitle:
      "Temukan makanan dan minuman lokal terbaik dari pelaku usaha Indonesia.",
    image:
      "/products/p1.jpg",
  },
  {
    title: "Fashion & Produk Kreatif Lokal",
    subtitle:
      "Dukung brand fashion, kerajinan, dan karya kreatif UMKM Indonesia.",
    image:
      "/products/p2.jpg",
  },
  {
    title: "Produk UMKM Modern",
    subtitle:
      "Marketplace modern untuk mendukung bisnis lokal berkembang lebih luas.",
    image:
      "/products/p7.jpg",
  },
  {
    title: "Jasa Profesional Terpercaya",
    subtitle:
      "Temukan layanan digital, otomotif, dan jasa kreatif terbaik.",
    image:
      "/products/p6.jpg",
  },
]

export default function UmkmPage() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [page, setPage] = useState(1)
  const [activeSlide, setActiveSlide] = useState(0)

  const perPage = 8

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        category === "Semua" || p.category === category

      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [search, category])

  const totalPage = Math.ceil(filtered.length / perPage) || 1

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  )

  useEffect(() => {
    setPage(1)
  }, [search, category])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [page])

  return (
    <div className="min-h-screen bg-[#f3f6f5]">

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden">

        {/* Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                activeSlide === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-green-950/80" />
            </div>
          ))}
        </div>

        {/* Decorative Blur */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-green-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-300/10 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 px-5 md:px-10 lg:px-20 pt-8 pb-24">

          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition mb-8 group"
          >
            <ArrowLeft
              size={17}
              className="group-hover:-translate-x-1 transition-transform"
            />

            Kembali ke Dashboard
          </button>

          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 mb-5">
              <Store
                size={14}
                className="text-green-300"
              />

              <span className="text-xs font-medium text-white/90">
                Marketplace UMKM Indonesia
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Produk Usaha
              <span className="text-green-700"> HABLUN</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm md:text-base text-white/75 leading-7 max-w-xl">
              {heroSlides[activeSlide].subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mt-7">

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
                <p className="text-xl font-bold text-white">
                  {products.length}+
                </p>

                <p className="text-[11px] text-white/60 mt-1">
                  Produk UMKM
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
                <p className="text-xl font-bold text-white">
                  {categories.length - 1}
                </p>

                <p className="text-[11px] text-white/60 mt-1">
                  Kategori
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
                <p className="text-xl font-bold text-white">
                  Lokal
                </p>

                <p className="text-[11px] text-white/60 mt-1">
                  Indonesia
                </p>
              </div>
            </div>

            {/* Slider Indicator */}
            <div className="flex items-center gap-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === index
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 64L80 69.3C160 75 320 85 480 85.3C640 85 800 75 960 58.7C1120 43 1280 21 1360 10.7L1440 0V120H0V64Z"
              fill="#f3f6f5"
            />
          </svg>
        </div>
      </section>

      {/* ───────────────── FILTER AREA ───────────────── */}
      <section className="relative z-20 px-5 md:px-10 lg:px-20 mt-8">

        {/* Search */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-2xl">

            <div
              className="
                flex items-center gap-3
                h-[62px]
                px-5
                rounded-2xl
                bg-white
                border border-gray-200
                shadow-sm
                transition-all duration-300
                focus-within:border-green-500
                focus-within:shadow-lg
                focus-within:shadow-green-100
              "
            >

              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50">
                <Search
                  size={18}
                  className="text-green-700"
                />
              </div>

              {/* Input */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari makanan, fashion, jasa, minuman..."
                className="
                  flex-1 bg-transparent outline-none
                  text-sm md:text-[15px]
                  text-gray-800
                  placeholder:text-gray-400
                  font-medium
                "
              />

              {/* Reset */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
                    text-xs font-semibold
                    text-red-500
                    hover:text-red-600
                    transition
                  "
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Product Count */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">

              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Store
                  size={18}
                  className="text-green-700"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800">
                  {filtered.length} Produk
                </p>

                <p className="text-xs text-gray-400">
                  Marketplace HABLUN
                </p>
              </div>
            </div>

            {/* Verified */}
            <div
              className="
                hidden md:flex
                items-center gap-2
                rounded-2xl
                bg-green-50
                border border-green-100
                px-4 py-3
                text-xs font-semibold text-green-700
              "
            >
              <ShieldCheck size={14} />
              Produk Terverifikasi
            </div>

            {/* Page */}
            <div
              className="
                flex items-center gap-2
                rounded-2xl
                bg-white
                border border-gray-200
                px-4 py-3
                text-xs font-medium text-gray-600
                shadow-sm
              "
            >
              <span>Hal.</span>

              <span className="font-bold text-gray-900">
                {page}
              </span>

              <ChevronRight size={12} />

              <span>{totalPage}</span>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-6 overflow-x-auto scrollbar-none pb-1">
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={(cat) => {
              setCategory(cat)
              setPage(1)
            }}
          />
        </div>
      </section>

      {/* ───────────────── PRODUCT GRID ───────────────── */}
      <section className="px-5 md:px-10 lg:px-20 pt-10 pb-16">

        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {paginated.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">

            <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-5">
              <Store
                size={30}
                className="text-gray-300"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Produk tidak ditemukan
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm leading-7 text-gray-400">
              Coba gunakan kata kunci lain atau ubah filter kategori.
            </p>

            <button
              onClick={() => {
                setSearch("")
                setCategory("Semua")
              }}
              className="
                mt-6 h-11 px-5
                rounded-2xl
                bg-green-700 hover:bg-green-800
                text-sm font-semibold text-white
                transition-all duration-200
                hover:shadow-lg hover:shadow-green-200
              "
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="mt-14 flex justify-center">
            <Pagination
              current={page}
              total={totalPage}
              onChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  )
}