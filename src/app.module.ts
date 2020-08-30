/* eslint-disable no-process-env */
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';
import {format as formatMongoURI} from 'mongodb-uri';
import {ConfigModule} from '@nestjs/config';

import {BookPriceModule} from './book-price/book-price.module';
import {BooksModule} from './books/books.module';
import {ExchangeApiModule} from './exchange-rates-api/exchange-rates-api.module';
import {OpenBDModule} from './openbd/openbd.module';
import {PriceModule} from './price/price.module';
import {VersionModule} from './version/version.module';
import mongooseConfig from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({load: [mongooseConfig]}),
    MongooseModule.forRoot(
      formatMongoURI({
        scheme: 'mongodb',
        hosts: [
          {
            host: process.env.MONGO_HOST,
            port: process.env.MONGO_PORT,
          },
        ],
        database: process.env.MONGO_DATABASE,
        options: {
          authSource: 'admin',
        },
        username: process.env.MONGO_ROOT_USERNAME,
        password: process.env.MONGO_ROOT_PASSWORD,
      }),
      {
        useNewUrlParser: true,
      },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: `${process.cwd()}/src/schema.graphql`,
    }),
    BooksModule,
    ExchangeApiModule,
    PriceModule,
    BookPriceModule,
    OpenBDModule,
    VersionModule,
  ],
})
export class AppModule {}
