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
    private readonly versionService: VersionService,
    private readonly bookbdService: OpenBDService,
  ) {}

  @ResolveField((type) => [Version], {nullable: true})
  versions(@Parent() {versions}: Book): Version[] {
    return versions && this.versionService.sortVersions(versions);
  }

  @ResolveField((type) => Version, {nullable: true})
  latestVersion(@Parent() {versions}: Book): Version {
    if (!versions) return null;
    return this.versionService.sortVersions(versions)[0];
  }

  @ResolveField((type) => URL, {nullable: true})
  @IsUrl()
  async cover(@Parent() parent: Book): Promise<string | null> {
    if (parent?.cover) return parent.cover;
    const versions = this.versions(parent);
    if (!versions) return null;
    const hasISBNversons = versions.filter(({isbn}) => Boolean(isbn));
    if (hasISBNversons.length === 0) return null;
    const {isbn} = hasISBNversons[0];
    return this.bookbdService.cover(isbn);
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
