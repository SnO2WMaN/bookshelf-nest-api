import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {FindDTO} from './dto/find.dto';
import {RegisterBookArgs} from './dto/register-book.argstype';
import {Book} from './schema/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async findById(id: string) {
    return this.bookModel.findById(id);
  }

  async find({limit}: FindDTO) {
    return this.bookModel.find({}).limit(limit).exec();
  }

  async createBook({...other}: RegisterBookArgs) {
    const book = await this.bookModel.create({...other});
    return book.save();
  }
}
