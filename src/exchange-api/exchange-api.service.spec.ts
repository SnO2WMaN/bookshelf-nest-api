import {HttpModule, HttpService} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {of} from 'rxjs';

import {
  ExchangeApiService,
  UnsupportedCurrencyError,
} from './exchange-api.service';

describe('ExchangeApiService', () => {
  let module: TestingModule;
  let exchangeService: ExchangeApiService;
  let httpService: HttpService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExchangeApiService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
  });

  beforeEach(async () => {
    exchangeService = module.get<ExchangeApiService>(ExchangeApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(exchangeService).toBeDefined();
  });

  describe('Check supported currency to exchange', () => {
    it('USDはサポートしている', () => {
      expect(exchangeService.isSupportedCurrency('USD')).toBe(true);
    });
    it('JPYはサポートしている', () => {
      expect(exchangeService.isSupportedCurrency('JPY')).toBe(true);
    });
    it('ZWLはサポートしていない', () => {
      expect(exchangeService.isSupportedCurrency('ZWL')).toBe(false);
    });
  });

  describe('Exchange', () => {
    it('同じ通貨同士ならそのままの値を返す', async () => {
      const exchanged = await exchangeService.exchange(100, 'JPY', 'JPY');
      expect(exchanged).toStrictEqual({
        value: 100,
        currency: 'JPY',
      });
    });
    it('変換前の通貨が対応していない場合は例外を返す', async () => {
      const exchanged = exchangeService.exchange(100, 'ZWL', 'JPY');
      await expect(exchanged).rejects.toThrow(UnsupportedCurrencyError);
    });
    it('変換後の通貨が対応していない場合は例外を返す', async () => {
      const exchanged = exchangeService.exchange(100, 'JPY', 'ZWL');
      await expect(exchanged).rejects.toThrow(UnsupportedCurrencyError);
    });
    it('JPYからUSDへ', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
        of({
          data: {
            base: 'JPY',
            rates: {USD: 0.01},
          },
        } as any),
      );
      const exchanged = await exchangeService.exchange(100, 'JPY', 'USD');
      await expect(exchanged).toStrictEqual({
        value: 1,
        currency: 'USD',
        approximately: true,
      });
    });

    it('USDからJPYへ', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
        of({
          data: {
            base: 'USD',
            rates: {JPY: 100},
          },
        } as any),
      );
      const exchanged = await exchangeService.exchange(1, 'USD', 'JPY');
      expect(exchanged).toStrictEqual({
        value: 100,
        currency: 'JPY',
        approximately: true,
      });
    });
  });
});
