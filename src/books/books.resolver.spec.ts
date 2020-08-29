import {Injectable} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

import {VersionModule} from '../version/version.module';
import {OpenBDModule} from '../openbd/openbd.module';
import {OpenBDService} from '../openbd/openbd.service';
import {OpenBDServiceMock} from '../openbd/openbd.service.mock';

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
      imports: [VersionModule],
      providers: [
        {provide: BooksService, useClass: BooksServiceMock},
        {provide: OpenBDService, useClass: OpenBDServiceMock},
        BooksResolver,
      ],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('manyBooks', () => {});
  describe('cover', () => {
    it('ISBNがある', async () => {
      const cover = await resolver.cover({
        id: '1',
        title: '東方酔蝶華 ～ロータスイーター達の酔醒(1)',
        versions: [
          {
            version: 1,
            isbn: '9784041098967',
          },
        ],
      });
      expect(cover).toBe('https://cover.openbd.jp/9784041098967.jpg');
    });
    it('ISBNがない場合はnullを返す', async () => {
      const cover = await resolver.cover({
        id: '1',
        title: '東方酔蝶華 ～ロータスイーター達の酔醒(1)',
        versions: [
          {
            version: 1,
          },
        ],
      });
      expect(cover).toBeNull();
    });
    it('元々ある場合は元々のURLを返す', async () => {
      const cover = await resolver.cover({
        id: '1',
        title: 'ハンバーガーちゃんだいすきクラブ',
        cover:
          'https://melonbooks.akamaized.net/user_data/packages/resize_image.php?image=212001256126.jpg',
        versions: [
          {
            version: 1,
          },
        ],
      });
      expect(cover).toBe(
        'https://melonbooks.akamaized.net/user_data/packages/resize_image.php?image=212001256126.jpg',
      );
    });
  });
});
