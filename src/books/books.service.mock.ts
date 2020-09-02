import {Injectable} from '@nestjs/common';

import samples from './sample/books.sample';
import {Book} from './schema/book.schema';

@Injectable()
export class BooksServiceMock {
  private books = samples;

  async find() {
    return this.books;
  }
}
