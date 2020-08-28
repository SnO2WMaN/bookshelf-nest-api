import {Field, Int, ObjectType} from '@nestjs/graphql';
import {IsInt, IsISBN} from 'class-validator';

@ObjectType()
export class Version {
  @Field(() => Int, {defaultValue: 1})
  @IsInt()
  version!: number;

  @Field({nullable: true})
  @IsISBN()
  isbn?: string;

  @Field((type) => Date, {nullable: true})
  publishedAt?: string;

  @Field({nullable: true})
  meta?: string;
}
