import { Resolver, Query, Arg } from "type-graphql"
import { BlogPost } from "../schemas"
import { extractTagsFromPost } from "../utils"

@Resolver(BlogPost)
class BlogpostResolver {
  @Query(() => BlogPost)
  async post(@Arg("id", () => String) id: string) {
    return await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts/${id}`
    )
      .then((res) => res.json())
      .then(extractTagsFromPost)
  }
}

export { BlogpostResolver }
