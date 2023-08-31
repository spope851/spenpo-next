import "animate.css"
import "@/styles/globals.css"
import "@/styles/projects.css"
import "@/svelte-apps/dist/lang-flash-bundle.css"
import "@/svelte-apps/dist/two-truths-bundle.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import Layout from "@/components/layout"
import client from "../graphql/apolloClient"
import { ThemeProvider } from "@/components/themeProvider"
import { ShoppingCartContextProvider } from "@/context/shoppingCart"
import { SessionProvider } from "next-auth/react"
import { UnAuthContextProvider } from "@/context/unAuth"
import { SnackbarContextProvider } from "@/context/snackbar"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UnAuthContextProvider>
        <SnackbarContextProvider>
          <ThemeProvider>
            <ShoppingCartContextProvider>
              <ApolloProvider client={client}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ApolloProvider>
            </ShoppingCartContextProvider>
          </ThemeProvider>
        </SnackbarContextProvider>
      </UnAuthContextProvider>
    </SessionProvider>
  )
}
