import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {OpenBDModule} from '../openbd/openbd.module';
import {VersionModule} from '../version/version.module';

import {BooksService} from './books.service';
import {BooksResolver} from './books.resolver';
import {Book, BookSchema} from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Book.name, schema: BookSchema}]),
    OpenBDModule,
    VersionModule,
  ],
  exports: [BooksService],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
