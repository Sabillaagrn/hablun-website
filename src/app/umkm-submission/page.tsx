"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Download,
  Upload,
  Mail,
  CheckCircle2,
  Loader2,
  FileText,
  ArrowRight,
} from "lucide-react"

export default function UmkmSubmissionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!file) {
        throw new Error(
          "Silakan upload template Pengajuan Produk terlebih dahulu."
        )
      }

      // =========================
      // UPLOAD FILE
      // =========================
      const formData = new FormData()

      formData.append("file", file)
      formData.append("type", "umkm_template_file") 

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        throw new Error(
          uploadData.error || "Upload file gagal"
        )
      }

      // =========================
      // SUBMIT UMKM
      // =========================
      const res = await fetch("/api/umkm-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publish_to_umkm: "yes", // <--- FIX UTAMA: Beri tahu API bahwa ini "yes"
          umkm_template_file: uploadData.url,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "Gagal mengirim pengajuan"
        )
      }

      // =========================
      // SUCCESS STATE FIX
      // =========================
      setSuccess(true)
      setFile(null) 
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7] px-5 py-10 md:px-10 lg:px-20">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Pengajuan Publikasi Produk
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Lengkapi template Produk untuk
              mengajukan bisnis Anda ke
              marketplace dan katalog Produk
              Hablun.
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">

                <CheckCircle2 className="mt-0.5 text-green-700" />

                <div>
                  <h3 className="font-semibold text-green-900">
                    Pengajuan Berhasil
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-green-800">
                    Template Produk berhasil
                    dikirim ke tim Hablun
                    dan sedang dalam proses
                    review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-5">

            {/* STEP 1 */}
            <div className="rounded-2xl border border-gray-100 p-5">

              <div className="flex items-start gap-4">

                <Download className="mt-1 text-green-700" />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    1. Download Template Pengajuan Produk
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Download template resmi
                    Produk Hablun dan isi data
                    bisnis Anda secara lengkap.
                  </p>

                  <Link
                    href="/templates/template-produk-hablun.docx"
                    download
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    <Download size={16} />
                    Download Template
                  </Link>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="rounded-2xl border border-gray-100 p-5">

              <div className="flex items-start gap-4">

                <Upload className="mt-1 text-amber-600" />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    2. Lengkapi dan Upload
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Isi detail usaha, produk,
                    foto, kontak, dan informasi
                    bisnis lainnya lalu upload
                    kembali template yang sudah
                    dilengkapi.
                  </p>

                  {/* FILE UPLOAD */}
                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Upload Template yang Sudah
                      Diisi
                    </label>

                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 transition hover:border-green-300 hover:bg-green-50">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FileText className="text-green-700" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {file
                            ? file.name
                            : "Pilih file template"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          DOC, DOCX, PDF • Maks
                          10MB
                        </p>
                      </div>

                      <div className="rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white">
                        Upload
                      </div>

                      <input
                        type="file"
                        accept=".doc,.docx,.pdf"
                        onChange={(e) =>
                          setFile(
                            e.target.files?.[0] ||
                              null
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="rounded-2xl border border-gray-100 p-5">

              <div className="flex items-start gap-4">

                <Mail className="mt-1 text-blue-600" />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    3. Review Tim Hablun
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Submission akan dikirim ke
                    tim Hablun untuk proses
                    verifikasi dan review
                    sebelum dipublikasikan ke
                    katalog Produk.
                  </p>
                </div>
              </div>
            </div>

            {/* APPROVED */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

              <div className="flex items-start gap-4">

                <CheckCircle2 className="mt-1 text-green-700" />

                <div>
                  <h3 className="font-semibold text-green-900">
                    Setelah Disetujui
                  </h3>

                  <p className="mt-1 text-sm text-green-800">
                    Bisnis Anda akan tampil di
                    katalog produk Hablun dan
                    dapat ditemukan oleh
                    komunitas serta calon
                    partner bisnis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pengajuan
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}