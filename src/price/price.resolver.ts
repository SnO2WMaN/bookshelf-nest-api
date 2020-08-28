import {Resolver, ResolveField, Args, Parent} from '@nestjs/graphql';

import {ExchangeApiService} from '../exchange-api/exchange-api.service';

import {Price} from './schema/price.schema';
import {PriceService} from './price.service';

@Resolver((of) => Price)
export class PriceResolver {
  constructor(private readonly exchangeService: ExchangeApiService) {}

  @ResolveField((type) => Price) async exchanged(
    @Parent() parent: Price,
    @Args('currency', {type: () => String}) currency: string,
  ): Promise<Price> {
    return this.exchangeService.exchange(
      parent.value,
      parent.currency,
      currency,
    );
  }
}
