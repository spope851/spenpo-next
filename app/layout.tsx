import Layout from '@/components/layout'
import { NextAuthProvider } from './nextAuthProvider'
import { ThemeProvider } from '@/components/themeProvider'

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
