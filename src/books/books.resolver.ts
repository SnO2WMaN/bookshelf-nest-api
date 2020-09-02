import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ArgsType,
} from '@nestjs/graphql';
import {IsUrl} from 'class-validator';
import {URLResolver as URL} from 'graphql-scalars';

import {OpenBDService} from '../openbd/openbd.service';
import {Version} from '../version/schema/version.schema';
import {VersionService} from '../version/version.service';

import {RegisterBookArgs} from './argstype/register-book.argstype';
import {BooksService} from './books.service';
import {Book} from './schema/book.schema';
import {ManyBooksArgs} from './argstype/many-books.argstype';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookbdService: OpenBDService,
  ) {}

  @ResolveField((type) => URL, {nullable: true})
  @IsUrl()
  async cover(@Parent() {isbn}: Book) {
    return isbn && this.bookbdService.cover(isbn);
  }

  @Query((type) => Book)
  async book(@Args('id') id: string) {
    return this.booksService.findById(id);
  }

  @Query((type) => [Book])
  async manyBooks(@Args() args: ManyBooksArgs) {
    return this.booksService.find(args);
  }

  @Mutation((type) => Book)
  async registerBook(@Args() {...other}: RegisterBookArgs) {
    const book = await this.booksService.createBook({...other});
    return book;
  }
}
