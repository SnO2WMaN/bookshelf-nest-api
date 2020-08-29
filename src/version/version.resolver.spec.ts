import {Test, TestingModule} from '@nestjs/testing';

import {VersionResolver} from './version.resolver';

describe('VersionResolver', () => {
  let resolver: VersionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionResolver],
    }).compile();

    resolver = module.get<VersionResolver>(VersionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('publishedAt', () => {
    it('日付がある', () => {
      expect(
        resolver.publishedAt({version: 1, publishedAt: '2020/08/29'}),
      ).toStrictEqual(new Date('2020/08/29'));
    });
    it('日付がない場合はnullを返す', () => {
      expect(resolver.publishedAt({version: 1})).toBeNull();
    });
  });

  describe('isbn', () => {
    it('ISBNがあり,ハイフン分割されている', () => {
      expect(resolver.isbn({version: 1, isbn: '978-4-04-109896-7'})).toBe(
        '978-4-04-109896-7',
      );
    });
    it('ISBNがあり,ハイフン分割されていない', () => {
      expect(resolver.isbn({version: 1, isbn: '9784041098967'})).toBe(
        '978-4-04-109896-7',
      );
    });
    it('ISBNがない場合はnullを返す', () => {
      expect(resolver.isbn({version: 1})).toBeNull();
    });
  });
});
