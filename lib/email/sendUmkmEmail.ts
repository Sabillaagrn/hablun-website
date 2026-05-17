import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface Props {
  user_id: string

  legal_name: string
  owner_name: string
  business_description: string

  logo?: string
  product_photos?: string
  umkm_template_file?: string

  umkm_status: string
}

export async function sendUmkmEmail({
  legal_name,
  owner_name,
  business_description,
  logo,
  product_photos,
  umkm_template_file,
  umkm_status,
}: Props) {
  try {
    const FROM_EMAIL =
      process.env.RESEND_FROM_EMAIL ||
      "Hablun UMKM <onboarding@resend.dev>"

    const TO_EMAILS = process.env.HABLUN_EMAIL
      ? process.env.HABLUN_EMAIL.split(",")
      : [
          "Marketing.hablun@gmail.com",
          "marketing@hablunhub.com",
        ]

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,

      to: TO_EMAILS,

      subject: `📩 Pengajuan UMKM - ${
        legal_name || "-"
      }`,

      html: `
        <div style="font-family:Arial, sans-serif; padding:20px; background:#f9f9f9">

          <div style="background:#fff; padding:20px; border-radius:12px">

            <h2>Pengajuan UMKM Baru</h2>

            <p>
              <strong>Nama Bisnis:</strong>
              ${legal_name || "-"}
            </p>

            <p>
              <strong>Pemilik:</strong>
              ${owner_name || "-"}
            </p>

            <p>
              <strong>Status:</strong>
              ${umkm_status || "-"}
            </p>

            <hr style="margin:16px 0"/>

            <p>
              <strong>Deskripsi:</strong>
            </p>

            <p style="white-space:pre-line; color:#444">
              ${business_description || "-"}
            </p>

            ${
              logo
                ? `
              <p>
                <strong>Logo:</strong><br/>
                <a href="${logo}" target="_blank">
                  Lihat Logo
                </a>
              </p>
            `
                : ""
            }

            ${
              product_photos
                ? `
              <p>
                <strong>Foto Produk:</strong><br/>
                <a href="${product_photos}" target="_blank">
                  Lihat Foto Produk
                </a>
              </p>
            `
                : ""
            }

            ${
              umkm_template_file
                ? `
              <p>
                <strong>Template UMKM:</strong><br/>
                <a href="${umkm_template_file}" target="_blank">
                  Download File
                </a>
              </p>
            `
                : `
              <p style="color:#999">
                Template UMKM tidak dilampirkan
              </p>
            `
            }

            <hr style="margin:16px 0"/>

            <small style="color:#888">
              Sistem otomatis Hablun UMKM
            </small>

          </div>
        </div>
      `,
    })

    if (error) {
      console.error("RESEND ERROR:", error)
      throw new Error("Email gagal dikirim")
    }

    return {
      success: true,
      id: data?.id,
    }
  } catch (err) {
    console.error(
      "sendUmkmEmail error:",
      err
    )

    throw err
  }
}