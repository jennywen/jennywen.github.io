import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jenny Wen',
  description: 'Portfolio and blog',
  metadataBase: new URL('https://jennywen.ca'),  // Replace with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jennywen.ca',
    title: 'Jenny Wen',
    description: 'Portfolio and blog',
    siteName: 'Jenny Wen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jenny Wen',
    description: 'Portfolio and blog',
    creator: '@jenny_wen',
  },
  other: {
    'typekit': 'rku4zxn'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rku4zxn.css" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌻</text></svg>"
        />
      </head>
      <body className="bg-white dark:bg-black">
        {children}
      </body>
    </html>
  )
} 