import { __prod__ } from "@/utils/env"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

const client = (ssr: boolean = false) =>
  new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    uri: `${ssr ? "https://spenpo.com" : ""}/api/graphql`,

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
