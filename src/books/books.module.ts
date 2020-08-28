import {Module} from '@nestjs/common';

import {OpenBDModule} from '../openbd/openbd.module';
import {VersionModule} from '../version/version.module';

import {BooksService} from './books.service';
import {BooksResolver} from './books.resolver';

@Module({
  imports: [OpenBDModule, VersionModule],
  exports: [BooksService],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
