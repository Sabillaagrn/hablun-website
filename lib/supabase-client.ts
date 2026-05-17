import { createClient, SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return client
}

export const supabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabaseClient() as never)[prop]
  },
})
