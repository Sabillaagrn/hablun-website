import { Resend } from "resend"

let client: Resend | null = null

export function getResend(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return (getResend() as never)[prop]
  },
})
