import {UsePipes, ValidationPipe} from '@nestjs/common';
import {
  Args,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {isISBN, IsUrl} from 'class-validator';
import {
  DateResolver as DateScalar,
  ISBNResolver as ISBN,
  URLResolver as URL,
} from 'graphql-scalars';

import {BookPrice} from '../book-price/schema/book-price.schema';
import {Paginated} from '../common/paginated.schema';
import {JanService, PublicationJANCode} from '../jan/jan.service';
import {OpenBDService} from '../openbd/openbd.service';

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

  @ResolveField((type) => ISBN, {nullable: true})
  async isbn(@Parent() {isbn}: Book): Promise<string | null> {
    if (!isbn || !isISBN(isbn)) return null;
    return isbn;
  }

  @ResolveField((type) => String, {nullable: true})
  async jan(@Parent() {jan}: Book): Promise<PublicationJANCode | null> {
    if (!jan || !this.JANService.check(jan)) return null;
    return jan;
  }

  @ResolveField((type) => URL, {nullable: true})
  @IsUrl()
  async cover(@Parent() {isbn, cover}: Book): Promise<string | null> {
    if (cover) return cover;
    if (isbn) return this.bookbdService.cover(isbn).catch(() => null);
    return null;
  }

  @ResolveField((type) => BookPrice, {nullable: true})
  async price(@Parent() book: Book): Promise<BookPrice | null> {
    const jan = await this.jan(book);
    if (jan) {
      const base = this.JANService.price(jan);
      if (base) return {base, tax: 'JPN'};
    }
    return null;
  }

  @ResolveField((type) => DateScalar, {nullable: true})
  async publishedAt(@Parent() {publishedAt}: Book): Promise<Date | null> {
    const date = publishedAt ? new Date(publishedAt) : null;
    return date instanceof Date && !isNaN(date.getTime()) ? date : null;
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
