import {Test, TestingModule} from '@nestjs/testing';

import {ExchangeApiService} from '../exchange-api/exchange-api.service.mock';

import {PriceService} from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeApiService, PriceService],
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
    it('両替を考えずに2つの金額を足し合わせる', async () => {
      const combined = await service.combine(
        {value: 100, currency: 'JPY'},
        {value: 200, currency: 'JPY'},
      );
      expect(combined).toStrictEqual({
        value: 300,
        currency: 'JPY',
        approximately: false,
      });
    });
    it('両替を考えずに3つの金額を足し合わせる', async () => {
      const combined = await service.combine(
        {value: 100, currency: 'JPY'},
        {value: 200, currency: 'JPY'},
        {value: 300, currency: 'JPY'},
      );
      expect(combined).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: false,
      });
    });
    it('両替を考えて2つの金額を足し合わせる', async () => {
      const combined = await service.combine(
        {value: 100, currency: 'JPY'},
        {value: 2, currency: 'USD'},
      );
      expect(combined).toStrictEqual({
        value: 300,
        currency: 'JPY',
        approximately: true,
      });
    });
    it('両替を考えて3つの金額を足し合わせる', async () => {
      const combined = await service.combine(
        {value: 100, currency: 'JPY'},
        {value: 2, currency: 'USD'},
        {value: 3, currency: 'USD'},
      );
      expect(combined).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: true,
      });
    });
    it('両替を考えて3つの金額を足し合わせる(2)', async () => {
      const combined = await service.combine(
        {value: 100, currency: 'JPY'},
        {value: 2, currency: 'USD'},
        {value: 300, currency: 'JPY'},
      );
      expect(combined).toStrictEqual({
        value: 600,
        currency: 'JPY',
        approximately: true,
      });
    });
  });
});
