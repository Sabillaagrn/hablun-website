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
      return NextResponse.json({ user: null })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ user: null })
    }

    const userId = decoded.id

    // =========================
    // USER
    // =========================
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("id, email, role, is_profile_complete")
      .eq("id", userId)
      .maybeSingle()

    if (userError || !user) {
      return NextResponse.json({ user: null })
    }

    let fullName = ""

    // =========================
    // PROFILES VARIABLES
    // =========================
    let partnerProfile: any = null
    let memberProfile: any = null 

    // =========================
    // PROFILE NAME & DATA
    // =========================
    // FIX: Hanya cek user.role, HAPUS user.is_profile_complete agar sistem 
    // selalu berani mengambil data profil (termasuk status publish_to_umkm)
    if (user.role) {
      if (user.role === "member") {
        const { data, error } = await supabaseClient
          .from("member_profiles")
          .select("username, has_business, publish_to_umkm") 
          .eq("user_id", user.id)
          .maybeSingle()
        
        if (error) console.error("Error get member profile:", error)

        fullName = data?.username?.trim() || ""
        memberProfile = data 
      }

      else if (user.role === "partner") {
        const { data, error } = await supabaseClient
          .from("partner_profiles")
          // FIX: Hapus 'has_business' karena tidak ada di tabel partner_profiles
          .select(`
            legal_name,
            publish_to_umkm
          `)
          .eq("user_id", user.id)
          .maybeSingle()
        
        if (error) console.error("Error get partner profile:", error)

        fullName = data?.legal_name?.trim() || ""
        partnerProfile = data 
      }

      else if (user.role === "community_admin") {
        const { data, error } = await supabaseClient
          .from("community_profiles")
          .select("community_name")
          .eq("user_id", user.id)
          .maybeSingle()
        
        if (error) console.error("Error get community profile:", error)

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
      partner_profile: partnerProfile,
      member_profile: memberProfile,
    })

  } catch (err) {
    console.error("GET /api/me error:", err)
    return NextResponse.json({ user: null })
  }
}