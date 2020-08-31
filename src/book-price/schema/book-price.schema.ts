import {Field, ObjectType} from '@nestjs/graphql';
import {IsISO31661Alpha3} from 'class-validator';
import {SchemaFactory, Schema, Prop} from '@nestjs/mongoose';

import {Price} from '../../price/schema/price.schema';

@ObjectType()
@Schema()
export class BookPrice {
  @Field(() => Price)
  @Prop()
  base!: Price;

  @IsISO31661Alpha3()
  @Prop({required: false})
  tax?: string;
}
export const BookPriceSchema = SchemaFactory.createForClass(BookPrice);
