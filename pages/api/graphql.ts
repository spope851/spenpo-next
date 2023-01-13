import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";
import Cors from 'micro-cors'
import { ObjectType, Field, ID, Int, Resolver, Query, Arg, buildSchema } from "type-graphql";

@ObjectType()
class BlogPost {
  @Field(() => ID)
  ID!: string;

  @Field()
  URL!: string;

  @Field()
  content!: string;

  @Field()
  title!: string;
}

@ObjectType()
class Posts {
  @Field(() => Int)
  found!: number;

  @Field(() => [BlogPost])
  posts!: BlogPost[];
}

@Resolver(Posts)
class BlogPostsResolver {
  @Query(() => Posts)
  async blogPosts() {
    return await fetch('https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts/').then(res => res.json())
  }
}

@Resolver(BlogPost)
class PostResolver {
  @Query(() => BlogPost)
  async post(@Arg("id") id: string) {
    return await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts/${id}`).then(res => res.json())
  }
}

const schema = async () => await buildSchema({
  resolvers: [PostResolver, BlogPostsResolver]
})

const cors = Cors()

export default cors(async function handler(req: MicroRequest, res: ServerResponse<IncomingMessage>) {
    const apolloServer = new ApolloServer({ schema: await schema() });

    const startServer = apolloServer.start()

    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    await startServer;

    await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
})

export const config = {
  api: {
    bodyParser: false
  }
};