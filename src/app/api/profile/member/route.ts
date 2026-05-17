export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { supabaseClient } from "../../../../../lib/supabase-client"
import { resend } from "../../../../../lib/resend-client"

interface JwtPayload {
  id: string
  email: string
}

export async function POST(req: Request) {
  try {
    // =========================
    // GET COOKIE
    // =========================
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      )
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT secret missing" },
        { status: 500 }
      )
    }

    // =========================
    // VERIFY JWT
    // =========================
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayload

    console.log("Decoded ID:", decoded.id)

    const body = await req.json()

    // =========================
    // UPSERT MEMBER PROFILE
    // =========================
    const { error: profileError } = await supabaseClient
      .from("member_profiles")
      .upsert(
        {
          user_id: decoded.id,
          full_name: body.full_name || "",
          username: body.username || "",
          whatsapp: body.whatsapp || "",
          domicile: body.domicile || "",
          profession: body.profession || "",
          business_name: body.business_name || "",
          industry: body.industry || "",
          skills: body.skills || "",
          current_needs: body.current_needs || "",
          interests: body.interests || "",
          joined_communities: body.joined_communities || "",
          join_purpose: body.join_purpose || "",
          profile_photo: body.profile_photo || "",
          ktp_file: body.ktp_file || "",
          
          // Field Baru untuk UMKM
          has_business: body.has_business || "",
          publish_to_umkm: body.publish_to_umkm || "",
          umkm_submission_type: body.umkm_submission_type || "",
          umkm_template_file: body.umkm_template_file || "",
        },
        { onConflict: "user_id" }
      )

    if (profileError) {
      console.error("Profile Error:", profileError)
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      )
    }

    console.log("Profile upsert success")

    // =========================
    // UPDATE USERS TABLE
    // =========================
    const { data: updateResult, error: userError } =
      await supabaseClient
        .from("users")
        .update({ is_profile_complete: true })
        .eq("id", decoded.id)
        .select()

    console.log("Update result:", updateResult)

    if (userError) {
      console.error("User Update Error:", userError)
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      )
    }

    if (!updateResult || updateResult.length === 0) {
      console.error("No user row updated — ID mismatch?")
      return NextResponse.json(
        { error: "User not found during update" },
        { status: 400 }
      )
    }

    console.log("Profile completed successfully for:", decoded.id)

    // =========================
    // SEND RESEND EMAIL (UMKM)
    // =========================
    if (
      body.has_business === "yes" &&
      body.publish_to_umkm === "yes" &&
      body.umkm_template_file
    ) {
      try {
        await resend.emails.send({
          // Mengambil dari environment variables dengan fallback nilai default
          from: process.env.RESEND_FROM_EMAIL || "Hablun System <no-reply@hablunhub.com>",
          to: process.env.HABLUN_EMAIL || "marketing@hablunhub.com",
          subject: `Pengajuan UMKM Baru: ${body.business_name} - ${body.full_name}`,
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #16a34a; margin-bottom: 5px;">Pengajuan Publikasi UMKM Baru</h2>
              <p style="color: #555;">Halo Tim Hablun,</p>
              <p style="color: #555;">Ada member baru yang mensubmit dokumen template untuk direktori UMKM. Berikut detailnya:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Nama Lengkap</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.full_name} (@${body.username})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>No WhatsApp</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.whatsapp}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Nama Bisnis</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.business_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Industri</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.industry}</td>
                </tr>
              </table>

              <div style="margin-top: 30px; text-align: center;">
                <a href="${body.umkm_template_file}" target="_blank" style="background-color: #16a34a; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  📥 Download / Lihat Dokumen Template
                </a>
              </div>
              
              <p style="margin-top: 40px; font-size: 12px; color: #aaa; text-align: center;">
                Email ini di-generate otomatis oleh sistem website Hablun.
              </p>
            </div>
          `,
        })
        console.log("UMKM submission email sent to admin.")
      } catch (emailError) {
        console.error("Failed to send UMKM email via Resend:", emailError)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error("Server Error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}