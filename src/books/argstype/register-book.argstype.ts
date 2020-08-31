import {ArgsType, Args, Field, Int} from '@nestjs/graphql';
import {IsInt} from 'class-validator';

import {Author} from '../schema/book.schema';

@ArgsType()
export class RegisterBookArgs {
  @Field({nullable: false})
  title!: string;

  @Field((type) => Int, {nullable: true})
  @IsInt()
  pages?: number;

  @Field((type) => [String], {nullable: true})
  categories?: string[];

  @Field((type) => [String], {nullable: true})
  keywords?: string[];
}
