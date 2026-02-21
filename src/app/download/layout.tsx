import { ReactNode } from "react"
import Navbar from "../../features/landing/components/layout/Navbar"
import Footer from "../../features/landing/components/layout/Footer"
import { UserProvider } from "../../features/landing/context/UserContext"

export const metadata = {
  title: "Download Aplikasi Hablun",
}

export default function DownloadLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <Navbar />
      <main className="pt-14">{children}</main>
      <Footer />
    </UserProvider>
  )
}