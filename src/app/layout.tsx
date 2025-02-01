import "./globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react" // Change from type import to regular import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your Blog",
  description: "Your blog description here",
  keywords: ["web development", "software engineering", "tech books", "projects", "Next.js", "React", "accessibility"],
  openGraph: {
    title: "My Simple Blog | Web Development and Tech Insights",
    description:
      "Explore web development tips, software engineering experiences, tech book reviews, and interesting projects in this comprehensive tech blog.",
    url: "https://mysimpleblog.com",
    siteName: "My Simple Blog",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "My Simple Blog | Web Development and Tech Insights",
    card: "summary_large_image",
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

