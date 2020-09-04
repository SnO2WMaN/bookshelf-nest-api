import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {FindDTO} from './dto/find.dto';
import {RegisterBookArgs} from './dto/register-book.argstype';
import {Book} from './schema/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async findById(id: string) {
    return this.bookModel.findById(id);
  }

  async find({
    limit,
    page,
  }: FindDTO): Promise<{
    docs: Book[];
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    hasPrevPage: boolean;
    prevPage?: number;
    hasNextPage: boolean;
    nextPage?: number;
  }> {
    return (this.bookModel as any).paginate({}, {page, limit});
  }

  async createBook({...other}: RegisterBookArgs) {
    const book = await this.bookModel.create({...other});
    return book.save();
  }
}
