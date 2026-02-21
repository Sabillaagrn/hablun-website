import "./globals.css"
import type { Metadata } from "next"
import { UserProvider } from '../features/landing/context/UserContext'


export const metadata: Metadata = {
  title: "Hablun - Platform Komunitas",
  description: "Platform pengelolaan komunitas Islami modern & terintegrasi.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
