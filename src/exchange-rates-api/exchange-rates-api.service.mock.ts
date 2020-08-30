import {Injectable} from '@nestjs/common';

import {Price} from '../price/schema/price.schema';

@Injectable()
export class ExchangeApiServiceMock {
  exchange(value: number, baseCurrency: string, targetCurrency: string): Price {
    if (baseCurrency === targetCurrency)
      return {value, currency: targetCurrency, approximately: false};
    if (baseCurrency === 'JPY' && targetCurrency === 'USD')
      return {value: value * 0.01, currency: 'USD', approximately: true};
    if (baseCurrency === 'USD' && targetCurrency === 'JPY')
      return {value: value * 100, currency: 'JPY', approximately: true};
    else throw Error();
  }
}
