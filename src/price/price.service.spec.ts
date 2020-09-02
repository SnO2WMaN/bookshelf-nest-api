import {Test, TestingModule} from '@nestjs/testing';

import {ExchangeApiServiceMock} from '../exchange-rates-api/exchange-rates-api.service.mock';
import {ExchangeApiService} from '../exchange-rates-api/exchange-rates-api.service';

import {PriceService} from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {provide: ExchangeApiService, useClass: ExchangeApiServiceMock},
        PriceService,
      ],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('金額の加算', () => {
    it('足し合わせる金額がなければそのまま返す', async () => {
      const combined = await service.combine({
        value: 100,
        currency: 'JPY',
        approximately: false,
      });
      expect(combined).toStrictEqual({
        value: 100,
        currency: 'JPY',
        approximately: false,
      });
    });
    it('両替を考えずに金額を足し合わせる', async () => {
      expect(
        await service.combine(
          {value: 100, currency: 'JPY'},
          {value: 200, currency: 'JPY'},
        ),
      ).toStrictEqual({
        value: 300,
        currency: 'JPY',
        approximately: false,
      });

      expect(
        await service.combine(
          {value: 100, currency: 'JPY'},
          {value: 200, currency: 'JPY'},
          {value: 300, currency: 'JPY'},
        ),
      ).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: false,
      });
    });

    it('両替を考えて金額を足し合わせる', async () => {
      expect(
        await service.combine(
          {value: 100, currency: 'JPY'},
          {value: 2, currency: 'USD'},
        ),
      ).toStrictEqual({
        value: 300,
        currency: 'JPY',
        approximately: true,
      });

      expect(
        await service.combine(
          {value: 100, currency: 'JPY'},
          {value: 2, currency: 'USD'},
          {value: 3, currency: 'USD'},
        ),
      ).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: true,
      });

      expect(
        await service.combine(
          {value: 100, currency: 'JPY'},
          {value: 2, currency: 'USD'},
          {value: 300, currency: 'JPY'},
        ),
      ).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: true,
      });
    });
  });
});
