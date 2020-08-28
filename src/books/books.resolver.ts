import {Resolver, Query, ResolveField, Parent} from '@nestjs/graphql';

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

  @ResolveField((type) => String, {nullable: true})
  async cover(@Parent() parent: Book): Promise<string> {
    const {isbn} = this.versions(parent).find(({isbn}) => Boolean(isbn));
    if (isbn) return this.bookbdService.cover(isbn);
    return null;
  }

  @Query((type) => [Book])
  async manyBooks(): Promise<Book[]> {
    return this.booksService.find();
  }
}
