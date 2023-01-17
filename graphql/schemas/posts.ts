import { ObjectType, Field, Int } from "type-graphql"
import { BlogPost } from "./blogpost"

@ObjectType()
class Posts {
  @Field(() => Int)
  found!: number

  @Field(() => [BlogPost])
  posts!: BlogPost[]
}

export { Posts }
