import { NextResponse } from "next/server"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File
    const bucket = formData.get("bucket") as string

    if (!file || !bucket) {
      return NextResponse.json(
        { error: "File atau bucket tidak ditemukan" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabaseClient.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("UPLOAD ERROR:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return NextResponse.json({ url: data.publicUrl })

  } catch (err) {
    console.error("API UPLOAD ERROR:", err)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat upload" },
      { status: 500 }
    )
  }
}