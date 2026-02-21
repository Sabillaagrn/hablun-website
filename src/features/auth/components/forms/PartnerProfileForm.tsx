"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Briefcase,
  ClipboardList,
  Handshake,
  Building2,
  Image,
  Loader2,
  Rocket,
} from "lucide-react"

/* ======================== TYPES ======================== */

type FormState = {
  legal_name: string
  business_type: string
  nib_npwp: string
  owner_name: string
  office_address: string
  industry_category: string
  business_description: string
  business_scale: string
  special_offer: string
  collaboration_need: string
  payment_methods: string
  partnership_model: string
  referral_code: string
  logo: string | File
  product_photos: string | File
  social_links: string
}

const steps = [
  { id: 1, label: "Identitas",    icon: Building2 },
  { id: 2, label: "Deskripsi",   icon: ClipboardList },
  { id: 3, label: "Kolaborasi",  icon: Handshake },
]

/* ======================== MAIN PAGE ======================== */

interface Props {
  onSuccess: () => void
}

export default function PartnerProfileForm({ onSuccess }: Props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [logoName, setLogoName] = useState<string | null>(null)
  const [productName, setProductName] = useState<string | null>(null)

  const [form, setForm] = useState<FormState>({
    legal_name: "",
    business_type: "",
    nib_npwp: "",
    owner_name: "",
    office_address: "",
    industry_category: "",
    business_description: "",
    business_scale: "",
    special_offer: "",
    collaboration_need: "",
    payment_methods: "",
    partnership_model: "",
    referral_code: "",
    logo: "",
    product_photos: "",
    social_links: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (e.target.name === "logo") setLogoName(file.name)
      if (e.target.name === "product_photos") setProductName(file.name)
      setForm({ ...form, [e.target.name]: file })
    }
  }

  function isFile(file: any): file is File {
    return file instanceof File
  }

  const handleFileUpload = async (file: File, bucket: string) => {
    setUploading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("bucket", bucket)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    const json = await res.json()
    setUploading(false)
    if (!res.ok) { alert(`Upload gagal: ${json.error}`); return "" }
    return json.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let logoUrl = form.logo
      let productPhotosUrl = form.product_photos

      // Upload file kalau berupa File
      if (isFile(form.logo)) {
        logoUrl = await handleFileUpload(form.logo, "partner-logos")
      }

      if (isFile(form.product_photos)) {
        productPhotosUrl = await handleFileUpload(
          form.product_photos,
          "partner-products"
        )
      }

      const payload = {
        ...form,
        logo: logoUrl,
        product_photos: productPhotosUrl,
      }

      const res = await fetch("/api/profile/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal simpan profil")
      }

      // 🔥 panggil parent redirect
      onSuccess()

    } catch (err: any) {
      alert("Gagal simpan profil: " + err.message)
    }
  }


  return (
    <section className="relative w-screen h-screen overflow-auto bg-gradient-to-b from-green-50 to-white py-10">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">

        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
            Pendaftaran Mitra
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
            Lengkapi{" "}
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Profil Mitra
            </span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Informasi ini membantu kami menghubungkan bisnis Anda dengan komunitas yang tepat.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-14 bg-islamic-green-400/50" />
            <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
            <div className="h-px w-14 bg-islamic-green-400/50" />
          </div>
        </header>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isDone = currentStep > step.id
            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => isDone && setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-1.5 ${isDone ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                    ${isActive
                      ? "bg-islamic-green-600 text-white shadow-lg shadow-islamic-green-600/30 scale-110"
                      : isDone
                      ? "bg-islamic-green-100 text-islamic-green-700"
                      : "bg-white border-2 border-gray-200 text-gray-400"
                    }
                  `}>
                    {isDone ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} strokeWidth={1.75} />}
                  </div>
                  <span className={`text-[11px] font-medium tracking-wide hidden sm:block transition-colors ${
                    isActive ? "text-islamic-green-700" : isDone ? "text-islamic-green-500" : "text-gray-400"
                  }`}>
                    {step.label}
                  </span>
                </button>

                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2 mb-5 sm:mb-6 relative overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="absolute inset-y-0 left-0 bg-islamic-green-400 rounded-full transition-all duration-500"
                      style={{ width: currentStep > step.id ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── STEP 1: IDENTITAS BISNIS ── */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card icon={<Building2 size={18} strokeWidth={1.75} />} title="Identitas Bisnis" desc="Informasi legal dan pemilik usaha Anda">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nama Resmi Bisnis" required className="sm:col-span-2">
                    <input name="legal_name" value={form.legal_name} onChange={handleChange} placeholder="PT. Nama Perusahaan Anda" className={inputCls} required />
                  </Field>
                  <Field label="Tipe Bisnis">
                    <input name="business_type" value={form.business_type} onChange={handleChange} placeholder="PT, CV, UD, Perorangan..." className={inputCls} />
                  </Field>
                  <Field label="NIB / NPWP">
                    <input name="nib_npwp" value={form.nib_npwp} onChange={handleChange} placeholder="Nomor NIB atau NPWP" className={inputCls} />
                  </Field>
                  <Field label="Nama Pemilik" className="sm:col-span-2">
                    <input name="owner_name" value={form.owner_name} onChange={handleChange} placeholder="Nama lengkap pemilik atau PIC" className={inputCls} />
                  </Field>
                  <Field label="Alamat Kantor" className="sm:col-span-2">
                    <textarea name="office_address" value={form.office_address} onChange={handleChange} placeholder="Alamat lengkap kantor atau operasional" className={textareaCls} />
                  </Field>
                </div>
              </Card>

              <div className="flex justify-end">
                <StepBtn onClick={() => setCurrentStep(2)}>
                  Lanjutkan <ArrowRight size={16} />
                </StepBtn>
              </div>
            </div>
          )}

          {/* ── STEP 2: DESKRIPSI & SKALA ── */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card icon={<ClipboardList size={18} strokeWidth={1.75} />} title="Deskripsi & Skala Bisnis" desc="Ceritakan lebih dalam tentang usaha Anda">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Kategori Industri">
                      <input name="industry_category" value={form.industry_category} onChange={handleChange} placeholder="F&B, Teknologi, Retail..." className={inputCls} />
                    </Field>
                    <Field label="Skala Bisnis">
                      <input name="business_scale" value={form.business_scale} onChange={handleChange} placeholder="Mikro, Kecil, Menengah, Besar" className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Deskripsi Bisnis">
                    <textarea name="business_description" value={form.business_description} onChange={handleChange} placeholder="Ceritakan produk/jasa, target pasar, dan keunggulan bisnis Anda..." className={`${textareaCls} min-h-[110px]`} />
                  </Field>
                  <Field label="Penawaran Khusus">
                    <textarea name="special_offer" value={form.special_offer} onChange={handleChange} placeholder="Mis: Diskon khusus anggota komunitas, bundling produk, trial gratis..." className={textareaCls} />
                  </Field>
                </div>
              </Card>

              <div className="flex gap-3">
                <BackBtn onClick={() => setCurrentStep(1)} />
                <StepBtn onClick={() => setCurrentStep(3)}>
                  Lanjutkan <ArrowRight size={16} />
                </StepBtn>
              </div>
            </div>
          )}

          {/* ── STEP 3: KOLABORASI & ASET ── */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card icon={<Handshake size={18} strokeWidth={1.75} />} title="Model Kolaborasi" desc="Bagaimana Anda ingin bermitra dengan komunitas?">
                <div className="space-y-4">
                  <Field label="Kebutuhan Kolaborasi">
                    <textarea name="collaboration_need" value={form.collaboration_need} onChange={handleChange} placeholder="Mis: Mencari reseller, agen, atau mitra distribusi..." className={textareaCls} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Metode Pembayaran">
                      <input name="payment_methods" value={form.payment_methods} onChange={handleChange} placeholder="Transfer, QRIS, COD..." className={inputCls} />
                    </Field>
                    <Field label="Model Kemitraan">
                      <input name="partnership_model" value={form.partnership_model} onChange={handleChange} placeholder="Reseller, Afiliasi, Waralaba..." className={inputCls} />
                    </Field>
                    <Field label="Kode Referral">
                      <input name="referral_code" value={form.referral_code} onChange={handleChange} placeholder="Opsional" className={inputCls} />
                    </Field>
                    <Field label="Link Media Sosial">
                      <input name="social_links" value={form.social_links} onChange={handleChange} placeholder="instagram.com/bisnisku" className={inputCls} />
                    </Field>
                  </div>
                </div>
              </Card>

              <Card icon={<Image size={18} strokeWidth={1.75} />} title="Aset Visual" desc="Logo dan foto produk untuk profil mitra Anda">
                <div className="space-y-4">
                  {/* Logo Upload */}
                  <Field label="Logo Bisnis">
                    <label htmlFor="logo-upload" className="block cursor-pointer">
                      <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${
                        logoName
                          ? "border-islamic-green-400 bg-islamic-green-50"
                          : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"
                      }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${logoName ? "bg-islamic-green-100 text-islamic-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {logoName ? <Check size={18} strokeWidth={2} /> : <Upload size={18} strokeWidth={1.75} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{logoName ?? "Upload logo bisnis Anda"}</p>
                          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG · Maks 5MB · Disarankan persegi</p>
                        </div>
                      </div>
                    </label>
                    <input id="logo-upload" type="file" name="logo" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </Field>

                  {/* Product Photos Upload */}
                  <Field label="Foto Produk">
                    <label htmlFor="product-upload" className="block cursor-pointer">
                      <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${
                        productName
                          ? "border-islamic-green-400 bg-islamic-green-50"
                          : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"
                      }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${productName ? "bg-islamic-green-100 text-islamic-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {productName ? <Check size={18} strokeWidth={2} /> : <Image size={18} strokeWidth={1.75} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{productName ?? "Upload foto produk atau layanan"}</p>
                          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG · Maks 5MB</p>
                        </div>
                      </div>
                    </label>
                    <input id="product-upload" type="file" name="product_photos" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </Field>
                </div>
              </Card>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 hover:from-islamic-green-700 hover:to-islamic-green-800 text-white text-sm font-semibold py-4 rounded-2xl shadow-lg shadow-islamic-green-600/20 hover:shadow-xl hover:shadow-islamic-green-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {uploading
                    ? <><Loader2 size={16} className="animate-spin" /> Mengupload...</>
                    : <><Rocket size={16} /> Simpan & Daftarkan Mitra</>
                  }
                </button>
                <BackBtn onClick={() => setCurrentStep(2)} full />
              </div>
            </div>
          )}

        </form>
      </div>
    </section>
  )
}

/* ======================== SHARED COMPONENTS ======================== */

function Card({ icon, title, desc, children }: {
  icon: React.ReactNode
  title: string
  desc?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-islamic-green-100 flex items-center justify-center text-islamic-green-700 shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">{title}</h2>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function Field({ label, required, children, className }: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

function StepBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 bg-islamic-green-600 hover:bg-islamic-green-700 text-white text-sm font-semibold py-3.5 px-6 rounded-2xl shadow-md shadow-islamic-green-600/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-islamic-green-600/25 transition-all"
    >
      {children}
    </button>
  )
}

function BackBtn({ onClick, full }: { onClick: () => void; full?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "w-full" : ""} flex items-center justify-center gap-2 border border-gray-200 bg-white hover:border-islamic-green-300 hover:text-islamic-green-700 text-gray-500 text-sm font-medium py-3.5 px-6 rounded-2xl transition-all`}
    >
      <ArrowLeft size={16} /> Kembali
    </button>
  )
}

/* ======================== CONSTANTS ======================== */

const inputCls =
  "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all"

const textareaCls =
  "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all resize-y min-h-[90px] leading-relaxed"