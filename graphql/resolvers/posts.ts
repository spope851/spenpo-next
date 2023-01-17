import { Resolver, Query, Arg } from "type-graphql"
import { Posts } from "../schemas"

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
      .then((data) => {
        const newData = data
        const posts = data.posts
        const tags = posts.map((post) => Object.values(post.tags))
        posts.forEach((post, idx) => {
          post.tags = tags[idx]
        })
        newData.posts = posts
        return newData
      })
  }
}

export { PostsResolver }
