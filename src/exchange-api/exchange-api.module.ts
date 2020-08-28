import {Module, HttpModule} from '@nestjs/common';

import {ExchangeApiService} from './exchange-api.service';

@Module({
  imports: [HttpModule],
  providers: [ExchangeApiService],
})
export class ExchangeApiModule {}
