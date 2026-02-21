"use client"

import { useState } from "react"
import {
  Camera,
  User,
  Briefcase,
  Target,
  ShieldCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  Rocket,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  CreditCard,
  Loader2,
  Check,
} from "lucide-react"

/* ======================== TYPES ======================== */

interface MemberForm {
  full_name: string
  username: string
  whatsapp: string
  domicile: string
  profession: string
  business_name: string
  industry: string
  skills: string
  current_needs: string
  interests: string
  join_purpose: string
  profile_photo: string
  ktp_file: string
}

const steps = [
  { id: 1, label: "Identitas",   icon: User },
  { id: 2, label: "Profesional", icon: Briefcase },
  { id: 3, label: "Minat",       icon: Target },
  { id: 4, label: "Verifikasi",  icon: ShieldCheck },
]

/* ======================== MAIN PAGE ======================== */
interface Props {
  onSuccess: () => void
}

export default function MemberProfileForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [ktpReady, setKtpReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [form, setForm] = useState<MemberForm>({
    full_name: "",
    username: "",
    whatsapp: "",
    domicile: "",
    profession: "",
    business_name: "",
    industry: "",
    skills: "",
    current_needs: "",
    interests: "",
    join_purpose: "",
    profile_photo: "",
    ktp_file: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const uploadFile = async (file: File, bucket: string) => {
    try {
      const allowedTypes =
        bucket === "ktp-files"
          ? ["image/png", "image/jpeg", "image/jpg", "application/pdf"]
          : ["image/png", "image/jpeg", "image/jpg"]

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format file tidak didukung")
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", bucket)

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload gagal")
      return data.url
    } catch (err: any) {
      alert("Upload gagal, menggunakan preview sementara")
      return URL.createObjectURL(file) // fallback ke preview lokal
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setPhotoPreview(URL.createObjectURL(file))
    const url = await uploadFile(file, "profile-photos")
    setForm({ ...form, profile_photo: url })
  }

  const handleKtpUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setKtpReady(true)
    const url = await uploadFile(file, "ktp-files")
    setForm({ ...form, ktp_file: url })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/profile/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan profil")
      }

      // 🔥 panggil parent redirect
      onSuccess()

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative w-screen h-screen overflow-auto bg-gradient-to-b from-green-50 to-white py-10">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-islamic-green-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-islamic-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a08_1px,transparent_1px),linear-gradient(to_bottom,#16a34a08_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 space-y-10">

        {/* Header */}
        <header className="text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-4">
            Pendaftaran Anggota
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
            Lengkapi{" "}
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Profil Anda
            </span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Informasi ini membantu kami membangun koneksi terbaik untuk Anda.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-14 bg-islamic-green-400/50" />
            <div className="w-2 h-2 bg-islamic-green-500 rounded-full" />
            <div className="h-px w-14 bg-islamic-green-400/50" />
          </div>
        </header>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {currentStep === 1 && <Step1 form={form} handleChange={handleChange} photoPreview={photoPreview} handlePhotoUpload={handlePhotoUpload} setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Step2 form={form} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Step3 form={form} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <Step4 form={form} handleKtpUpload={handleKtpUpload} ktpReady={ktpReady} loading={loading} setCurrentStep={setCurrentStep} />}

        </form>
      </div>
    </section>
  )
}

/* ======================== STEP COMPONENTS ======================== */

function Step1({ form, handleChange, photoPreview, handlePhotoUpload, setCurrentStep }: any) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Foto Profil */}
      <Card icon={<Camera size={18} strokeWidth={1.75} />} title="Foto Profil" desc="Foto terbaik untuk profil komunitas Anda">
        <label htmlFor="photo-upload" className="block cursor-pointer">
          <div className="flex items-center gap-5 p-5 rounded-2xl border-2 border-dashed border-islamic-green-200 bg-islamic-green-50/50 hover:border-islamic-green-400 hover:bg-islamic-green-50 transition-all">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-islamic-green-400 shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-islamic-green-100 flex items-center justify-center shrink-0">
                <User size={28} strokeWidth={1.5} className="text-islamic-green-500" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-800">{photoPreview ? "Foto dipilih" : "Upload foto Anda"}</p>
              <p className="text-xs text-gray-400 mt-0.5">JPG, PNG · Maks 5MB · Disarankan 1:1</p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-islamic-green-700 bg-islamic-green-100 px-3 py-1.5 rounded-lg">
                <Upload size={12} /> {photoPreview ? "Ganti Foto" : "Pilih File"}
              </div>
            </div>
          </div>
        </label>
        <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
      </Card>

      {/* Data Pribadi */}
      <Card icon={<User size={18} strokeWidth={1.75} />} title="Data Pribadi" desc="Informasi dasar akun Anda">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nama Lengkap" required>
            <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Budi Santoso" className={inputCls} required />
          </Field>
          <Field label="Username" required>
            <input name="username" value={form.username} onChange={handleChange} placeholder="budi.santoso" className={inputCls} required />
          </Field>
          <Field label="No. WhatsApp" required>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="08xxxxxxxxxx" className={inputCls} required />
          </Field>
          <Field label="Domisili">
            <input name="domicile" value={form.domicile} onChange={handleChange} placeholder="Jakarta Selatan" className={inputCls} />
          </Field>
        </div>
      </Card>

      <div className="flex justify-end">
        <StepButton onClick={() => setCurrentStep(2)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

function Step2({ form, handleChange, setCurrentStep }: any) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card icon={<Briefcase size={18} strokeWidth={1.75} />} title="Informasi Profesional" desc="Ceritakan karir dan bisnis Anda">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Profesi">
            <input name="profession" value={form.profession} onChange={handleChange} placeholder="Co-Founder, Konsultan..." className={inputCls} />
          </Field>
          <Field label="Industri">
            <input name="industry" value={form.industry} onChange={handleChange} placeholder="Teknologi, F&B, Properti..." className={inputCls} />
          </Field>
          <Field label="Nama Bisnis" className="sm:col-span-2">
            <input name="business_name" value={form.business_name} onChange={handleChange} placeholder="PT. Nama Perusahaan Anda" className={inputCls} />
          </Field>
        </div>

        <div className="h-px bg-gray-100 my-2" />

        <div className="space-y-4">
          <Field label="Keahlian">
            <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Mis: Digital marketing, business development, product design..." className={textareaCls} />
          </Field>
          <Field label="Kebutuhan Saat Ini">
            <textarea name="current_needs" value={form.current_needs} onChange={handleChange} placeholder="Mis: Mencari mitra bisnis, investor, atau talent tertentu..." className={textareaCls} />
          </Field>
        </div>
      </Card>

      <div className="flex gap-3">
        <BackButton onClick={() => setCurrentStep(1)} />
        <StepButton onClick={() => setCurrentStep(3)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

function Step3({ form, handleChange, setCurrentStep }: any) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card icon={<Target size={18} strokeWidth={1.75} />} title="Minat & Tujuan" desc="Apa yang ingin Anda capai bersama komunitas?">
        <div className="space-y-4">
          <Field label="Minat">
            <textarea name="interests" value={form.interests} onChange={handleChange} placeholder="Mis: AI, startup, investasi, sustainability, kuliner..." className={textareaCls} />
          </Field>
          <Field label="Tujuan Bergabung">
            <textarea name="join_purpose" value={form.join_purpose} onChange={handleChange} placeholder="Mis: Memperluas jaringan bisnis, berbagi pengalaman, kolaborasi proyek..." className={`${textareaCls} min-h-[110px]`} />
          </Field>
        </div>
      </Card>

      <div className="flex gap-3">
        <BackButton onClick={() => setCurrentStep(2)} />
        <StepButton onClick={() => setCurrentStep(4)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

function Step4({ form, handleKtpUpload, ktpReady, loading, setCurrentStep }: any) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

      {/* KTP Upload */}
      <Card icon={<CreditCard size={18} strokeWidth={1.75} />} title="Upload KTP" desc="Untuk verifikasi identitas akun Anda">
        <label htmlFor="ktp-upload" className="block cursor-pointer">
          <div
            className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all ${ktpReady ? "border-islamic-green-400 bg-islamic-green-50" : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"}`}
          >
            {ktpReady ? (
              <div className="flex items-center justify-center gap-2 text-islamic-green-700">
                <CheckCircle2 size={20} strokeWidth={1.75} />
                <span className="text-sm font-semibold">File KTP berhasil diupload</span>
              </div>
            ) : (
              <>
                <CreditCard size={32} strokeWidth={1.25} className="text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-700">Klik untuk upload KTP</p>
                <p className="text-xs text-gray-400 mt-1">Format JPG, PNG, PDF · Maks 5MB</p>
              </>
            )}
          </div>
        </label>
        <input id="ktp-upload" type="file" accept="image/*,.pdf" onChange={handleKtpUpload} className="hidden" />
      </Card>

      {/* Summary */}
      <Card icon={<ClipboardList size={18} strokeWidth={1.75} />} title="Ringkasan Profil" desc="Pastikan semua data sudah benar sebelum menyimpan">
        <div className="divide-y divide-gray-50">
          {[
            { key: "Nama",      val: form.full_name },
            { key: "Username",  val: form.username },
            { key: "WhatsApp",  val: form.whatsapp },
            { key: "Domisili",  val: form.domicile },
            { key: "Profesi",   val: form.profession },
            { key: "Bisnis",    val: form.business_name },
            { key: "Industri",  val: form.industry },
            { key: "Minat",     val: form.interests },
          ].map(({ key, val }) => (
            <div key={key} className="flex justify-between items-start py-3 gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 shrink-0 pt-0.5">{key}</span>
              <span className={`text-sm text-right ${val ? "text-gray-800" : "text-gray-300 italic"}`}>{val || "—"}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg transition-all disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : "Simpan Profil"}
        </button>

        <BackButton onClick={() => setCurrentStep(3)} fullWidth />
      </div>
    </div>
  )
}

/* ======================== UI HELPER COMPONENTS ======================== */

function Card({ icon, title, desc, children }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          {desc && <p className="text-xs text-gray-400">{desc}</p>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Field({ label, required, className, children }: any) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function StepButton({ children, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-islamic-green-600 hover:bg-islamic-green-700 text-white font-medium shadow transition-all"
    >
      {children}
    </button>
  )
}

function BackButton({ onClick, fullWidth }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all ${fullWidth ? "w-full justify-center" : ""}`}
    >
      <ArrowLeft size={16} /> Kembali
    </button>
  )
}

function StepIndicator({ steps, currentStep, setCurrentStep }: any) {
  return (
    <div className="flex items-center justify-between mb-3">
      {steps.map((step: any, i: number) => {
        const Icon = step.icon
        const isActive = currentStep === step.id
        const isDone = currentStep > step.id
        return (
          <div key={step.id} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => isDone && setCurrentStep(step.id)}
              className={`flex flex-col items-center gap-1.5 group ${isDone ? "cursor-pointer" : "cursor-default"}`}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${isActive
                    ? "bg-islamic-green-600 text-white shadow-lg shadow-islamic-green-600/30 scale-110"
                    : isDone
                    ? "bg-islamic-green-100 text-islamic-green-700"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                  }
                `}
              >
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
  )
}

/* ======================== INPUT / CARD CONSTANTS ======================== */

const inputCls =
  "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all"

const textareaCls =
  "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-300 outline-none focus:bg-white focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-500/10 transition-all resize-y min-h-[90px] leading-relaxed"
