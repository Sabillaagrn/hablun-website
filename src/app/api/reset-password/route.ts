import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function POST(req: Request) {
  try {
    const { email, password } =
      await req.json()

    // VALIDASI
    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Email dan password wajib diisi",
        },
        { status: 400 }
      )
    }

    // CEK USER
    const { data: user, error } =
      await supabaseClient
        .from("users")
        .select("*")
        .eq("email", email)
        .single()

    if (error || !user) {
      return NextResponse.json(
        {
          error:
            "User tidak ditemukan",
        },
        { status: 404 }
      )
    }

    // HASH PASSWORD BARU
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // UPDATE PASSWORD
    const { error: updateError } =
      await supabaseClient
        .from("users")
        .update({
          password: hashedPassword,
        })
        .eq("id", user.id)

    if (updateError) {
      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message:
        "Password berhasil diubah",
    })

  } catch (error) {
    console.error(
      "RESET PASSWORD ERROR:",
      error
    )

    return NextResponse.json(
      {
        error: "Server error",
      },
      { status: 500 }
    )
  }
}