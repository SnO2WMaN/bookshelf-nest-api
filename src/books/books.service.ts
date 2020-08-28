import {Injectable} from '@nestjs/common';

import {Book} from './schema/book.schema';
import {books} from './sample/books.sample';

const sample: Book[] = books;

@Injectable()
export class BooksService {
  books: Book[] = sample;

  async find(): Promise<Book[]> {
    return this.books;
  }
}
