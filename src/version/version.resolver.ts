import {Resolver, ResolveField, Parent} from '@nestjs/graphql';
import {IsISBN} from 'class-validator';
import {hyphenate} from 'beautify-isbn';

import {Version} from './schema/version.schema';
import {VersionService} from './version.service';

@Resolver((of) => Version)
export class VersionResolver {
  @ResolveField((type) => Date, {nullable: true})
  publishedAt(@Parent() {publishedAt}: Version): Date | null {
    if (publishedAt) return new Date(publishedAt);
    return null;
  }

  @ResolveField((type) => String, {nullable: true})
  @IsISBN()
  isbn(@Parent() {isbn}: Version): string | null {
    if (isbn) return hyphenate(isbn);
    return null;
  }
}
