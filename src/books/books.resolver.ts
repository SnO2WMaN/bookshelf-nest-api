import {UsePipes, ValidationPipe} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ObjectType,
} from '@nestjs/graphql';
import {IsUrl} from 'class-validator';
import {DateResolver as DateScalar, URLResolver as URL} from 'graphql-scalars';

import {BookPrice} from '../book-price/schema/book-price.schema';
import {JanService} from '../jan/jan.service';
import {OpenBDService} from '../openbd/openbd.service';
import {Paginated} from '../common/paginated.schema';

import {BooksService} from './books.service';
import {ManyBooksArgs} from './dto/many-books.argstype';
import {RegisterBookArgs} from './dto/register-book.argstype';
import {Book} from './schema/book.schema';

@ObjectType()
export class BookPagination extends Paginated(Book) {}

@Resolver((of) => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookbdService: OpenBDService,
    private readonly JANService: JanService,
  ) {}

  @ResolveField((type) => URL, {nullable: true})
  @IsUrl()
  async cover(@Parent() {isbn}: Book): Promise<string | null> {
    return isbn ? this.bookbdService.cover(isbn) : null;
  }

  @ResolveField((type) => BookPrice, {nullable: true})
  async price(@Parent() {jan}: Book): Promise<BookPrice | null> {
    if (jan) {
      const base = this.JANService.price(jan);
      return base && {base, tax: 'JPN'};
    }
    return null;
  }

  @ResolveField((type) => DateScalar, {nullable: true})
  async publishedAt(@Parent() {publishedAt}: Book): Promise<Date | null> {
    return publishedAt ? new Date(publishedAt) : null;
  }

  @Query((type) => Book)
  @UsePipes(new ValidationPipe())
  async book(@Args('id') id: string) {
    return this.booksService.findById(id);
  }

  @Query((type) => BookPagination)
  @UsePipes(new ValidationPipe())
  async manyBooks(@Args() args: ManyBooksArgs): Promise<BookPagination> {
    const {
      nextPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
      page,
      totalPages,
      ...result
    } = await this.booksService.find(args);
    return {
      ...result,
      pageInfo: {
        page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
      },
    };
  }

  @Mutation((type) => Book)
  @UsePipes(new ValidationPipe())
  async registerBook(@Args() {...other}: RegisterBookArgs) {
    const book = await this.booksService.createBook({...other});
    return book;
  }
}
