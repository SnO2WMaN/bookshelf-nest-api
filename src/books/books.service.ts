import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {books} from './sample/books.sample';
import {Book} from './schema/book.schema';
import {RegisterBookArgs} from './argstype/register-book.argstype';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async find() {
    return this.bookModel.find().exec();
  }

  async createBook({...other}: RegisterBookArgs) {
    const book = await this.bookModel.create({...other});
    return book.save();
  }
}
