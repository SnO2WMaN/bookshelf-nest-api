import {Module} from '@nestjs/common';

import {ExchangeApiModule} from '../exchange-api/exchange-api.module';

import {PriceResolver} from './price.resolver';

@Module({
  imports: [ExchangeApiModule],
  exports: [PriceModule],
  providers: [PriceModule, PriceResolver],
})
export class PriceModule {}
