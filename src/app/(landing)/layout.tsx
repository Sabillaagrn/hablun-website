import Footer from "../../features/landing/components/layout/Footer"
import Navbar from "../../features/landing/components/layout/Navbar"
import { UserProvider } from "../../features/landing/context/UserContext"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <Navbar />
      <main className="pt-14">{children}</main>
      <Footer />
    </UserProvider>
  )
}