import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {IsInt, IsISBN} from 'class-validator';
import {DateResolver as Date, ISBNResolver as ISBN} from 'graphql-scalars';

@ObjectType()
@Schema()
export class Version {
  @Field(() => Int, {defaultValue: 1})
  @IsInt()
  @Prop()
  version!: number;

  @Field((type) => ISBN, {nullable: true})
  @IsISBN()
  @Prop({required: false})
  isbn?: string;

  @Field(() => Date, {nullable: true})
  @Prop({type: String, required: false})
  publishedAt?: string;

  @Field({nullable: true})
  @Prop({type: String, required: false})
  meta?: string;
}
export const VersionSchema = SchemaFactory.createForClass(Version);
