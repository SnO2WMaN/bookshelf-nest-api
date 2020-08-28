import {Injectable} from '@nestjs/common';

import {ExchangeApiService} from '../exchange-api/exchange-api.service';

import {Price} from './schema/price.schema';

@Injectable()
export class PriceService {
  constructor(private readonly exchangeService: ExchangeApiService) {}

  async combine(base: Price, ...targets: Price[]): Promise<Price> {
    if (targets.length === 0) return base;
    if (targets.length === 1) {
      const exchanged = await this.exchangeService.exchange(
        targets[0].value,
        targets[0].currency,
        base.currency,
      );
      return {
        value: base.value + exchanged.value,
        currency: base.currency,
        approximately: Boolean(base.approximately || exchanged.approximately),
      };
    } else
      return this.combine(
        await this.combine(base, targets[0]),
        ...targets.slice(1),
      );
  }
}
