import { __prod__ } from "@/utils/env"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

const client = (ssr: boolean = false) =>
  new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    uri: `http${
      __prod__ ? `s://${process.env.VERCEL_URL}` : `://localhost:3000`
    }/api/graphql`,

    // Provide some optional constructor fields
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
