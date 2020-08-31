import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class ManyBooksArgs {
  @Field((type) => [String], {nullable: true})
  categories?: string[];

  @Field((type) => [String], {nullable: true})
  keywords?: string[];
}
