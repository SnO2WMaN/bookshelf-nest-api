import {Book} from '../schema/book.schema';

export const multipleVersions: Book = {
  id: '2',
  title: '心理学',
  versions: [
    {
      version: 1,
      publishedAt: '1996/9/20',
    },
    {
      version: 2,
      publishedAt: '2004/2/29',
    },
    {
      version: 3,
      publishedAt: '2008/9/26',
    },
    {
      version: 4,
      publishedAt: '2011/10/31',
    },
    {
      version: 5,
      publishedAt: '2015/7/21',
    },
    {
      version: 5,
      isbn: '9784130121170',
      publishedAt: '2020/3/10',
      meta: '補訂版',
    },
  ],
  authors: [
    {name: '香取廣人', roles: ['編者']},
    {name: '杉本敏夫', roles: ['編者']},
    {name: '鳥居修晃', roles: ['編者']},
    {name: '河内十郎', roles: ['編者']},
  ],
  price: {
    base: {value: 2400, currency: 'JPY'},
    tax: 'JPN',
  },
  categories: ['学術書'],
  keywords: ['心理学'],
  publishers: {
    issuers: [{name: '吉見俊哉'}],
    company: [{name: '東京大学出版会'}],
  },
  printers: [
    {
      company: {name: '理想社'},
      roles: ['印刷'],
    },
    {
      company: {name: '牧製本印刷株式会社'},
      roles: ['製本'],
    },
  ],
};

export const books: Book[] = [
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
      base: {value: 840, currency: 'JPY'},
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
  multipleVersions,
];
