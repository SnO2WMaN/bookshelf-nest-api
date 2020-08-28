import {Module} from '@nestjs/common';

import {PriceModule} from '../price/price.module';

import {BookPriceResolver} from './book-price.resolver';

@Module({
  imports: [PriceModule],
  providers: [BookPriceResolver],
})
export class BookPriceModule {}
