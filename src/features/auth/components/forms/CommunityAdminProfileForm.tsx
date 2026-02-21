"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Users,
  UserCog,
  FileText,
  Check,
  Loader2,
  Rocket,
  Image,
  Building2,
} from "lucide-react"

/* ======================== TYPES ======================== */
type FormState = {
  community_name: string
  category: string
  vision_mission: string
  headquarters: string
  admin_full_name: string
  admin_position: string
  admin_whatsapp: string
  admin_email: string
  estimated_members: string
  required_features: string
  legal_document: string | File
  has_business_unit: boolean
  bank_account: string
  logo: string | File
}

function isFile(file: any): file is File {
  return file instanceof File
}

const steps = [
  { id: 1, label: "Komunitas", icon: Building2 },
  { id: 2, label: "Admin", icon: UserCog },
  { id: 3, label: "Dokumen", icon: FileText },
]

/* ======================== MAIN COMPONENT ======================== */

interface Props {
  onSuccess: () => void
}

export default function CommunityAdminProfileForm({ onSuccess }: Props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [logoName, setLogoName] = useState<string | null>(null)
  const [docName, setDocName] = useState<string | null>(null)

  const [form, setForm] = useState<FormState>({
    community_name: "",
    category: "",
    vision_mission: "",
    headquarters: "",
    admin_full_name: "",
    admin_position: "",
    admin_whatsapp: "",
    admin_email: "",
    estimated_members: "",
    required_features: "",
    legal_document: "",
    has_business_unit: false,
    bank_account: "",
    logo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target
    const name = target.name
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value
    setForm({ ...form, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (e.target.name === "logo") setLogoName(file.name)
      if (e.target.name === "legal_document") setDocName(file.name)
      setForm({ ...form, [e.target.name]: file })
    }
  }

  const handleFileUpload = async (file: File, bucket: string) => {
    const data = new FormData()
    data.append("file", file)
    data.append("bucket", bucket)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    const json = await res.json()
    if (!res.ok) { alert(`Upload gagal: ${json.error}`); return "" }
    return json.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let logoUrl = form.logo
      let legalUrl = form.legal_document

      if (isFile(form.logo)) {
        logoUrl = await handleFileUpload(form.logo, "community-logos")
      }

      if (isFile(form.legal_document)) {
        legalUrl = await handleFileUpload(
          form.legal_document,
          "community-docs"
        )
      }

      const payload = {
        ...form,
        logo: logoUrl,
        legal_document: legalUrl,
        estimated_members: parseInt(form.estimated_members) || 0,
      }

      const res = await fetch("/api/profile/community-admin", {
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
      alert("Terjadi kesalahan: " + err.message)
    } finally {
      setUploading(false)
    }
  }


  return (
    <section className="relative w-screen min-h-screen overflow-auto bg-gradient-to-b from-green-50 to-white py-10 px-4 md:px-0">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
            Pendaftaran Pengelola
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Lengkapi{" "}
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Profil Komunitas
            </span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Daftarkan komunitas Anda dan mulai kelola anggota dalam satu platform.
          </p>
        </header>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
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
                  <span className={`text-[11px] font-medium tracking-wide hidden sm:block transition-colors ${isActive ? "text-islamic-green-700" : isDone ? "text-islamic-green-500" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2 mb-5 sm:mb-6 relative overflow-hidden bg-gray-200 rounded-full">
                    <div className="absolute inset-y-0 left-0 bg-islamic-green-400 rounded-full transition-all duration-500" style={{ width: currentStep > step.id ? "100%" : "0%" }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1: INFO KOMUNITAS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card icon={<Building2 size={18} />} title="Informasi Komunitas" desc="Data dasar komunitas yang akan Anda daftarkan">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nama Komunitas" required className="sm:col-span-2">
                      <input name="community_name" value={form.community_name} onChange={handleChange} placeholder="Mis: Komunitas Pengusaha Muslim Jakarta" className={inputCls} required />
                    </Field>
                    <Field label="Kategori Komunitas">
                      <input name="category" value={form.category} onChange={handleChange} placeholder="Bisnis, Dakwah, Sosial..." className={inputCls} />
                    </Field>
                    <Field label="Lokasi / Kantor Pusat">
                      <input name="headquarters" value={form.headquarters} onChange={handleChange} placeholder="Kota, Provinsi" className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Visi & Misi">
                    <textarea name="vision_mission" value={form.vision_mission} onChange={handleChange} placeholder="Ceritakan visi, misi, dan tujuan komunitas Anda..." className={`${textareaCls} min-h-[110px]`} />
                  </Field>
                </div>
              </Card>
              <div className="flex justify-end">
                <StepBtn onClick={() => setCurrentStep(2)}>Lanjutkan <ArrowRight size={16} /></StepBtn>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ADMIN */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card icon={<UserCog size={18} />} title="Data Pengelola (Admin)" desc="Informasi kontak penanggung jawab komunitas">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nama Lengkap Admin" required className="sm:col-span-2">
                    <input name="admin_full_name" value={form.admin_full_name} onChange={handleChange} placeholder="Nama lengkap admin utama" className={inputCls} required />
                  </Field>
                  <Field label="Jabatan">
                    <input name="admin_position" value={form.admin_position} onChange={handleChange} placeholder="Ketua, Sekretaris, Manager..." className={inputCls} />
                  </Field>
                  <Field label="No. WhatsApp" required>
                    <input name="admin_whatsapp" value={form.admin_whatsapp} onChange={handleChange} placeholder="08xxxxxxxxxx" className={inputCls} required />
                  </Field>
                  <Field label="Email Admin" className="sm:col-span-2">
                    <input name="admin_email" type="email" value={form.admin_email} onChange={handleChange} placeholder="admin@komunitas.com" className={inputCls} />
                  </Field>
                </div>
              </Card>

              <Card icon={<Users size={18} />} title="Detail Keanggotaan" desc="Gambaran skala dan kebutuhan komunitas">
                <div className="space-y-4">
                  <Field label="Perkiraan Jumlah Anggota">
                    <input name="estimated_members" type="number" value={form.estimated_members} onChange={handleChange} placeholder="Mis: 500" className={inputCls} />
                  </Field>
                  <Field label="Fitur yang Dibutuhkan">
                    <textarea name="required_features" value={form.required_features} onChange={handleChange} placeholder="Mis: Manajemen iuran, broadcast pesan, direktori anggota, event..." className={textareaCls} />
                  </Field>
                </div>
              </Card>

              <div className="flex gap-3">
                <BackBtn onClick={() => setCurrentStep(1)} />
                <StepBtn onClick={() => setCurrentStep(3)}>Lanjutkan <ArrowRight size={16} /></StepBtn>
              </div>
            </div>
          )}

          {/* STEP 3: DOKUMEN & LOGO */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card icon={<FileText size={18} />} title="Dokumen Legal" desc="Dokumen legalitas komunitas untuk proses verifikasi">
                <Field label="Dokumen Legal (SK, Akta, dll)">
                  <label htmlFor="doc-upload" className="block cursor-pointer">
                    <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${docName ? "border-islamic-green-400 bg-islamic-green-50" : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${docName ? "bg-islamic-green-100 text-islamic-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {docName ? <Check size={18} strokeWidth={2} /> : <FileText size={18} strokeWidth={1.75} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 truncate max-w-[280px]">{docName ?? "Upload dokumen legalitas"}</p>
                        <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG · Maks 10MB</p>
                      </div>
                    </div>
                  </label>
                  <input id="doc-upload" type="file" name="legal_document" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
                </Field>
              </Card>

              <Card icon={<Image size={18} />} title="Logo & Keuangan" desc="Logo komunitas dan informasi rekening (opsional)">
                <div className="space-y-4">
                  <Field label="Logo Komunitas">
                    <label htmlFor="logo-upload" className="block cursor-pointer">
                      <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${logoName ? "border-islamic-green-400 bg-islamic-green-50" : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${logoName ? "bg-islamic-green-100 text-islamic-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {logoName ? <Check size={18} strokeWidth={2} /> : <Image size={18} strokeWidth={1.75} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 truncate max-w-[280px]">{logoName ?? "Upload logo komunitas"}</p>
                          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG · Maks 5MB · Disarankan persegi</p>
                        </div>
                      </div>
                    </label>
                    <input id="logo-upload" type="file" name="logo" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </Field>

                  {/* Checkbox Unit Bisnis */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${form.has_business_unit ? "bg-islamic-green-600 border-islamic-green-600" : "border-gray-300 bg-white group-hover:border-islamic-green-400"}`}>
                      {form.has_business_unit && <Check size={12} strokeWidth={3} className="text-white" />}
                    </div>
                    <input type="checkbox" name="has_business_unit" checked={form.has_business_unit} onChange={handleChange} className="hidden" />
                    <span className="text-sm font-medium text-gray-700">Komunitas memiliki unit bisnis</span>
                  </label>

                  {form.has_business_unit && (
                    <Field label="Rekening Bank">
                      <input name="bank_account" value={form.bank_account} onChange={handleChange} placeholder="Mis: BCA 1234567890 a.n. Komunitas XYZ" className={inputCls} />
                    </Field>
                  )}
                </div>
              </Card>

              <div className="space-y-3">
                <button type="submit" disabled={uploading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 hover:from-islamic-green-700 hover:to-islamic-green-800 text-white text-sm font-semibold py-4 rounded-2xl shadow-lg shadow-islamic-green-600/20 hover:shadow-xl hover:shadow-islamic-green-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                  {uploading ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : <><Rocket size={16} /> Simpan & Daftarkan Komunitas</>}
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
function Card({ icon, title, desc, children }: { icon: React.ReactNode; title: string; desc?: string; children: React.ReactNode }) {
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

function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
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
    <button type="button" onClick={onClick} className="flex-1 flex items-center justify-center gap-2 bg-islamic-green-600 hover:bg-islamic-green-700 text-white text-sm font-semibold py-3.5 px-6 rounded-2xl shadow-md shadow-islamic-green-600/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-islamic-green-600/25 transition-all">
      {children}
    </button>
  )
}

function BackBtn({ onClick, full }: { onClick: () => void; full?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`${full ? "w-full" : ""} flex items-center justify-center gap-2 border border-gray-200 bg-white hover:border-islamic-green-300 hover:text-islamic-green-700 text-gray-500 text-sm font-medium py-3.5 px-6 rounded-2xl transition-all`}>
      <ArrowLeft size={16} /> Kembali
    </button>
  )
}

/* ======================== CONSTANTS ======================== */
const inputCls = "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all"
const textareaCls = "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all resize-y min-h-[90px] leading-relaxed"
