import 'animate.css'
import '../svelte-apps/dist/lang-flash-bundle.css'
import '../svelte-apps/dist/two-truths-bundle.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ThemeProvider } from '../components/themeProvider'
import { SessionProvider } from 'next-auth/react'
import { UnAuthContextProvider } from '../context/unAuth'
import { SnackbarContextProvider } from '../context/snackbar'
import React from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UnAuthContextProvider>
        <SnackbarContextProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SnackbarContextProvider>
      </UnAuthContextProvider>
    </SessionProvider>
  )
}
