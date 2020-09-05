import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

import {JanModule} from '../jan/jan.module';
import {OpenBDModule} from '../openbd/openbd.module';

import {BooksResolver} from './books.resolver';
import {BooksService} from './books.service';
import {Book, BookSchema} from './schema/book.schema';

@Module({
  imports: [
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
    OpenBDModule,
    JanModule,
  ],
  exports: [BooksService],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
