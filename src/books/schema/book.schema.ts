import {Field, ID, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsInt, IsISBN} from 'class-validator';
import {ISBNResolver as ISBN} from 'graphql-scalars';
import {Document} from 'mongoose';

@ObjectType()
@Schema()
export class Author {
  @Field()
  @Prop()
  name!: string;

  @Field(() => [String], {nullable: true})
  @Prop({type: [String], required: false})
  roles?: string[];
}

@ObjectType()
@Schema()
export class Book extends Document {
  @Field((type) => ID)
  id!: string;

  @Field()
  @Prop()
  title: string;

  @Field((type) => [Author], {nullable: true})
  @Prop({type: [SchemaFactory.createForClass(Author)], required: false})
  authors?: Author[];

  @Prop({required: false})
  cover?: string;

  @Field((type) => Int, {nullable: true})
  @IsInt()
  @Prop({required: false})
  pages?: number;

  @Field((type) => ISBN, {nullable: true})
  @Prop({required: false})
  isbn?: string;

  @Prop({required: false})
  jan?: string;

  @Prop({type: String, required: false})
  publishedAt?: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
