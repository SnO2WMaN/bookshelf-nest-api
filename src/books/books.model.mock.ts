import {Injectable} from '@nestjs/common';

import samples from './sample/books.sample';

@Injectable()
export class BookModelMock {
  private samples = samples;

  async find() {
    return this.samples;
  }

  async findById(id: string) {
    return this.samples.find((sample) => sample.id === id);
  }
}
