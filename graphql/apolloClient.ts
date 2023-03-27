import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

const url = process.env.VERCEL_URL

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: cache,
  link: createHttpLink({
    uri: `http${url ? `s://${url}` : "://localhost:3000"}/api/graphql`,
  }),
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
})

export default client
