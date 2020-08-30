import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

import {BooksModule} from './books/books.module';
import {ExchangeApiModule} from './exchange-rates-api/exchange-rates-api.module';
import {PriceService} from './price/price.service';
import {PriceModule} from './price/price.module';
import {BookPriceModule} from './book-price/book-price.module';
import {OpenBDModule} from './openbd/openbd.module';
import {VersionModule} from './version/version.module';

@Module({
  imports: [
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
