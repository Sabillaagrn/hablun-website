export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function GET() {
  try {
    const cookieStore = await cookies()

    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({
        user: null,
      })
    }

    let decoded: any

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      )
    } catch {
      return NextResponse.json({
        user: null,
      })
    }

    const userId = decoded.id

    // =========================
    // USER
    // =========================
    const {
      data: user,
      error: userError,
    } = await supabaseClient
      .from("users")
      .select(
        "id, email, role, is_profile_complete"
      )
      .eq("id", userId)
      .maybeSingle()

    if (userError || !user) {
      return NextResponse.json({
        user: null,
      })
    }

    let fullName = ""

    // =========================
    // PROFILES VARIABLES
    // =========================
    // Buat variabel untuk menampung kedua jenis profil
    let partnerProfile: any = null
    let memberProfile: any = null 

    // =========================
    // PROFILE NAME & DATA
    // =========================
    if (
      user.is_profile_complete &&
      user.role
    ) {
      if (user.role === "member") {
        const { data } =
          await supabaseClient
            .from("member_profiles")
            // FIX 2: Tambahkan field has_business & publish_to_umkm agar terbaca oleh Frontend
            .select("username, has_business, publish_to_umkm") 
            .eq("user_id", user.id)
            .maybeSingle()

        fullName = data?.username?.trim() || ""
        memberProfile = data // Simpan data ke variabel
      }

      else if (
        user.role === "partner"
      ) {
        const { data } =
          await supabaseClient
            .from("partner_profiles")
            // Pastikan field ini juga ada di tabel partner_profiles jika partner punya flow yang sama
            .select(`
              legal_name,
              has_business,
              publish_to_umkm,
              umkm_status
            `)
            .eq("user_id", user.id)
            .maybeSingle()

        fullName = data?.legal_name?.trim() || ""
        partnerProfile = data // Simpan data ke variabel
      }

      else if (
        user.role ===
        "community_admin"
      ) {
        const { data } =
          await supabaseClient
            .from("community_profiles")
            .select("community_name")
            .eq("user_id", user.id)
            .maybeSingle()

        fullName = data?.community_name?.trim() || ""
      }
    }

    // =========================
    // FALLBACK NAME
    // =========================
    if (!fullName) {
      fullName = user.email.split("@")[0]
    }

    // =========================
    // RESPONSE
    // =========================
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_profile_complete: user.is_profile_complete,
        name: fullName,
      },

      // FIX 3: Kirimkan kedua profil, biarkan frontend yang memilih mana yang dipakai
      partner_profile: partnerProfile,
      member_profile: memberProfile,
    })

  } catch (err) {
    console.error(
      "GET /api/me error:",
      err
    )

    return NextResponse.json({
      user: null,
    })
  }
}