import {Test, TestingModule} from '@nestjs/testing';

import {OpenBDService} from '../openbd/openbd.service';
import {OpenBDServiceMock} from '../openbd/openbd.service.mock';
import {JanService} from '../jan/jan.service';

import {BooksResolver} from './books.resolver';
import {BooksService} from './books.service';
import {BooksServiceMock} from './books.service.mock';

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

  describe('manyBooks', () => {});

  describe('cover', () => {
    it.todo('ISBNがある');
    it.todo('ISBNがない場合はnullを返す');
    it.todo('設定されている場合はそれ自体を返す');
  });
});
