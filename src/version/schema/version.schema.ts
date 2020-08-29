import {Field, Int, ObjectType} from '@nestjs/graphql';
import {IsInt, IsISBN} from 'class-validator';
import {ISBNResolver as ISBN, DateResolver as Date} from 'graphql-scalars';

@ObjectType()
export class Version {
  @Field(() => Int, {defaultValue: 1})
  @IsInt()
  version!: number;

  @Field((type) => ISBN, {nullable: true})
  @IsISBN()
  isbn?: string;

  @Field(() => Date, {nullable: true})
  publishedAt?: string;

  @Field({nullable: true})
  meta?: string;
}
