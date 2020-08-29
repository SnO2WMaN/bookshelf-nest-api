import {Injectable, HttpService} from '@nestjs/common';
import {isISBN} from 'class-validator';
import {dehyphenate} from 'beautify-isbn';

import {InvalidISBNError} from './openbd.service';

@Injectable()
export class OpenBDServiceMock {
  async cover(isbn: string): Promise<string | null> {
    if (!isISBN(isbn)) throw new InvalidISBNError(isbn);
    return `https://cover.openbd.jp/${dehyphenate(isbn)}.jpg`;
  }
}
