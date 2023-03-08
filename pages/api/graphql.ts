import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { buildSchema } from "type-graphql"
import { BlogpostResolver, PostsResolver, TagsResolver } from "@/graphql/resolvers"

const schema = await buildSchema({
  resolvers: [BlogpostResolver, PostsResolver, TagsResolver],
})

const server = new ApolloServer({ schema })

export default startServerAndCreateNextHandler(server)
