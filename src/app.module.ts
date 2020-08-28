import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ExchangeApiModule} from './exchange-api/exchange-api.module';

@Module({
  imports: [ExchangeApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
