export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { supabaseClient } from "../../../../lib/supabase-client"
import { resend } from "../../../../lib/resend-client"

export async function POST(req: Request) {
  try {
    // =========================
    // AUTH
    // =========================
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.id

    // =========================
    // BODY
    // =========================
    // AMBIL publish_to_umkm dari request frontend
    const { publish_to_umkm, umkm_template_file } = await req.json()

    // JIKA USER INGIN PUBLISH, FILE WAJIB ADA
    if (publish_to_umkm === "yes" && !umkm_template_file) {
      return NextResponse.json(
        { error: "File template wajib diisi" },
        { status: 400 }
      )
    }

    // =========================
    // GET USER ROLE
    // =========================
    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("role")
      .eq("id", userId)
      .maybeSingle()

    if (userError || !userData?.role) {
      return NextResponse.json(
        { error: "Gagal memverifikasi role user" },
        { status: 500 }
      )
    }

    const role = userData.role

    // =========================
    // GET PROFILE
    // =========================
    let businessName = "Tidak tersedia"
    let ownerName = "Tidak tersedia"
    let tableName = ""

    if (role === "partner") {
      tableName = "partner_profiles"
      const { data: profile, error: fetchError } = await supabaseClient
        .from(tableName)
        .select("legal_name, owner_name")
        .eq("user_id", userId)
        .maybeSingle()

      if (fetchError) {
        return NextResponse.json(
          { error: "Gagal ambil data partner profile" },
          { status: 500 }
        )
      }
      businessName = profile?.legal_name || "Tidak tersedia"
      ownerName = profile?.owner_name || "Tidak tersedia"

    } else if (role === "member") {
      tableName = "member_profiles"
      const { data: profile, error: fetchError } = await supabaseClient
        .from(tableName)
        .select("business_name, full_name")
        .eq("user_id", userId)
        .maybeSingle()

      if (fetchError) {
        return NextResponse.json(
          { error: "Gagal ambil data member profile" },
          { status: 500 }
        )
      }
      businessName = profile?.business_name || "Tidak tersedia"
      ownerName = profile?.full_name || "Tidak tersedia"

    } else {
      return NextResponse.json(
        { error: "Role tidak diizinkan untuk submit UMKM" },
        { status: 403 }
      )
    }

    // =========================
    // UPDATE DB
    // =========================
    // Tentukan status yang mau disimpan
    const dbStatus = publish_to_umkm === "yes" ? "submitted" : "no"

    const { error: updateError } = await supabaseClient
      .from(tableName)
      .update({
        umkm_template_file: umkm_template_file || null,
        publish_to_umkm: dbStatus, // Gunakan status dinamis, bukan hardcode "submitted"
      })
      .eq("user_id", userId)

    if (updateError) {
      return NextResponse.json(
        { error: "Gagal simpan submission" },
        { status: 500 }
      )
    }

    // =========================
    // STOP DI SINI JIKA "TIDAK SEKARANG"
    // =========================
    // Jika user menolak/menunda, jangan kirim email ke admin. Langsung return sukses.
    if (publish_to_umkm === "no") {
      return NextResponse.json({
        success: true,
        message: "Status pengajuan berhasil ditunda",
      })
    }

    // =========================
    // EMAIL CONFIG & SEND (Hanya jalan jika publish_to_umkm === "yes")
    // =========================
    const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Hablun System <onboarding@resend.dev>"
    const TO_EMAILS = process.env.HABLUN_EMAIL
      ? process.env.HABLUN_EMAIL.split(",")
      : ["Marketing.hablun@gmail.com", "marketing@hablunhub.com"]

    const { data, error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject: `📩 Pengajuan Publikasi UMKM Baru (${role.toUpperCase()})`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f6f6f6">
          <div style="background:#fff;padding:24px;border-radius:14px">
            <h2 style="margin:0;color:#111">Pengajuan UMKM Baru</h2>
            <p style="margin-top:8px;color:#666">Ada submission baru dari jalur <strong>${role.toUpperCase()}</strong></p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #eee" />
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;color:#666;width:180px">Nama Bisnis</td>
                <td style="padding:10px 0;color:#111"><strong>${businessName}</strong></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666">Owner / PIC</td>
                <td style="padding:10px 0;color:#111"><strong>${ownerName}</strong></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666">Role</td>
                <td style="padding:10px 0;color:#111"><strong>${role}</strong></td>
              </tr>
            </table>
            <div style="margin-top:28px">
              <p style="margin-bottom:12px;color:#333"><strong>File Template UMKM</strong></p>
              <a href="${umkm_template_file}" target="_blank" style="display:inline-block;padding:12px 18px;background:#16a34a;color:white;text-decoration:none;border-radius:8px;font-weight:600;">
                📥 Download File Submission
              </a>
            </div>
            <hr style="margin:28px 0;border:none;border-top:1px solid #eee" />
            <p style="font-size:12px;color:#999">Email ini dikirim otomatis oleh sistem Hablun UMKM</p>
          </div>
        </div>
      `,
    })

    if (emailError) {
      console.error("RESEND ERROR:", emailError)
      return NextResponse.json(
        { error: "Email gagal dikirim", detail: emailError },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Submission & email berhasil dikirim",
      email_id: data?.id,
    })

  } catch (err) {
    console.error("UMKM submission error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}