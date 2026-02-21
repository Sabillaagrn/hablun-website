  import { NextResponse } from "next/server"
  import { supabaseClient } from "../../../../lib/supabase-client"
  import bcrypt from "bcryptjs"
  import jwt from "jsonwebtoken"

  export async function POST(req: Request) {
    try {
      const { email, password } = await req.json()

      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        )
      }

      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("email", email)
        .limit(1)

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }

      const user = data?.[0]

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 400 }
        )
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return NextResponse.json(
          { error: "Wrong password" },
          { status: 400 }
        )
      }

      // 🔐 Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          is_profile_complete: user.is_profile_complete
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      // 🎯 Tentukan redirect berdasarkan profile
      const redirectTo = user.is_profile_complete
        ? "/"
        : "/complete-profile"

      const response = NextResponse.json({
        message: "Login success",
        redirectTo
      })

      // 🍪 Secure cookie setup
      response.cookies.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ auto secure
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })

      return response

    } catch (error) {
      console.error("LOGIN ERROR:", error)
      return NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      )
    }
  }
