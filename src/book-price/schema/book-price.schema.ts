import {Field, ObjectType} from '@nestjs/graphql';
import {IsISO31661Alpha3} from 'class-validator';

import {Price} from '../../price/schema/price.schema';

@ObjectType()
export class BookPrice {
  @Field(() => Price)
  base!: Price;

  @IsISO31661Alpha3()
  tax?: string;
}
