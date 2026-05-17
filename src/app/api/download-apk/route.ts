export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // 🔐 cek login dari cookie
    const cookieStore = cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const filePath = path.join(process.cwd(), "private", "apk", "app-hablun.apk")

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="hablun-app.apk"',
      },
    })
  } catch (err) {
    console.error("Download APK error:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}