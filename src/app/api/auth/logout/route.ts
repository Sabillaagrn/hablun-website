import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Buat response JSON terlebih dahulu
    const response = NextResponse.json({ ok: true })

    // Hapus cookie session dengan benar
    response.cookies.set({
      name: "session",
      value: "",
      maxAge: 0,  // expire segera
      path: "/",   // harus path "/"
      httpOnly: true, // aman dari JS frontend
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  } catch (err) {
    console.error("POST /api/auth/logout error:", err)
    return NextResponse.json({ ok: false, error: "Logout failed" }, { status: 500 })
  }
}