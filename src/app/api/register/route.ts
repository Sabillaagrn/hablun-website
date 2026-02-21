import { NextResponse } from "next/server"
import { supabaseClient } from "../../../../lib/supabase-client"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, role } = body

    // ✅ Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password and role are required" },
        { status: 400 }
      )
    }

    // ✅ Validate role
    const allowedRoles = ["member", "partner", "community_admin"]

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }

    // ✅ Check existing email
    const { data: existingUser, error: checkError } = await supabaseClient
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1)

    if (checkError) {
      return NextResponse.json(
        { error: checkError.message },
        { status: 400 }
      )
    }

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Insert user
    const { data: user, error: insertError } = await supabaseClient
      .from("users")
      .insert({
        email,
        password: hashedPassword,
        role, // 🔥 langsung isi
        is_profile_complete: false,
        accepted_privacy: true,
        accepted_terms: true
      })
      .select()
      .single()

    if (insertError || !user) {
      return NextResponse.json(
        { error: insertError?.message || "Failed to create user" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: "Register success",
      userId: user.id
    })

  } catch (error) {
    console.error("REGISTER ERROR:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
