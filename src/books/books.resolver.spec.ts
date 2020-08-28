import {Injectable} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

import {VersionModule} from '../version/version.module';
import {OpenBDModule} from '../openbd/openbd.module';

import {BooksResolver} from './books.resolver';
import {BooksService} from './books.service';
import {books} from './sample/books.sample';
import {Book} from './schema/book.schema';

@Injectable()
class BooksServiceMock {
  books: Book[] = books;

  async find(): Promise<Book[]> {
    return this.books;
  }
}

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VersionModule, OpenBDModule],
      providers: [
        {provide: BooksService, useClass: BooksServiceMock},
        BooksResolver,
      ],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('manyBooks', () => {
    it('本の個数', async () => {
      const books = await resolver.manyBooks();
      expect(books).toHaveLength(2);
    });
  });
});
