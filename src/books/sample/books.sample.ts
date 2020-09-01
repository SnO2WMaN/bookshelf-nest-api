import {Book} from '../schema/book.schema';

export const multipleVersions = {
  id: '100',
  title: '心理学',
  versions: [
    {
      version: 1,
      publishedAt: '1996-09-20',
    },
    {
      version: 2,
      publishedAt: '2004-02-29',
    },
    {
      version: 3,
      publishedAt: '2008-09-26',
    },
    {
      version: 4,
      publishedAt: '2011-10-31',
    },
    {
      version: 5,
      publishedAt: '2015-07-21',
    },
    {
      version: 5,
      isbn: '9784130121170',
      publishedAt: '2020-03-10',
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

export const books = [
  {
    id: '1',
    title: '東方酔蝶華 ～ ロータスイーター達の酔醒(1)',
    volume: 1,
    pages: 192,
    versions: [
      {
        version: 1,
        isbn: '9784041098967',
        publishedAt: '2020-08-26',
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
  {
    id: '2',
    title: '東方智霊奇伝 反則探偵さとり(1)',
    volume: 1,
    pages: 164,
    versions: [
      {
        version: 1,
        isbn: '9784049133486',
        publishedAt: '2020-08-26',
      },
    ],
    authors: [
      {name: 'ZUN', roles: ['原作']},
      {name: '銀木犀', roles: ['漫画']},
    ],
    price: {
      base: {value: 820, currency: 'JPY'},
      tax: 'JPN',
    },
    categories: ['コミック'],
    keywords: ['東方Project', '東方智霊奇伝'],
    publishers: {
      issuers: [{name: '青柳昌行'}],
      company: [{name: '株式会社KADOKAWA'}],
    },
    printers: [
      {
        company: {name: '共同印刷株式会社'},
        roles: ['印刷', '製本'],
      },
    ],
  },
  {
    id: '4',
    title: 'ハンバーガーちゃんだいすきクラブ',
    cover:
      'https://melonbooks.akamaized.net/user_data/packages/resize_image.php?image=212001256126.jpg',
    publishers: {
      issuers: [
        {
          name: 'あつみづむ',
        },
      ],
    },
    versions: [
      {
        version: 1,
        publishedAt: '2020-05-01',
      },
    ],
  },
  {
    id: '5',
    title: 'The Art of Hyper Light Drifter',
    categories: ['アートブック'],
    keywords: ['ドット絵', 'ピクセルアート', 'Hyper Light Drifter'],
    versions: [{version: 1}],
    price: {
      base: {
        value: 42,
        currency: 'USD',
      },
    },
  },
  {
    id: '6',
    title: 'ピクセル百景',
    categories: ['アートブック'],
    keywords: ['ドット絵', 'ピクセルアート'],

    price: {
      base: {
        value: 2700,
        currency: 'JPY',
      },
      tax: 'JPN',
    },
  },
  {
    id: '7',
    title: 'visual experiments lain/ビジュアルエクスペリメンツ レイン',
    categories: ['アートブック', 'ムック本'],
    keywords: ['serial experiments lain'],
    versions: [
      {
        publishedAt: '2013/06/30',
        isbn: '978-4835449500',
        version: 1,
      },
    ],
    price: {
      base: {
        value: 2400,
        currency: 'JPY',
      },
      tax: 'JPN',
    },
  },
  {
    id: '8',
    title: 'Docker/Kubernetes 実践コンテナ入門',
    authors: [
      {
        name: '山田明憲',
      },
    ],
    price: {
      base: {
        value: 3380,
        currency: 'JPY',
      },
      tax: 'JPN',
    },
    categories: ['技術書'],
    keywords: ['Docker', 'Kubernetes'],
    versions: [
      {
        version: 1,
        isbn: '9784297100339',
      },
    ],
  },
  {
    id: '9',
    title: '僕たちのインターネット史',
    authors: [
      {
        name: 'ばるぼら',
      },
      {
        name: 'さわやか',
      },
    ],
    price: {
      base: {
        value: 1600,
        currency: 'JPY',
      },
      tax: 'JPN',
    },
    versions: [
      {
        version: 1,
        isbn: '9784750515113',
      },
    ],
    categories: ['評論'],
    keywords: ['インターネット'],
  },
  {
    id: '10',
    title:
      'GRAVITY DAZE シリーズ公式アートブック/ドゥヤ レヤヴィ サーエジュ（喜んだり、悩んだり）',
    authors: [
      {
        name: '電撃攻略本編集部',
        roles: ['編集'],
      },
    ],
    price: {
      base: {
        value: 3700,
        currency: 'JPY',
      },
      tax: 'JPN',
    },
    versions: [
      {
        version: 1,
        isbn: '9784048925235',
      },
    ],
    categories: ['アートブック'],
    keywords: ['GRAVITY DAZE'],
  },
  multipleVersions,
];
