import Layout from '../components/layout'
import { NextAuthProvider } from './nextAuthProvider'
import { ThemeProvider } from '../components/themeProvider'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Spencer Pope'
  const description = 'Developer & Entrepreneur'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: process.env.VERCEL_URL,
      siteName: 'spenpo.com',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/images/favicon.png',
      shortcut: '/images/favicon.png',
      apple: '/images/favicon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/favicon.png',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@s_pop3',
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <NextAuthProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
