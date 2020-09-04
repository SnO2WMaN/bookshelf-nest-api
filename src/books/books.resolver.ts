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
import {URLResolver as URL, DateResolver as DateScalar} from 'graphql-scalars';
import {ValidationPipe, UsePipes} from '@nestjs/common';

import {OpenBDService} from '../openbd/openbd.service';
import {BookPrice} from '../book-price/schema/book-price.schema';
import {JanService} from '../jan/jan.service';

import {RegisterBookArgs} from './dto/register-book.argstype';
import {BooksService} from './books.service';
import {Book} from './schema/book.schema';
import {ManyBooksArgs} from './dto/many-books.argstype';

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

  @Query((type) => [Book])
  @UsePipes(new ValidationPipe())
  async manyBooks(@Args() args: ManyBooksArgs) {
    return this.booksService.find(args);
  }

  @Mutation((type) => Book)
  @UsePipes(new ValidationPipe())
  async registerBook(@Args() {...other}: RegisterBookArgs) {
    const book = await this.booksService.createBook({...other});
    return book;
  }
}
