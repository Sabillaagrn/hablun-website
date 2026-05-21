"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  ClipboardList,
  Handshake,
  Building2,
  Image,
  Loader2,
  Rocket,
  Store,
  Globe2,
  BadgeCheck,
  Download,
  Mail,
  FileText,
  Sparkles,
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
  social_links: string

  has_business_place: string
  business_place_name: string

  publish_to_umkm: string
  umkm_submission_type: string

  logo: string | File
  product_photos: string | File  

  umkm_template_file: string | File
}

const steps = [
  { id: 1, label: "Identitas", icon: Building2 },
  { id: 2, label: "Bisnis", icon: ClipboardList },
  { id: 3, label: "Publikasi", icon: Globe2 },
  { id: 4, label: "Kolaborasi", icon: Handshake },
]

/* ======================== MAIN PAGE ======================== */

interface Props {
  onSuccess: () => void
}

export default function PartnerProfileForm({
  onSuccess,
}: Props) {
  const [currentStep, setCurrentStep] = useState(1)

  const [uploading, setUploading] =
    useState(false)

  const [logoName, setLogoName] =
    useState<string | null>(null)

  const [productName, setProductName] =
    useState<string | null>(null)

  const [templateName, setTemplateName] =
    useState<string | null>(null)

  const [error, setError] = useState<
    string | null
  >(null)

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
    social_links: "",

    has_business_place: "",
    business_place_name: "",

    publish_to_umkm: "",
    umkm_submission_type: "",

    logo: "",
    product_photos: "",

    umkm_template_file: "",
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]

    if (e.target.name === "logo") {
      setLogoName(file.name)
    }

    if (e.target.name === "product_photos") {
      setProductName(file.name)
    }

    if (e.target.name === "umkm_template_file") {
      setTemplateName(file.name)
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: file,
    }))
  }

  function isFile(file: any): file is File {
    return file instanceof File
  }

  const handleFileUpload = async (
    file: File,
    bucket: string
  ) => {
    const data = new FormData()

    data.append("file", file)
    data.append("bucket", bucket)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    })

    const json = await res.json()

    if (!res.ok) {
      throw new Error(
        json.error || "Upload gagal"
      )
    }

    return json.url
  }

  const validatePublishFlow = () => {
    if (
      form.publish_to_umkm === "yes" &&
      !form.umkm_submission_type
    ) {
      throw new Error(
        "Silakan pilih metode publikasi Produk."
      )
    }

    if (
      form.publish_to_umkm === "yes" &&
      form.umkm_submission_type ===
        "template" &&
      !form.umkm_template_file
    ) {
      throw new Error(
        "Silakan upload template detail Produk."
      )
    }
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setUploading(true)
    setError(null)

    try {
      validatePublishFlow()

      let logoUrl = form.logo
      let productPhotosUrl =
        form.product_photos

      let templateFileUrl =
        form.umkm_template_file

      if (isFile(form.logo)) {
        logoUrl = await handleFileUpload(
          form.logo,
          "partner-umkm"
        )
      }

      if (isFile(form.product_photos)) {
        productPhotosUrl =
          await handleFileUpload(
            form.product_photos,
            "partner-umkm"
          )
      }

      if (
        isFile(form.umkm_template_file)
      ) {
        templateFileUrl =
          await handleFileUpload(
            form.umkm_template_file,
            "partner-umkm"
          )
      }

      const payload = {
        ...form,
        logo: logoUrl,
        product_photos: productPhotosUrl,
        umkm_template_file:
          templateFileUrl,
      }

      const res = await fetch(
        "/api/profile/partner",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Gagal simpan profil"
        )
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-b from-green-50 via-white to-white px-3 py-4 sm:px-5 md:px-8 md:py-6">
      
      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-islamic-green-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-islamic-green-600/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-islamic-green-600">
            Pendaftaran Mitra
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Lengkapi{" "}
            <span className="bg-gradient-to-r from-islamic-green-600 via-islamic-green-700 to-islamic-green-800 bg-clip-text text-transparent">
              Profil Mitra
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            Informasi ini membantu
            menghubungkan bisnis Anda dengan
            komunitas, peluang kolaborasi,
            dan publikasi Produk Hablun.
          </p>
        </header>

        {/* STEP */}
        <div className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ================= STEP 1 ================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card
                icon={<Building2 size={18} />}
                title="Identitas Bisnis"
                desc="Informasi legal dan pemilik usaha"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <Field
                    label="Nama Resmi Bisnis"
                    required
                    className="sm:col-span-2"
                  >
                    <input
                      name="legal_name"
                      value={form.legal_name}
                      onChange={handleChange}
                      placeholder="PT. Nama Bisnis Anda"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Jenis Usaha">
                    <input
                      name="business_type"
                      value={form.business_type}
                      onChange={handleChange}
                      placeholder="PT, CV, UMKM..."
                      className={inputCls}
                    />
                  </Field>

                  <Field label="NIB / NPWP">
                    <input
                      name="nib_npwp"
                      value={form.nib_npwp}
                      onChange={handleChange}
                      placeholder="Nomor legalitas"
                      className={inputCls}
                    />
                  </Field>

                  <Field
                    label="Nama Pemilik / PIC"
                    className="sm:col-span-2"
                  >
                    <input
                      name="owner_name"
                      value={form.owner_name}
                      onChange={handleChange}
                      placeholder="Nama penanggung jawab"
                      className={inputCls}
                    />
                  </Field>

                  <Field
                    label="Alamat Operasional"
                    className="sm:col-span-2"
                  >
                    <textarea
                      name="office_address"
                      value={form.office_address}
                      onChange={handleChange}
                      placeholder="Alamat lengkap bisnis"
                      className={`${textareaCls} min-h-[110px]`}
                    />
                  </Field>
                </div>
              </Card>

              <div className="flex justify-end">
                <StepBtn
                  onClick={() =>
                    setCurrentStep(2)
                  }
                >
                  Lanjutkan
                  <ArrowRight size={16} />
                </StepBtn>
              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card
                icon={
                  <ClipboardList size={18} />
                }
                title="Deskripsi Bisnis"
                desc="Ceritakan lebih detail tentang usaha Anda"
              >
                <div className="space-y-4">

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Field label="Kategori Industri">
                      <input
                        name="industry_category"
                        value={
                          form.industry_category
                        }
                        onChange={handleChange}
                        placeholder="F&B, Retail..."
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Skala Bisnis">
                      <input
                        name="business_scale"
                        value={
                          form.business_scale
                        }
                        onChange={handleChange}
                        placeholder="UMKM, Menengah..."
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Deskripsi Bisnis">
                    <textarea
                      name="business_description"
                      value={
                        form.business_description
                      }
                      onChange={handleChange}
                      placeholder="Ceritakan produk, layanan, target pasar, dan keunggulan bisnis Anda..."
                      className={`${textareaCls} min-h-[120px]`}
                    />
                  </Field>

                  <Field label="Penawaran Khusus">
                    <textarea
                      name="special_offer"
                      value={
                        form.special_offer
                      }
                      onChange={handleChange}
                      placeholder="Diskon komunitas, bundling, dll..."
                      className={textareaCls}
                    />
                  </Field>
                </div>
              </Card>

              <div className="flex gap-3">
                <BackBtn
                  onClick={() =>
                    setCurrentStep(1)
                  }
                />

                <StepBtn
                  onClick={() =>
                    setCurrentStep(3)
                  }
                >
                  Lanjutkan
                  <ArrowRight size={16} />
                </StepBtn>
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card
                icon={<Globe2 size={18} />}
                title="Publikasi Produk Hablun"
                desc="Ajukan usaha Anda untuk ditampilkan di katalog Produk Hablun"
              >
                <div className="space-y-5">

                  <div className="rounded-3xl border border-islamic-green-100 bg-gradient-to-br from-islamic-green-50 to-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-islamic-green-100 text-islamic-green-700">
                        <Sparkles size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Tampilkan usaha di Produk
                          Hablun
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          Mitra dapat mengajukan
                          publikasi usaha melalui
                          template Produk yang akan
                          dikirim ke tim Hablun
                          untuk proses review dan
                          verifikasi.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-gray-800">
                      Apakah Anda ingin usaha
                      ditampilkan di website Produk
                      Hablun?
                    </p>

                    <div className="flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            publish_to_umkm:
                              "yes",
                            umkm_submission_type:
                              "template",
                          }))
                        }
                        className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${
                          form.publish_to_umkm ===
                          "yes"
                            ? "border-islamic-green-600 bg-islamic-green-600 text-white"
                            : "border-gray-200 bg-white text-gray-600"
                        }`}
                      >
                        Ya, saya ingin publish
                      </button>

                      <button
                      type="button"
                      onClick={() => {
                        // 1. Reset state form publikasi
                        setForm((prev) => ({
                          ...prev,
                          publish_to_umkm: "no",
                          umkm_submission_type: "",
                          umkm_template_file: "",
                        }));
                        
                        // 2. Bersihkan teks nama file agar UI sinkron
                        setTemplateName(null);

                        // 3. (Opsional) Bersihkan juga elemen input file HTML jika ada sisa cache browser
                        const fileInput = document.getElementById("template-upload") as HTMLInputElement;
                        if (fileInput) fileInput.value = "";
                      }}
                      className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${
                        form.publish_to_umkm === "no"
                          ? "border-gray-800 bg-gray-800 text-white"
                          : "border-gray-200 bg-white text-gray-600"
                      }`}
                    >
                      Tidak sekarang
                    </button>
                    </div>
                  </div>

                  {form.publish_to_umkm ===
                    "yes" && (
                    <div className="space-y-4 rounded-3xl border border-islamic-green-100 bg-white p-5">

                      {/* FLOW */}
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <h4 className="mb-4 text-sm font-semibold text-gray-900">
                          Alur Pengajuan Publikasi
                        </h4>

                        <div className="space-y-3">

                          <FlowItem
                            icon={
                              <Download size={16} />
                            }
                            title="1. Download Template pengajuan produk"
                            desc="Unduh template detail usaha untuk diisi."
                          />

                          <FlowItem
                            icon={
                              <FileText size={16} />
                            }
                            title="2. Lengkapi Data Usaha"
                            desc="Isi informasi produk, deskripsi, foto, dan kontak bisnis."
                          />

                          <FlowItem
                            icon={
                              <Upload size={16} />
                            }
                            title="3. Upload Template"
                            desc="Upload kembali file template yang sudah diisi."
                          />

                          <FlowItem
                            icon={<Mail size={16} />}
                            title="4. Review Tim Hablun"
                            desc="Data akan dikirim ke email admin Hablun untuk proses verifikasi."
                          />
                        </div>
                      </div>

                      {/* DOWNLOAD */}
                      <div className="rounded-2xl border border-dashed border-islamic-green-200 bg-islamic-green-50/60 p-4">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              Template Detail Produk
                            </h4>

                            <p className="mt-1 text-sm text-gray-600">
                              Download template
                              lalu isi detail usaha
                              Anda.
                            </p>
                          </div>

                          <a
                            href="/templates/template-produk-hablun.docx"
                            download
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-islamic-green-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-islamic-green-700"
                          >
                            <Download size={16} />
                            Download Template
                          </a>
                        </div>
                      </div>

                      {/* UPLOAD */}
                      <Field
                        label="Upload Template yang Sudah Diisi"
                        required
                      >
                        <UploadBox
                          id="template-upload"
                          name="umkm_template_file"
                          fileName={templateName}
                          text="Upload file template UMKM"
                          subtext="DOCX / PDF · Maks 10MB"
                          onChange={handleFileChange}
                          accept=".doc,.docx,.pdf"
                        />
                      </Field>

                      <div className="rounded-xl bg-amber-50 p-4">
                        <p className="text-xs leading-relaxed text-amber-800">
                          Pengajuan publikasi
                          usaha tidak langsung
                          tampil otomatis di
                          website. Tim Hablun
                          akan melakukan review
                          terlebih dahulu sebelum
                          bisnis dipublikasikan.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <div className="flex gap-3">
                <BackBtn
                  onClick={() =>
                    setCurrentStep(2)
                  }
                />

                <StepBtn
                  onClick={() =>
                    setCurrentStep(4)
                  }
                >
                  Lanjutkan
                  <ArrowRight size={16} />
                </StepBtn>
              </div>
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

              <Card
                icon={<Handshake size={18} />}
                title="Kolaborasi & Kemitraan"
                desc="Preferensi kerja sama bisnis"
              >
                <div className="space-y-4">

                  <Field label="Kebutuhan Kolaborasi">
                    <textarea
                      name="collaboration_need"
                      value={
                        form.collaboration_need
                      }
                      onChange={handleChange}
                      placeholder="Mencari reseller, supplier, partner distribusi..."
                      className={textareaCls}
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Field label="Metode Pembayaran">
                      <input
                        name="payment_methods"
                        value={
                          form.payment_methods
                        }
                        onChange={handleChange}
                        placeholder="Transfer, QRIS..."
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Model Kemitraan">
                      <input
                        name="partnership_model"
                        value={
                          form.partnership_model
                        }
                        onChange={handleChange}
                        placeholder="Reseller, Franchise..."
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Kode Referral">
                      <input
                        name="referral_code"
                        value={
                          form.referral_code
                        }
                        onChange={handleChange}
                        placeholder="Opsional"
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Media Sosial">
                      <input
                        name="social_links"
                        value={
                          form.social_links
                        }
                        onChange={handleChange}
                        placeholder="instagram.com/bisnis"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>
              </Card>

              <Card
                icon={<Image size={18} />}
                title="Aset Visual"
                desc="Tambahkan logo dan foto produk"
              >
                <div className="space-y-4">

                  <Field label="Logo Bisnis">
                    <UploadBox
                      id="logo-upload"
                      name="logo"
                      fileName={logoName}
                      text="Upload logo bisnis"
                      subtext="PNG, JPG · Maks 5MB"
                      onChange={handleFileChange}
                    />
                  </Field>

                  <Field label="Foto Produk">
                    <UploadBox
                      id="product-upload"
                      name="product_photos"
                      fileName={productName}
                      text="Upload foto produk"
                      subtext="PNG, JPG · Maks 5MB"
                      onChange={handleFileChange}
                    />
                  </Field>
                </div>
              </Card>

              <div className="space-y-3">

                <button
                  type="submit"
                  disabled={uploading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 py-4 text-sm font-semibold text-white shadow-lg shadow-islamic-green-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Rocket size={16} />
                      Simpan & Daftarkan Mitra
                    </>
                  )}
                </button>

                <BackBtn
                  onClick={() =>
                    setCurrentStep(3)
                  }
                  full
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

/* ======================== COMPONENTS ======================== */

function Card({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode
  title: string
  desc?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl backdrop-blur-xl md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-islamic-green-100 text-islamic-green-700">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {title}
          </h2>

          {desc && (
            <p className="mt-0.5 text-xs text-gray-400">
              {desc}
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

function FlowItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-islamic-green-700 shadow-sm">
        {icon}
      </div>

      <div>
        <h5 className="text-sm font-semibold text-gray-900">
          {title}
        </h5>

        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          {desc}
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  )
}

function UploadBox({
  id,
  name,
  fileName,
  text,
  subtext,
  onChange,
  accept = "image/*",
}: any) {
  return (
    <>
      <label
        htmlFor={id}
        className="block cursor-pointer"
      >
        <div
          className={`flex items-center gap-4 rounded-2xl border-2 border-dashed p-4 transition-all ${
            fileName
              ? "border-islamic-green-400 bg-islamic-green-50"
              : "border-gray-200 bg-gray-50 hover:border-islamic-green-300 hover:bg-islamic-green-50/50"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              fileName
                ? "bg-islamic-green-100 text-islamic-green-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {fileName ? (
              <Check size={18} />
            ) : (
              <Upload size={18} />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700">
              {fileName ?? text}
            </p>

            <p className="mt-0.5 text-xs text-gray-400">
              {subtext}
            </p>
          </div>
        </div>
      </label>

      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
    </>
  )
}

function StepBtn({
  onClick,
  children,
}: {
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-islamic-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-islamic-green-600/20 transition-all hover:-translate-y-0.5 hover:bg-islamic-green-700 hover:shadow-lg"
    >
      {children}
    </button>
  )
}

function BackBtn({
  onClick,
  full,
}: {
  onClick: () => void
  full?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "w-full" : ""} flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-medium text-gray-600 transition-all hover:border-islamic-green-300 hover:text-islamic-green-700`}
    >
      <ArrowLeft size={16} />
      Kembali
    </button>
  )
}

function StepIndicator({
  steps,
  currentStep,
  setCurrentStep,
}: any) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step: any, i: number) => {
        const Icon = step.icon

        const isActive =
          currentStep === step.id

        const isDone =
          currentStep > step.id

        return (
          <div
            key={step.id}
            className="flex flex-1 items-center"
          >
            <button
              type="button"
              onClick={() =>
                isDone &&
                setCurrentStep(step.id)
              }
              className={`flex flex-col items-center gap-1.5 ${
                isDone
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "scale-110 bg-islamic-green-600 text-white shadow-lg shadow-islamic-green-600/30"
                    : isDone
                    ? "bg-islamic-green-100 text-islamic-green-700"
                    : "border-2 border-gray-200 bg-white text-gray-400"
                }`}
              >
                {isDone ? (
                  <Check size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </div>

              <span
                className={`hidden text-[11px] font-medium tracking-wide sm:block ${
                  isActive
                    ? "text-islamic-green-700"
                    : isDone
                    ? "text-islamic-green-500"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </button>

            {i < steps.length - 1 && (
              <div className="relative mx-2 mb-5 h-px flex-1 overflow-hidden rounded-full bg-gray-200 sm:mb-6">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-islamic-green-400 transition-all duration-500"
                  style={{
                    width:
                      currentStep > step.id
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ======================== STYLES ======================== */

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-islamic-green-500 focus:bg-white focus:ring-2 focus:ring-islamic-green-500/10"

const textareaCls =
  "min-h-[90px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-islamic-green-500 focus:bg-white focus:ring-2 focus:ring-islamic-green-500/10"