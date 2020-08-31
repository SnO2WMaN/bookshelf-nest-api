import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {books} from './sample/books.sample';
import {Book} from './schema/book.schema';
import {RegisterBookArgs} from './argstype/register-book.argstype';
import {ManyBooksArgs} from './argstype/many-books.argstype';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async find({keywords, categories}: ManyBooksArgs) {
    return this.bookModel
      .find({
        ...(keywords && {keywords: {$in: keywords}}),
        ...(categories && {categories: {$in: categories}}),
      })
      .exec();
  }

  async createBook({...other}: RegisterBookArgs) {
    const book = await this.bookModel.create({...other});
    return book.save();
  }
}
