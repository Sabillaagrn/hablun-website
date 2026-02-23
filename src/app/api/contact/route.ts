import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Escape HTML (anti injection)
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Simple email validation
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim())

    await resend.emails.send({
      from: "Hablun <contact@hablunhub.com>",
      to: "marketing@hablunhub.com",
      replyTo: safeEmail,
      subject: `Pesan baru dari ${safeName} - Hablun Hub`,

      // TEXT VERSION (penting untuk deliverability)
      text: `Pesan baru - Website Hablun

Nama  : ${safeName}
Email : ${safeEmail}

Pesan:
${safeMessage}
`,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Pesan Baru</title>
        </head>

        <body style="margin:0; padding:20px; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">

        <!-- SNIPPET FORCE -->
        <span style="font-size:1px; color:#ffffff;">
        Pesan dari ${safeName} (${safeEmail}) - ${safeMessage.substring(0, 80)}
        </span>

        <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center">

        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #e5e7eb;">

        <!-- HEADER -->
        <tr>
        <td style="padding:20px 25px; background:#16a34a;">
        <h2 style="margin:0; color:#ffffff; font-size:18px;">
        📩 Pesan Masuk Website
        </h2>
        </td>
        </tr>

        <!-- BODY -->
        <tr>
        <td style="padding:25px; font-size:14px; line-height:1.7;">

        <table width="100%" cellpadding="0" cellspacing="0">

        <tr>
        <td style="padding:8px 0; width:120px; color:#6b7280;">
        <strong>Nama</strong>
        </td>
        <td style="padding:8px 0;">
        ${safeName}
        </td>
        </tr>

        <tr>
        <td style="padding:8px 0; color:#6b7280;">
        <strong>Email</strong>
        </td>
        <td style="padding:8px 0;">
        <a href="mailto:${safeEmail}" style="color:#16a34a; text-decoration:none;">
        ${safeEmail}
        </a>
        </td>
        </tr>

        </table>

        <!-- MESSAGE BOX -->
        <div style="
        margin-top:20px;
        padding:15px;
        background:#f9fafb;
        border:1px solid #e5e7eb;
        white-space:pre-line;
        ">
        ${safeMessage}
        </div>

        </td>
        </tr>

        <!-- FOOTER -->
        <tr>
        <td style="padding:15px 25px; background:#f9fafb; font-size:12px; color:#6b7280; text-align:center;">
        Email otomatis dari hablunhub.com<br/>
        © ${new Date().getFullYear()} Hablun Hub
        </td>
        </tr>

        </table>

        </td>
        </tr>
        </table>

        </body>
        </html>
        `,

      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Gagal kirim email" },
      { status: 500 }
    )
  }
}