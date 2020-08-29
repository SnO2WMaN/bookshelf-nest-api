import {Field, Int, ObjectType} from '@nestjs/graphql';
import {IsInt, IsISBN} from 'class-validator';

@ObjectType()
export class Version {
  @Field(() => Int, {defaultValue: 1})
  @IsInt()
  version!: number;

  @IsISBN()
  isbn?: string;

  publishedAt?: string;

  @Field({nullable: true})
  meta?: string;
}
