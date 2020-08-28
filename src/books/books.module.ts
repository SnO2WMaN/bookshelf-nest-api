import {Module} from '@nestjs/common';

import {BooksService} from './books.service';
import {BooksResolver} from './books.resolver';

@Module({
  exports: [BooksService],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
