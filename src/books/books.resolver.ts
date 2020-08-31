import {Resolver, Query, ResolveField, Parent} from '@nestjs/graphql';
import {IsUrl} from 'class-validator';
import {URLResolver as URL} from 'graphql-scalars';

import {Version} from '../version/schema/version.schema';
import {VersionService} from '../version/version.service';
import {OpenBDService} from '../openbd/openbd.service';

import {Book} from './schema/book.schema';
import {BooksService} from './books.service';

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

  @Query((type) => [Book])
  async manyBooks(): Promise<Book[]> {
    return this.booksService.find();
  }
}
