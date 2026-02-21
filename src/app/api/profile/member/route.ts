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

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error("Server Error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
