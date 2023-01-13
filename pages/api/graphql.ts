import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import {
  ObjectType,
  Field,
  ID,
  Int,
  Resolver,
  Query,
  Arg,
  buildSchema,
} from "type-graphql"

@ObjectType()
class BlogPost {
  @Field(() => ID)
  ID!: string

  @Field(() => String!)
  URL!: string

  @Field(() => String!)
  content!: string

  @Field(() => String!)
  title!: string
}

@ObjectType()
class Posts {
  @Field(() => Int)
  found!: number

  @Field(() => [BlogPost])
  posts!: BlogPost[]
}

@Resolver(Posts)
class BlogPostsResolver {
  @Query(() => Posts)
  async blogPosts() {
    return await fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts/"
    ).then((res) => res.json())
  }
}

@Resolver(BlogPost)
class PostResolver {
  @Query(() => BlogPost)
  async post(@Arg("id", () => String) id: string) {
    return await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts/${id}`
    ).then((res) => res.json())
  }
}

const schema = await buildSchema({
  resolvers: [PostResolver, BlogPostsResolver],
})

const server = new ApolloServer({ schema })

export default startServerAndCreateNextHandler(server)
