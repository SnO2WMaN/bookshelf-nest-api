import {Module, HttpModule} from '@nestjs/common';

import {ExchangeApiService} from './exchange-api.service';

@Module({
  imports: [HttpModule],
  exports: [ExchangeApiService],
  providers: [ExchangeApiService],
})
export class ExchangeApiModule {}
