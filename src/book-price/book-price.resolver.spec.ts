import {Test, TestingModule} from '@nestjs/testing';

import {ExchangeApiService} from '../exchange-rates-api/exchange-rates-api.service';
import {ExchangeApiServiceMock} from '../exchange-rates-api/exchange-rates-api.service.mock';
import {PriceService} from '../price/price.service';

import {BookPriceResolver} from './book-price.resolver';
import {BookPriceService} from './book-price.service';

describe('BookPriceResolver', () => {
  let resolver: BookPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceService,
        {provide: ExchangeApiService, useClass: ExchangeApiServiceMock},
        BookPriceService,
        BookPriceResolver,
      ],
    }).compile();

    resolver = module.get<BookPriceResolver>(BookPriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
