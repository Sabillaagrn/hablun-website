import { NextResponse } from "next/server"
import { supabaseClient } from "../../../../lib/supabase-client"

export async function GET() {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
