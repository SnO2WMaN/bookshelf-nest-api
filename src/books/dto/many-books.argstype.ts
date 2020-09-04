import {ArgsType, Field, Int} from '@nestjs/graphql';
import {IsInt, Min, Max, IsPositive} from 'class-validator';

@ArgsType()
export class ManyBooksArgs {
  @Field((type) => Int, {nullable: false, defaultValue: 50})
  @IsInt()
  @IsPositive()
  @Max(100)
  limit: number;
}
