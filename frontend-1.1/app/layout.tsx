import type React from "react"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "../components/toast"
import { PageTransition } from "../components/page-transition"
import { Footer } from "../components/footer"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans-pro",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSansPro.variable} antialiased`}>
      <body>
        <ToastProvider>
          <PageTransition>
            {children}
            <Footer />
          </PageTransition>
        </ToastProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
