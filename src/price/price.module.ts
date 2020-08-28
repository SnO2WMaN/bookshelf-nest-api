import {Module} from '@nestjs/common';

import {ExchangeApiModule} from '../exchange-api/exchange-api.module';

import {PriceResolver} from './price.resolver';
import {PriceService} from './price.service';

@Module({
  imports: [ExchangeApiModule],
  exports: [PriceService],
  providers: [PriceService, PriceResolver],
})
export class PriceModule {}
