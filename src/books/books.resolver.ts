import {Resolver, Query} from '@nestjs/graphql';

import {Book} from './schema/book.schema';
import {BooksService} from './books.service';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query((type) => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.find();
  }
}
