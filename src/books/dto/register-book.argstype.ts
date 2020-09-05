import {ArgsType, Args, Field, Int} from '@nestjs/graphql';
import {IsInt} from 'class-validator';

import {Author} from '../schema/book.schema';

@ArgsType()
export class RegisterBookArgs {
  @Field({nullable: false})
  readonly title!: string;

  @Field((type) => Int, {nullable: true})
  @IsInt()
  readonly pages?: number;

  @Field((type) => [String], {nullable: true})
  readonly categories?: string[];

  @Field((type) => [String], {nullable: true})
  readonly keywords?: string[];
}
