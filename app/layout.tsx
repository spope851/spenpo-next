import Layout from './components/layout'
import { NextAuthProvider } from './context/nextAuth'
import { ThemeProvider } from './context/theme'
import { Metadata } from 'next'
import React from 'react'
import { SnackbarContextProvider } from './context/snackbar'
import { UnAuthContextProvider } from './context/unAuth'
import { MenuContextProvider } from './components/Menu'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Spencer Pope'
  const description = 'Developer & Entrepreneur'

  return {
    metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
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
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon.ico',
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
          <UnAuthContextProvider>
            <SnackbarContextProvider>
              <MenuContextProvider>
                <ThemeProvider>
                  <Layout>{children}</Layout>
                </ThemeProvider>
              </MenuContextProvider>
            </SnackbarContextProvider>
          </UnAuthContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
