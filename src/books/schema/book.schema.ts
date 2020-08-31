import {Field, ID, Int, ObjectType} from '@nestjs/graphql';
import {IsInt} from 'class-validator';
import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {
  BookPrice,
  BookPriceSchema,
} from '../../book-price/schema/book-price.schema';
import {Version, VersionSchema} from '../../version/schema/version.schema';

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
export class Issuer {
  @Field()
  @Prop()
  name!: string;
}

@ObjectType()
export class Company {
  @Field()
  @Prop()
  name!: string;
}
const CompanySchema = SchemaFactory.createForClass(Company);

@ObjectType()
export class Publisher {
  @Field(() => [Issuer], {nullable: true})
  @Prop({type: [SchemaFactory.createForClass(Issuer)], required: false})
  issuers?: [Issuer];

  @Field(() => [Company], {nullable: true})
  @Prop({type: [CompanySchema], required: false})
  company?: [Company];
}

@ObjectType()
export class Printer {
  @Field(() => Company)
  @Prop({type: CompanySchema})
  company!: Company;

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

  @Field({nullable: true})
  @Prop({required: false})
  volume?: number;

  @Prop({type: [VersionSchema], required: false})
  versions?: Version[];

  @Prop({required: false})
  cover?: string;

  @Field((type) => Int, {nullable: true})
  @IsInt()
  @Prop({required: false})
  pages?: number;

  @Field((type) => [String], {nullable: true})
  @Prop({type: [String], required: false})
  categories?: string[];

  @Field((type) => [String], {nullable: true})
  @Prop({type: [String], required: false})
  keywords?: string[];

  @Field((type) => Publisher, {nullable: true})
  @Prop({type: SchemaFactory.createForClass(Publisher), required: false})
  publishers?: Publisher;

  @Field((type) => [Printer], {nullable: true})
  @Prop({type: [SchemaFactory.createForClass(Printer)], required: false})
  printers?: Printer[];

  @Field((type) => BookPrice, {nullable: true})
  @Prop({type: BookPriceSchema, required: false})
  price?: BookPrice;
}
export const BookSchema = SchemaFactory.createForClass(Book);
