import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Login App",
  description: "Next.js login application with TDD",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
