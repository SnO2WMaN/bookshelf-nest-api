import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {ExchangeApiService} from '../exchange-rates-api/exchange-rates-api.service';
import {ExchangeRatesAPISupportCurrency} from '../exchange-rates-api/exchange-rates-api.types';

import {Price} from './schema/price.schema';

@Resolver((of) => Price)
export class PriceResolver {
  constructor(private readonly exchangeService: ExchangeApiService) {}

  @ResolveField((type) => Price)
  async exchanged(
    @Parent() parent: Price,
    @Args('currency', {type: () => ExchangeRatesAPISupportCurrency})
    currency: keyof typeof ExchangeRatesAPISupportCurrency,
  ): Promise<Price> {
    return this.exchangeService.exchange(
      parent.value,
      parent.currency,
      currency,
    );
  }
}
