import {Test, TestingModule} from '@nestjs/testing';

import {BooksResolver} from './books.resolver';
import {BooksService} from './books.service';
import {BooksModule} from './books.module';

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
      providers: [BooksResolver],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
