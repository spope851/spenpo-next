import { Resolver, Query, Arg } from "type-graphql"
import { Posts } from "../schemas"
import { extractTagsFromPosts } from "../utils"

@Resolver(Posts)
class PostsResolver {
  @Query(() => Posts)
  async allPosts(@Arg("tag", () => String, { nullable: true }) tag?: string) {
    return await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts${
        tag ? `?tag=${tag}` : "/"
      }`
    )
      .then((res) => res.json())
      .then(extractTagsFromPosts)
  }
}

export { PostsResolver }
