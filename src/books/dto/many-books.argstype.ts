import {ArgsType, Field, Int} from '@nestjs/graphql';
import {IsInt, Min, Max, IsPositive} from 'class-validator';

@ArgsType()
export class ManyBooksArgs {
  @Field((type) => Int, {defaultValue: 32})
  @IsInt()
  @IsPositive()
  @Max(80)
  limit: number;

  @Field((type) => Int, {defaultValue: 1})
  @IsInt()
  @IsPositive()
  page: number;
}
