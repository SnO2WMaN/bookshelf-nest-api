import {Injectable, HttpService} from '@nestjs/common';
import {isISBN} from 'class-validator';

export class InvalidISBNError extends Error {
  constructor(invalidISBN: string) {
    super(`Invalid ISBN : ${invalidISBN}`);
  }
}

@Injectable()
export class OpenBDService {
  constructor(private readonly httpService: HttpService) {}

  async cover(isbn: string): Promise<string | null> {
    if (!isISBN(isbn)) throw new InvalidISBNError(isbn);

    const {data} = await this.httpService
      .get('https://api.openbd.jp/v1/get', {
        params: {isbn},
      })
      .toPromise();
    const cover = data?.[0]?.summary?.cover;
    return cover && cover !== '' ? cover : null;
  }
}
