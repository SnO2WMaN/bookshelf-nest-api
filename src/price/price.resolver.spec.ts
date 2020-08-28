import {Test, TestingModule} from '@nestjs/testing';
import {Injectable} from '@nestjs/common';

import {ExchangeApiService} from '../exchange-api/exchange-api.service.mock';

import {PriceResolver} from './price.resolver';
import {Price} from './schema/price.schema';

describe('PriceResolver', () => {
  let resolver: PriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeApiService, PriceResolver],
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
