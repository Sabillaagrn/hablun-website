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
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  CreditCard,
  Loader2,
  Check,
  Globe2,
  Download,
  FileText,
  Mail,
  FileType,
} from "lucide-react"

/* ================= TYPES ================= */

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
  has_business: string
  publish_to_umkm: string
  umkm_submission_type: string
  umkm_template_file: string
}

const steps = [
  { id: 1, label: "Identitas", icon: User },
  { id: 2, label: "Profesional", icon: Briefcase },
  { id: 3, label: "Minat & Tujuan", icon: Target },
  { id: 4, label: "Verifikasi", icon: ShieldCheck },
]

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
    has_business: "",
    publish_to_umkm: "",
    umkm_submission_type: "",
    umkm_template_file: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const uploadFile = async (file: File, fileType: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", fileType) 

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Upload API Error:", data.error)
      throw new Error(data.error || "Gagal mengunggah file")
    }

    return data.url
  }

  const handlePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]

    setPhotoPreview(URL.createObjectURL(file))

    const url = await uploadFile(file, "profile-photos")

    setForm({
      ...form,
      profile_photo: url,
    })
  }

  const handleKtpUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]

    setKtpReady(true)

    const url = await uploadFile(file, "ktp-files")

    setForm({
      ...form,
      ktp_file: url,
    })
  }

  const handleTemplateUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]

    const url = await uploadFile(file, "partner-umkm/templates")

    setForm({
      ...form,
      umkm_template_file: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/profile/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan profil")
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-green-50 via-white to-white py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-islamic-green-600 mb-3">
            Hablun Community
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Lengkapi Profil Anda
          </h1>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Informasi ini membantu komunitas mengenal Anda lebih baik dan membangun koneksi yang relevan.
          </p>
        </div>

        {/* STEP */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-6">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-4">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">

            {currentStep === 1 && (
              <Step1
                form={form}
                handleChange={handleChange}
                photoPreview={photoPreview}
                handlePhotoUpload={handlePhotoUpload}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 2 && (
              <Step2
                form={form}
                handleChange={handleChange}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 3 && (
              <Step3
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                handleTemplateUpload={handleTemplateUpload}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 4 && (
              <Step4
                form={form}
                handleKtpUpload={handleKtpUpload}
                ktpReady={ktpReady}
                loading={loading}
                setCurrentStep={setCurrentStep}
              />
            )}

          </div>
        </form>
      </div>
    </section>
  )
}

/* ================= STEP 1 ================= */

function Step1({ form, handleChange, photoPreview, handlePhotoUpload, setCurrentStep }: any) {
  return (
    <div className="space-y-8">
      {/* PHOTO */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Informasi Pribadi
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Lengkapi identitas dasar akun Anda.
        </p>

        <label htmlFor="photo-upload" className="cursor-pointer block">
          <div className="border-2 border-dashed border-islamic-green-200 rounded-2xl p-5 flex items-center gap-5 hover:border-islamic-green-400 transition-all">
            {photoPreview ? (
              <img
                src={photoPreview}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                alt="Preview"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <Camera className="text-islamic-green-600" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-800">Upload Foto Profil</p>
              <p className="text-sm text-gray-400 mt-1">JPG / PNG maksimal 5MB</p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm bg-islamic-green-100 text-islamic-green-700 px-4 py-2 rounded-xl">
                <Upload size={14} /> Pilih File
              </div>
            </div>
          </div>
        </label>
        <input
          id="photo-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nama Lengkap" required>
          <input name="full_name" value={form.full_name} onChange={handleChange} className={inputCls} placeholder="Budi Santoso" />
        </Field>
        <Field label="Username" required>
          <input name="username" value={form.username} onChange={handleChange} className={inputCls} placeholder="budisantoso" />
        </Field>
        <Field label="No WhatsApp" required>
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputCls} placeholder="08xxxxxxxxxx" />
        </Field>
        <Field label="Domisili">
          <input name="domicile" value={form.domicile} onChange={handleChange} className={inputCls} placeholder="Bandung" />
        </Field>
      </div>

      <div className="flex justify-end">
        <StepButton onClick={() => setCurrentStep(2)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

/* ================= STEP 2 ================= */

function Step2({ form, handleChange, setCurrentStep }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Informasi Profesional</h2>
        <p className="text-sm text-gray-500">Ceritakan aktivitas profesional dan bisnis Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Profesi">
          <input name="profession" value={form.profession} onChange={handleChange} className={inputCls} placeholder="Software Engineer" />
        </Field>
        <Field label="Industri">
          <input name="industry" value={form.industry} onChange={handleChange} className={inputCls} placeholder="Teknologi" />
        </Field>
        <Field label="Nama Bisnis" className="md:col-span-2">
          <input name="business_name" value={form.business_name} onChange={handleChange} className={inputCls} placeholder="PT Maju Bersama" />
        </Field>
      </div>

      <Field label="Keahlian">
        <textarea name="skills" value={form.skills} onChange={handleChange} className={textareaCls} placeholder="Digital marketing, UI/UX, public speaking..." />
      </Field>

      <Field label="Kebutuhan Saat Ini">
        <textarea name="current_needs" value={form.current_needs} onChange={handleChange} className={textareaCls} placeholder="Mencari relasi bisnis, investor, atau partner..." />
      </Field>

      <div className="flex justify-between">
        <BackButton onClick={() => setCurrentStep(1)} />
        <StepButton onClick={() => setCurrentStep(3)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

/* ================= STEP 3 ================= */

function Step3({ form, setForm, handleChange, handleTemplateUpload, setCurrentStep }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Minat & Tujuan</h2>
        <p className="text-sm text-gray-500">Ceritakan minat Anda dan tujuan bergabung dengan komunitas.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Field label="Minat / Ketertarikan">
          <input name="interests" value={form.interests} onChange={handleChange} className={inputCls} placeholder="Misal: Teknologi, Bisnis, Desain, Sosial..." />
        </Field>
        <Field label="Tujuan Bergabung (Join Purpose)">
          <textarea name="join_purpose" value={form.join_purpose} onChange={handleChange} className={textareaCls} placeholder="Apa yang ingin Anda capai dengan bergabung di Hablun Community?" />
        </Field>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Publikasi Produk</h2>
        <p className="text-sm text-gray-500 mb-5">Program khusus bagi anggota yang memiliki usaha.</p>

        {/* HAS BUSINESS */}
        <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50 mb-5">
          <p className="font-medium text-gray-700 mb-3">Apakah Anda memiliki usaha?</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((prev: any) => ({
                  ...prev,
                  has_business: "yes",
                }))
              }
              className={`flex-1 py-2.5 rounded-xl border transition-all font-medium ${
                form.has_business === "yes"
                  ? "bg-islamic-green-600 border-islamic-green-600 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-islamic-green-300"
              }`}
            >
              Ya, punya
            </button>

            <button
              type="button"
              onClick={() =>
                setForm((prev: any) => ({
                  ...prev,
                  has_business: "no",
                  publish_to_umkm: "no", // FIX: Set juga jadi no agar tidak memicu error
                  umkm_submission_type: "none", // FIX: Harus ada nilainya
                  umkm_template_file: "",
                }))
              }
              className={`flex-1 py-2.5 rounded-xl border transition-all font-medium ${
                form.has_business === "no"
                  ? "bg-gray-800 border-gray-800 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Tidak
            </button>
          </div>
        </div>

        {/* ================= ONLY SHOW IF YES ================= */}
        {form.has_business === "yes" && (
          <div className="space-y-5 border border-islamic-green-100 rounded-2xl p-5 bg-white">
            
            {/* INFO */}
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-800">
              <Globe2 className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm leading-relaxed">
                Anda bisa mempublikasikan usaha Anda ke direktori <strong>Produk Hablun</strong> dengan mengisi template yang kami sediakan.
              </p>
            </div>

            {/* PUBLISH */}
            <div>
              <p className="font-medium text-gray-700 mb-3">
                Apakah Anda ingin mempublikasikan usaha Anda sekarang?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev: any) => ({
                      ...prev,
                      publish_to_umkm: "yes",
                      umkm_submission_type: "template",
                    }))
                  }
                  className={`flex-1 py-2.5 rounded-xl border transition-all font-medium ${
                    form.publish_to_umkm === "yes"
                      ? "bg-islamic-green-600 border-islamic-green-600 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:border-islamic-green-300"
                  }`}
                >
                  Ya, publikasi
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm((prev: any) => ({
                      ...prev,
                      publish_to_umkm: "no",
                      umkm_submission_type: "none", // FIX: Beri nilai valid agar API tidak menolak
                      umkm_template_file: "",
                    }))

                    const fileInput = document.getElementById("umkm-template-upload") as HTMLInputElement
                    if (fileInput) fileInput.value = ""
                  }}
                  className={`flex-1 py-2.5 rounded-xl border transition-all font-medium ${
                    form.publish_to_umkm === "no"
                      ? "bg-gray-800 border-gray-800 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  Tidak sekarang
                </button>
              </div>
            </div>

            {/* ================= TEMPLATE FLOW ================= */}
            {form.publish_to_umkm === "yes" && (
              <div className="pt-4 border-t border-gray-100 space-y-4">
                
                {/* FLOW STEPS */}
                <div className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Alur Publikasi:</p>
                  <Flow icon={<Download size={16} className="text-islamic-green-600"/>} text="1. Download template UMKM" />
                  <Flow icon={<FileText size={16} className="text-islamic-green-600"/>} text="2. Isi data usaha Anda di dalam file" />
                  <Flow icon={<Upload size={16} className="text-islamic-green-600"/>} text="3. Upload kembali file yang sudah diisi" />
                  <Flow icon={<Mail size={16} className="text-islamic-green-600"/>} text="4. Tunggu review dari tim Hablun" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DOWNLOAD BUTTON */}
                  <a
                    href="/templates/template-produk-hablun.docx"
                    download
                    className="flex justify-center items-center gap-2 bg-white border-2 border-islamic-green-600 text-islamic-green-700 hover:bg-islamic-green-50 px-4 py-3 rounded-xl font-medium transition-all"
                  >
                    <Download size={18} />
                    Download Template
                  </a>

                  {/* UPLOAD BUTTON */}
                  <label htmlFor="umkm-template-upload" className="cursor-pointer h-full">
                    <div className="flex justify-center items-center gap-2 bg-islamic-green-50 border border-dashed border-islamic-green-400 text-islamic-green-700 hover:border-islamic-green-600 hover:bg-islamic-green-100 px-4 py-3 rounded-xl font-medium transition-all h-full">
                      <Upload size={18} />
                      {form.umkm_template_file ? (
                        <span className="truncate max-w-[150px]">
                          {form.umkm_template_file.split('/').pop() || "Template Terupload"}
                        </span>
                      ) : (
                        <span>Upload Template</span>
                      )}
                    </div>
                  </label>
                  <input
                    id="umkm-template-upload"
                    type="file"
                    className="hidden"
                    accept=".doc,.docx,.pdf"
                    onChange={handleTemplateUpload}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* NAV */}
      <div className="flex justify-between pt-4">
        <BackButton onClick={() => setCurrentStep(2)} />
        <StepButton onClick={() => setCurrentStep(4)}>
          Lanjutkan <ArrowRight size={16} />
        </StepButton>
      </div>
    </div>
  )
}

/* ================= SIMPLE FLOW ITEM ================= */

function Flow({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      {icon}
      <span>{text}</span>
    </div>
  )
}

/* ================= STEP 4 ================= */

function Step4({ form, handleKtpUpload, ktpReady, loading, setCurrentStep }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Verifikasi Akun</h2>
        <p className="text-sm text-gray-500">Upload dokumen identitas untuk proses verifikasi akun.</p>
      </div>

      <label htmlFor="ktp-upload" className="cursor-pointer block">
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            ktpReady
              ? "border-islamic-green-400 bg-islamic-green-50"
              : "border-gray-200 hover:border-islamic-green-300"
          }`}
        >
          {ktpReady ? (
            <div className="flex items-center justify-center gap-2 text-islamic-green-700">
              <CheckCircle2 size={20} />
              <span className="font-medium">Dokumen berhasil diupload</span>
            </div>
          ) : (
            <>
              <CreditCard className="mx-auto text-gray-300 mb-3" size={36} />
              <p className="font-semibold text-gray-800">Upload KTP</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, atau PDF maksimal 5MB</p>
            </>
          )}
        </div>
      </label>

      <input
        id="ktp-upload"
        type="file"
        className="hidden"
        accept="image/*,.pdf"
        onChange={handleKtpUpload}
      />

      {/* SUMMARY */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={18} />
          <p className="font-semibold text-gray-800">Ringkasan Profil</p>
        </div>

        <div className="space-y-3">
          <Summary label="Nama" value={form.full_name} />
          <Summary label="Username" value={form.username} />
          <Summary label="WhatsApp" value={form.whatsapp} />
          <Summary label="Profesi" value={form.profession} />
          <Summary label="Bisnis" value={form.business_name} />
        </div>
      </div>

      <div className="flex justify-between">
        <BackButton onClick={() => setCurrentStep(3)} />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Simpan Profil <CheckCircle2 size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ================= UI ================= */

function Field({ label, required, className, children }: any) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  )
}

function Summary({ label, value }: any) {
  return (
    <div className="flex justify-between gap-5 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-800 font-medium text-right">{value || "-"}</span>
    </div>
  )
}

function StepButton({ children, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-islamic-green-600 hover:bg-islamic-green-700 text-white font-semibold transition-all"
    >
      {children}
    </button>
  )
}

function BackButton({ onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all"
    >
      <ArrowLeft size={16} /> Kembali
    </button>
  )
}

function StepIndicator({ steps, currentStep }: any) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step: any, index: number) => {
        const Icon = step.icon
        const active = currentStep === step.id
        const done = currentStep > step.id

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center mx-auto">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  active
                    ? "bg-islamic-green-600 text-white shadow-lg"
                    : done
                    ? "bg-islamic-green-100 text-islamic-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className={`mt-2 text-xs font-medium ${active ? "text-islamic-green-700" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <div className="flex-1 h-px bg-gray-200" />}
          </div>
        )
      })}
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-islamic-green-500 focus:ring-4 focus:ring-islamic-green-500/10 transition-all"

const textareaCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none min-h-[120px] resize-none focus:border-islamic-green-500 focus:ring-4 focus:ring-islamic-green-500/10 transition-all"