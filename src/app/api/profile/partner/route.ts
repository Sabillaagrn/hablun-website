export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { supabaseClient } from "../../../../../lib/supabase-client"
import { sendUmkmEmail } from "../../../../../lib/email/sendUmkmEmail"

interface JwtPayload {
  id: string
  email: string
}

export async function POST(req: Request) {
  try {
    // =========================
    // AUTH
    // =========================
    const token = cookies().get("session")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    const body = await req.json()

    const isPublish = body.publish_to_umkm === "yes"

    // =========================
    // STATUS FLOW (CLEAN)
    // =========================
    let umkm_status: "draft" | "pending_review" | "not_requested" =
      "not_requested"

    if (isPublish) {
      umkm_status = body.umkm_template_file
        ? "pending_review"
        : "draft"
    }

    // =========================
    // UPSERT PROFILE
    // =========================
    const { error: profileError } =
      await supabaseClient
        .from("partner_profiles")
        .upsert(
          {
            user_id: decoded.id,

            legal_name: body.legal_name || "",
            business_type: body.business_type || "",
            nib_npwp: body.nib_npwp || "",
            owner_name: body.owner_name || "",
            office_address: body.office_address || "",

            industry_category:
              body.industry_category || "",
            business_description:
              body.business_description || "",
            business_scale:
              body.business_scale || "",

            special_offer: body.special_offer || "",
            collaboration_need:
              body.collaboration_need || "",
            payment_methods:
              body.payment_methods || "",

            partnership_model:
              body.partnership_model || "",
            referral_code: body.referral_code || "",
            social_links: body.social_links || "",

            // =========================
            // STORAGE PATHS (IMPORTANT)
            // =========================
            logo: body.logo || null,
            product_photos: body.product_photos || null,
            umkm_template_file:
              body.umkm_template_file || null,

            // =========================
            // UMKM FLOW
            // =========================
            publish_to_umkm: body.publish_to_umkm,
            umkm_submission_type:
              body.umkm_submission_type || null,
            umkm_status,

            submitted_at: isPublish
              ? new Date().toISOString()
              : null,
          },
          { onConflict: "user_id" }
        )

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      )
    }

    // =========================
    // UPDATE USER STATUS
    // =========================
    await supabaseClient
      .from("users")
      .update({ is_profile_complete: true })
      .eq("id", decoded.id)

    // =========================
    // EMAIL FLOW (ONLY WHEN READY)
    // =========================
    if (isPublish && body.umkm_template_file) {
      try {
        await sendUmkmEmail({
          user_id: decoded.id,
          legal_name: body.legal_name,
          owner_name: body.owner_name,
          business_description:
            body.business_description,

          logo: body.logo,
          product_photos: body.product_photos,
          umkm_template_file:
            body.umkm_template_file,

          umkm_status: "pending_review",
        })
      } catch (err: any) {
        console.error("Email Error:", err.message)
      }
    }

    // =========================
    // RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      umkm_status,
      message: isPublish
        ? "Submission terkirim ke Hablun"
        : "Profile tersimpan (draft)",
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}