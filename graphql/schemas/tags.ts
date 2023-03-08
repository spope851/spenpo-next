import { ObjectType, Field, Int } from "type-graphql"
import { Tag } from "./tag"

@ObjectType()
class Tags {
  @Field(() => Int)
  found!: number

  @Field(() => [Tag])
  tags!: Tag[]
}

export { Tags }
