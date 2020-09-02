import {Injectable} from '@nestjs/common';

import {Price} from '../price/schema/price.schema';

export type PublicationJANCode = string;

@Injectable()
export class JanService {
  calculateCheckDigit(jan: string) {
    const comb: number = jan
      .substr(0, 12)
      .split('')
      .reduce(
        (acc, cur, i) => acc + (i % 2 === 0 ? 1 : 3) * parseInt(cur, 10),
        0,
      );
    return 10 - (comb % 10);
  }

  check(jan: string): jan is PublicationJANCode {
    if (!/^192\d{10}$/.test(jan)) return false;
    if (parseInt(jan.slice(-1), 10) !== this.calculateCheckDigit(jan))
      return false;
    return true;
  }

  price(jan: PublicationJANCode): Price | null {
    const price = jan.substr(7, 5);
    if (price === '00000') return null;
    return {value: parseInt(price, 10), currency: 'JPY'};
  }
}
