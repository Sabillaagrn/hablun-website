import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { supabaseClient } from "../../../../../lib/supabase-client"

interface JwtPayload {
  id: string
  email: string
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    const user_id = decoded.id
    const body = await req.json()

    // =========================
    // UPSERT community profile
    // =========================
    const { error: profileError } = await supabaseClient
      .from("community_profiles")
      .upsert(
        {
          user_id,

          community_name: body.community_name || "",
          category: body.category || "",
          vision_mission: body.vision_mission || "",
          headquarters: body.headquarters || "",

          admin_full_name: body.admin_full_name || "",
          admin_position: body.admin_position || "",
          admin_whatsapp: body.admin_whatsapp || "",
          admin_email: body.admin_email || "",

          estimated_members: Number(body.estimated_members) || 0,
          required_features: body.required_features || "",

          legal_document: body.legal_document || "",
          has_business_unit: Boolean(body.has_business_unit),
          bank_account: body.bank_account || "",

          logo: body.logo || "",
        },
        {
          onConflict: "user_id",
        }
      )

    if (profileError) {
      console.error("Profile Error:", profileError.message)
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      )
    }

    // =========================
    // Update users table
    // =========================
    const { error: userError } = await supabaseClient
      .from("users")
      .update({ is_profile_complete: true })
      .eq("id", user_id)

    if (userError) {
      console.error("User Update Error:", userError.message)
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Server Error:", err.message)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
