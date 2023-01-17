import { ObjectType, Field, ID } from "type-graphql"
import { Tag } from "./tag"

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

  @Field()
  date!: string

  @Field()
  excerpt!: string

  @Field(() => [Tag])
  tags!: Tag[]
}

export { BlogPost }
