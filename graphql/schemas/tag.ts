import { ObjectType, Field, ID, Int } from "type-graphql"

@ObjectType()
class Tag {
  @Field(() => ID)
  ID!: string

  @Field(() => String!)
  name!: string

  @Field(() => String!)
  slug!: string

  @Field(() => Int, { nullable: true })
  post_count?: number
}

export { Tag }
