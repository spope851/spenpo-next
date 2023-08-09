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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ShoppingCartContextProvider>
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
