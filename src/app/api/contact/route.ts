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
      to: "1237050049@student.uinsgd.ac.id",
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
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, sans-serif;">

<!-- PREHEADER (agar snippet Gmail bagus) -->
<div style="display:none; max-height:0; overflow:hidden; opacity:0;">
Pesan baru dari ${safeName} (${safeEmail}) melalui formulir website Hablun Hub.
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff; border-radius:12px; padding:30px; border:1px solid #e5e7eb;">

<tr>
<td>
<h2 style="margin:0; color:#16a34a;">
Pesan Baru dari Website
</h2>
<p style="margin:8px 0 20px 0; color:#6b7280; font-size:14px;">
Seseorang mengirim pesan melalui formulir kontak.
</p>
<hr style="border:none; border-top:1px solid #e5e7eb;">
</td>
</tr>

<tr>
<td style="padding-top:20px; color:#374151; font-size:14px; line-height:1.6;">

<p style="margin:0 0 12px 0;">
<strong>Nama</strong><br/>
${safeName}
</p>

<p style="margin:0 0 12px 0;">
<strong>Email</strong><br/>
<a href="mailto:${safeEmail}" style="color:#16a34a; text-decoration:none;">
${safeEmail}
</a>
</p>

<p style="margin:20px 0 8px 0;">
<strong>Pesan</strong>
</p>

<div style="
background:#f9fafb;
padding:15px;
border-radius:8px;
border:1px solid #e5e7eb;
white-space:pre-line;">
${safeMessage}
</div>

</td>
</tr>

<tr>
<td style="padding-top:30px;">
<hr style="border:none; border-top:1px solid #e5e7eb;">
<p style="font-size:12px; color:#9ca3af; text-align:center; margin-top:15px;">
© ${new Date().getFullYear()} Hablun Hub · Email otomatis dari hablunhub.com
</p>
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