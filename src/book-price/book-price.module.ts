import {Module} from '@nestjs/common';

import {PriceModule} from '../price/price.module';

import {BookPriceResolver} from './book-price.resolver';
import {BookPriceService} from './book-price.service';

@Module({
  imports: [PriceModule],
  providers: [BookPriceResolver, BookPriceService],
})
export class BookPriceModule {}
