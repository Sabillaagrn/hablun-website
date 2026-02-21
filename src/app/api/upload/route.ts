import { NextResponse } from "next/server"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const bucket = formData.get("bucket") as string

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabaseClient.storage
    .from(bucket)
    .upload(fileName, buffer)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return NextResponse.json({ url: data.publicUrl })
}
