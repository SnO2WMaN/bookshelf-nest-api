import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {PriceService} from '../price/price.service';
import {Price} from '../price/schema/price.schema';

import {BookPrice} from './schema/book-price.schema';

export class UnsupportedTaxError extends Error {}

@Resolver((of) => BookPrice)
export class BookPriceResolver {
  constructor(private readonly priceService: PriceService) {}

  @ResolveField(() => Price)
  tax(@Parent() {base, tax}: BookPrice): Price {
    if (!tax) return {...base, value: 0};
    switch (tax) {
      case 'JPN':
        return {value: base.value * 0.1, currency: 'JPY'};
    }
    throw new UnsupportedTaxError();
  }

  @ResolveField(() => Price)
  calculated(@Parent() parent: BookPrice): Promise<Price> {
    return this.priceService.combine(parent.base, this.tax(parent));
  }
}
