import {Test, TestingModule} from '@nestjs/testing';

import {OpenBDService} from '../openbd/openbd.service';
import {OpenBDServiceMock} from '../openbd/openbd.service.mock';
import {JanService} from '../jan/jan.service';

import {BooksResolver} from './books.resolver';
import {BooksService} from './books.service';
import {BooksServiceMock} from './books.service.mock';
import {Book} from './schema/book.schema';

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JanService,
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

  describe('isbn()', () => {
    it('正しい値', async () => {
      const book = {isbn: '9784758013178'} as Book;
      const isbn = await resolver.isbn(book);
      expect(isbn).toBe(`9784758013178`);
    });
    it('チェックディジットが間違っている不正な値', async () => {
      const book = {isbn: '9784758013179'} as Book;
      const isbn = await resolver.isbn(book);
      expect(isbn).toBeNull();
    });
    it('無い場合はnullを返す', async () => {
      const book = {} as Book;
      const isbn = await resolver.isbn(book);
      expect(isbn).toBeNull();
    });
  });

  describe('jan()', () => {
    it('正しい値', async () => {
      const book = {jan: '1929979004408'} as Book;
      const isbn = await resolver.jan(book);
      expect(isbn).toBe(`1929979004408`);
    });
    it('チェックディジットが間違っている不正な値', async () => {
      const book = {jan: '1929979004409'} as Book;
      const jan = await resolver.jan(book);
      expect(jan).toBeNull();
    });
    it('無い場合はnullを返す', async () => {
      const book = {} as Book;
      const jan = await resolver.jan(book);
      expect(jan).toBeNull();
    });
  });

  describe('cover()', () => {
    it('ISBNがある', async () => {
      const book = {isbn: '9784758013178'} as Book;
      const cover = await resolver.cover(book);
      expect(cover).toBe(`https://cover.openbd.jp/9784758013178.jpg`);
    });
    it('ISBNがない場合はnullを返す', async () => {
      const book = {} as Book;
      const cover = await resolver.cover(book);
      expect(cover).toBeNull();
    });
    it('不正なISBNの場合はnullを返す', async () => {
      const book = {isbn: '9784758013179'} as Book;
      const cover = await resolver.cover(book);
      expect(cover).toBeNull();
    });
    it('設定されている場合はそれ自体を返す', async () => {
      const book = {
        isbn: '9784758013178',
        cover: 'https://picsum.photos/360/480',
      } as Book;
      const cover = await resolver.cover(book);
      expect(cover).toBe('https://picsum.photos/360/480');
    });
  });

  describe('publishedAt()', () => {
    it('正しい値', async () => {
      const book = {publishedAt: '2020-09-01'} as Book;
      const publishedAt = await resolver.publishedAt(book);
      expect(publishedAt).toStrictEqual(new Date('2020-09-01'));
    });
    it('不正な値の場合はnullを返す', async () => {
      const book = {publishedAt: '2020-13-01'} as Book;
      const publishedAt = await resolver.publishedAt(book);
      expect(publishedAt).toBeNull();
    });
    it('存在しない場合はnullを返す', async () => {
      const book = {} as Book;
      const publishedAt = await resolver.publishedAt(book);
      expect(publishedAt).toBeNull();
    });
  });

  describe('price()', () => {
    describe('書籍JANコード', () => {
      it('正しい値', async () => {
        const book = {jan: '1929979004408'} as Book;
        const price = await resolver.price(book);
        expect(price).toStrictEqual({
          base: {value: 440, currency: 'JPY'},
          tax: 'JPN',
        });
      });
      it('不正な値の場合はnullを返す', async () => {
        const book = {jan: '1929979004409'} as Book;
        const price = await resolver.price(book);
        expect(price).toBeNull();
      });
      it('00000の場合はnullを返す', async () => {
        const book = {jan: '1929979000004'} as Book;
        const price = await resolver.price(book);
        expect(price).toBeNull();
      });
    });
  });
});
