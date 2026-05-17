export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabase-admin"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File
    const type = formData.get("type") as string // KITA PERTAHANKAN "type"

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      )
    }

    // =========================
    // DETERMINE BUCKET & FOLDER
    // =========================
    let bucket = "partner-umkm" // Default bucket bawaan dari logic lama
    let folder = "others"

    // Kita routing khusus untuk KTP dan Profil agar masuk ke bucket yang benar
    if (type === "profile-photos" || type === "profile_photo") {
      bucket = "profile-photos"
      folder = "" // Tanpa folder, ditaruh di root bucket
    } else if (type === "ktp-files" || type === "ktp_file") {
      bucket = "ktp-files"
      folder = "" // Tanpa folder, ditaruh di root bucket
    } else {
      // =========================
      // FOLDER MAPPING LAMA (TETAP AMAN)
      // =========================
      const folderMap: Record<string, string> = {
        logo: "logos",
        product_photos: "products",
        umkm_template_file: "templates",
      }
      folder = folderMap[type] || "others"
    }

    // =========================
    // FILE BUFFER
    // =========================
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // =========================
    // SAFE FILE NAME
    // =========================
    const extension = file.name.split(".").pop() || ""

    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")

    // =========================
    // FINAL FILE PATH
    // =========================
    // Jika ada folder (UMKM), gabungkan dengan nama file. 
    // Jika foldernya kosong (KTP/Profil), langsung di root bucket.
    const filePath = folder 
      ? `${folder}/${Date.now()}-${baseName}.${extension}`
      : `${Date.now()}-${baseName}.${extension}`

    // =========================
    // UPLOAD FILE
    // =========================
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("UPLOAD ERROR:", error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // =========================
    // PUBLIC URL
    // =========================
    const { data } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      path: filePath,
      url: data.publicUrl,
    })

  } catch (err) {
    console.error("API UPLOAD ERROR:", err)

    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat upload",
      },
      { status: 500 }
    )
  }
}