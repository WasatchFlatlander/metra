import { ArgsType, Field, ObjectType } from "type-graphql";
import { ArrayNotEmpty, ArrayUnique, Length, Max, Min } from "class-validator";
import { Int } from "type-graphql";

@ArgsType()
@ObjectType({ description: "Line Schedule" })
export class Schedule {
  @Field({ description: "Name of Line" })
  @Length(1, 4)
  name: string;

  @Field(() => [Int], {
    description:
      "Array of valid stop times 0-1439 minutes (# minutes in a day)",
  })
  @ArrayNotEmpty()
  @ArrayUnique()
  @Min(0, {
    each: true,
  })
  @Max(1439, {
    each: true,
  })
  times;
}
