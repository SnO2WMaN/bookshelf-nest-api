import {HttpService, Injectable} from '@nestjs/common';

import {Price} from '../price/schema/price.schema';

export class UnsupportedCurrencyError extends Error {
  constructor(currency: string | string[]) {
    if (Array.isArray(currency))
      super(`Unsupported currencies (${currency.join(',')}) to exchange`);
    else super(`Unsupported currency (${currency}) to exchange`);
  }
}

@Injectable()
export class ExchangeApiService {
  constructor(private readonly httpService: HttpService) {}

  async exchange(
    value: number,
    baseCurrency: string,
    targetCurrency: string,
  ): Promise<Price> {
    if (baseCurrency === targetCurrency)
      return {value, currency: targetCurrency};

    if (!this.isSupportedCurrency(baseCurrency))
      throw new UnsupportedCurrencyError(baseCurrency);

    if (!this.isSupportedCurrency(targetCurrency))
      throw new UnsupportedCurrencyError(targetCurrency);

    const {data} = await this.httpService
      .get('https://api.exchangeratesapi.io/latest', {
        params: {base: baseCurrency, symbols: targetCurrency},
      })
      .toPromise();

    return {
      value: value * data.rates[targetCurrency],
      currency: targetCurrency,
      approximately: true,
    };
  }

  isSupportedCurrency(currency: string): boolean {
    return [
      'CAD',
      'HKD',
      'ISK',
      'PHP',
      'DKK',
      'HUF',
      'CZK',
      'AUD',
      'RON',
      'SEK',
      'IDR',
      'INR',
      'BRL',
      'RUB',
      'HRK',
      'JPY',
      'THB',
      'CHF',
      'SGD',
      'PLN',
      'BGN',
      'TRY',
      'CNY',
      'NOK',
      'NZD',
      'ZAR',
      'USD',
      'MXN',
      'ILS',
      'GBP',
      'KRW',
      'MYR',
      'EUR',
    ].includes(currency);
  }
}
