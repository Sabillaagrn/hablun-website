import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { supabaseClient} from "../../../../../lib/supabase-client"

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

    const body = await req.json()

    // =========================
    // UPSERT partner profile
    // =========================
    const { error: profileError } = await supabaseClient
      .from("partner_profiles")
      .upsert(
        {
          user_id: decoded.id,

          legal_name: body.legal_name || "",
          business_type: body.business_type || "",
          nib_npwp: body.nib_npwp || "",
          owner_name: body.owner_name || "",
          office_address: body.office_address || "",

          industry_category: body.industry_category || "",
          business_description: body.business_description || "",
          business_scale: body.business_scale || "",

          special_offer: body.special_offer || "",
          collaboration_need: body.collaboration_need || "",
          payment_methods: body.payment_methods || "",

          partnership_model: body.partnership_model || "",
          referral_code: body.referral_code || "",

          logo: body.logo || "",
          product_photos: body.product_photos || "",
          social_links: body.social_links || "",
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
      .eq("id", decoded.id)

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
