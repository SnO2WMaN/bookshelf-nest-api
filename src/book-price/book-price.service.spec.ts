import {Test, TestingModule} from '@nestjs/testing';

import {BookPriceService} from './book-price.service';

describe('BookPriceService', () => {
  let service: BookPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookPriceService],
    }).compile();

    service = module.get<BookPriceService>(BookPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('japaneseComsumptionTax()', () => {
    it('消費税(10%)を計算する', () => {
      expect(
        service.japaneseComsumptionTax({value: 400, currency: 'JPY'}),
      ).toStrictEqual({value: 40, currency: 'JPY'});
    });
    it('端数を切り捨てて消費税(10%)を計算する', () => {
      expect(
        service.japaneseComsumptionTax({value: 454, currency: 'JPY'}),
      ).toStrictEqual({value: 45, currency: 'JPY'});
    });
  });
});
