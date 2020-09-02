import {Injectable} from '@nestjs/common';

import {Price} from '../price/schema/price.schema';

@Injectable()
export class BookPriceService {
  japaneseComsumptionTax(base: Price): Price {
    return {
      value: Math.floor(base.value * 0.1),
      currency: 'JPY',
    };
  }
}
