import {Test, TestingModule} from '@nestjs/testing';

import {PriceModule} from '../price/price.module';

import {BookPriceResolver} from './book-price.resolver';

describe('BookPriceResolver', () => {
  let resolver: BookPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PriceModule],
      providers: [BookPriceResolver],
    }).compile();

    resolver = module.get<BookPriceResolver>(BookPriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
