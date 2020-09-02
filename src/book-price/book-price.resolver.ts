import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {PriceService} from '../price/price.service';
import {Price} from '../price/schema/price.schema';

import {BookPriceService} from './book-price.service';
import {BookPrice} from './schema/book-price.schema';

export class UnsupportedTaxError extends Error {}

@Resolver((of) => BookPrice)
export class BookPriceResolver {
  constructor(
    private readonly priceService: PriceService,
    private readonly bookpriceService: BookPriceService,
  ) {}

  @ResolveField(() => Price, {nullable: true})
  tax(@Parent() {base, tax}: BookPrice): Price | null {
    if (tax)
      switch (tax) {
        case 'JPN':
          return this.bookpriceService.japaneseComsumptionTax(base);
      }
    return null;
  }

  @ResolveField(() => Price)
  calculated(@Parent() parent: BookPrice) {
    const tax = this.tax(parent);
    return tax ? this.priceService.combine(parent.base, tax) : parent.base;
  }
}
