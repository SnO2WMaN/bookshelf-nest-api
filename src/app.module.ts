import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

import {BooksModule} from './books/books.module';
import {ExchangeApiModule} from './exchange-api/exchange-api.module';
import {PriceService} from './price/price.service';
import {PriceModule} from './price/price.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: `${process.cwd()}/src/schema.graphql`,
    }),
    BooksModule,
    ExchangeApiModule,
    PriceModule,
  ],
})
export class AppModule {}
