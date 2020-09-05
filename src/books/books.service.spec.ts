import {getModelToken, MongooseModule} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';
import * as faker from 'faker';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {Model} from 'mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

import {BooksService} from './books.service';
import {Book, BookSchema} from './schema/book.schema';

describe('BooksService', () => {
  let mongoServer: MongoMemoryServer;

  let service: BooksService;
  let model: Model<Book>;

  beforeAll(() => {
    mongoServer = new MongoMemoryServer();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongoServer.getUri(),
          }),
        }),
        MongooseModule.forFeatureAsync([
          {
            name: Book.name,
            useFactory() {
              const schema = BookSchema;
              schema.plugin(MongoosePaginate);
              return schema;
            },
          },
        ]),
      ],
      providers: [BooksService],
    }).compile();
    service = module.get<BooksService>(BooksService);

    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find()', () => {
    it('十分にデータがある場合に指定した個数が返ってくる', async () => {
      await model.insertMany(
        [...new Array(100)].map(() => ({
          title: faker.name.title(),
          authors: [],
        })),
      );
      const booksPage1 = await service.find({limit: 32, page: 1});
      expect(booksPage1).toStrictEqual(
        expect.objectContaining({
          docs: expect.any(Array),
          page: expect.any(Number),
          totalDocs: expect.any(Number),
          totalPages: expect.any(Number),
          prevPage: null,
          nextPage: 2,
          hasPrevPage: expect.any(Boolean),
          hasNextPage: expect.any(Boolean),
        }),
      );
      expect(booksPage1.docs).toHaveLength(32);

      const booksPage2 = await service.find({limit: 32, page: 2});
      expect(booksPage2).toStrictEqual(
        expect.objectContaining({
          docs: expect.any(Array),
          page: expect.any(Number),
          totalDocs: expect.any(Number),
          totalPages: expect.any(Number),
          prevPage: 1,
          nextPage: 3,
          hasPrevPage: expect.any(Boolean),
          hasNextPage: expect.any(Boolean),
        }),
      );
      expect(booksPage2.docs).toHaveLength(32);

      const booksPage3 = await service.find({limit: 32, page: 3});
      expect(booksPage3).toStrictEqual(
        expect.objectContaining({
          docs: expect.any(Array),
          page: expect.any(Number),
          totalDocs: expect.any(Number),
          totalPages: expect.any(Number),
          prevPage: 2,
          nextPage: 4,
          hasPrevPage: expect.any(Boolean),
          hasNextPage: expect.any(Boolean),
        }),
      );
      expect(booksPage3.docs).toHaveLength(32);

      const booksPage4 = await service.find({limit: 32, page: 4});
      expect(booksPage4).toStrictEqual(
        expect.objectContaining({
          docs: expect.any(Array),
          page: expect.any(Number),
          totalDocs: expect.any(Number),
          totalPages: expect.any(Number),
          prevPage: 3,
          nextPage: null,
          hasPrevPage: expect.any(Boolean),
          hasNextPage: expect.any(Boolean),
        }),
      );
      expect(booksPage4.docs).toHaveLength(4);
    });
  });

  describe('createBook()', () => {
    it('titleのみを指定して正常に生成', async () => {
      const user = await service.createBook({title: 'タイトル'});
      expect(user).toStrictEqual(
        expect.objectContaining({
          title: expect.any(String),
        }),
      );
    });
  });
});
