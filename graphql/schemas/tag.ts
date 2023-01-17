import { ObjectType, Field, ID, Int } from "type-graphql"

@ObjectType()
class Tag {
  @Field(() => ID)
  ID!: string

  @Field(() => String!)
  name!: string

  @Field(() => Int!)
  post_count!: number
}

export { Tag }
