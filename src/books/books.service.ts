import {Injectable} from '@nestjs/common';

import {Book} from './schema/book.schema';

const sample: Book[] = [
  {
    id: '1',
    title: '東方酔蝶華 ～ロータスイーター達の酔醒(1)',
    volume: 1,
    pages: 192,
    versions: [
      {
        version: 1,
        isbn: '9784041098967',
        publishedAt: '2020/08/26',
      },
    ],
    authors: [
      {name: 'ZUN', roles: ['原作']},
      {name: '水炊き', roles: ['漫画']},
    ],
    price: {
      base: {value: 924, currency: 'JPY'},
      tax: 'JPN',
    },
    categories: ['コミック'],
    keywords: ['東方Project', '東方酔蝶華'],
    publishers: {
      issuers: [{name: '青柳昌行'}],
      company: [{name: '株式会社KADOKAWA'}],
    },
    printers: [
      {
        company: {name: '図書印刷株式会社'},
        roles: ['印刷', '製本'],
      },
    ],
  },
];

@Injectable()
export class BooksService {
  books: Book[] = sample;

  async find(): Promise<Book[]> {
    return this.books;
  }
}
