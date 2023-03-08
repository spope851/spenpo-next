import { Resolver, Query } from "type-graphql"
import { Tags } from "../schemas"

@Resolver(Tags)
class TagsResolver {
  @Query(() => Tags)
  async allTags() {
    return await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/182626139/tags`
    ).then((res) => res.json())
  }
}

export { TagsResolver }
