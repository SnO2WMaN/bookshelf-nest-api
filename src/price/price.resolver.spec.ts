import {Test, TestingModule} from '@nestjs/testing';

import {ExchangeApiServiceMock} from '../exchange-rates-api/exchange-rates-api.service.mock';
import {ExchangeApiService} from '../exchange-rates-api/exchange-rates-api.service';

import {PriceResolver} from './price.resolver';

describe('PriceResolver', () => {
  let resolver: PriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {provide: ExchangeApiService, useClass: ExchangeApiServiceMock},
        PriceResolver,
      ],
    }).compile();

    resolver = module.get<PriceResolver>(PriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('JPYからUSDへ両替', async () => {
    const exchanged = await resolver.exchanged(
      {value: 100, currency: 'JPY'},
      'USD',
    );
    expect(exchanged).toStrictEqual({
      value: 1,
      currency: 'USD',
      approximately: true,
    });
  });

  it('JPYからJPYへ両替(何もしない)', async () => {
    const exchanged = await resolver.exchanged(
      {value: 100, currency: 'JPY'},
      'JPY',
    );
    expect(exchanged).toStrictEqual({
      value: 100,
      currency: 'JPY',
      approximately: false,
    });
  });
});
