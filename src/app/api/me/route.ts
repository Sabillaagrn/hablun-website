import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function GET() {
  try {
    const cookieStore = cookies()
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

    // 🔹 Ambil data user + is_profile_complete
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("id, email, role, is_profile_complete")
      .eq("id", userId)
      .maybeSingle()

    if (userError || !user) {
      return NextResponse.json({ user: null })
    }

    let fullName = ""

    // 🔹 Ambil nama hanya jika profile sudah complete
    if (user.is_profile_complete && user.role) {
      if (user.role === "member") {
        const { data } = await supabaseClient
          .from("member_profiles")
          .select("username")
          .eq("user_id", user.id)
          .maybeSingle()
        fullName = data?.username?.trim() || ""
      } else if (user.role === "partner") {
        const { data } = await supabaseClient
          .from("partner_profiles")
          .select("legal_name")
          .eq("user_id", user.id)
          .maybeSingle()
        fullName = data?.legal_name?.trim() || ""
      } else if (user.role === "community_admin") {
        const { data } = await supabaseClient
          .from("community_profiles")
          .select("community_name")
          .eq("user_id", user.id)
          .maybeSingle()
        fullName = data?.community_name?.trim() || ""
      }
    }

    // 🔹 Fallback ke email kalau belum ada nama
    if (!fullName) {
      fullName = user.email.split("@")[0]
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_profile_complete: user.is_profile_complete,
        name: fullName
      }
    })

  } catch (err) {
    console.error("GET /api/me error:", err)
    return NextResponse.json({ user: null })
  }
}
