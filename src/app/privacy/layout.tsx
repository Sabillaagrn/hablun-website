"use client"

import { ReactNode } from "react"
import { UserProvider } from "../../features/landing/context/UserContext"
import Navbar from "../../features/landing/components/layout/Navbar"
import Footer from "../../features/landing/components/layout/Footer"

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <Navbar />
      <main className="pt-14">{children}</main>
      <Footer />
    </UserProvider>
  )
}