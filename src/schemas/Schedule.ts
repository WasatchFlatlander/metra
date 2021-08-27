import { ArgsType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import { Int } from "type-graphql";

@ArgsType()
@ObjectType({ description: "Line Schedule" })
export class Schedule {
  @Field()
  @Length(1, 4)
  name: string;

  @Field(() => [Int])
  times;
}
