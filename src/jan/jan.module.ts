import {Module} from '@nestjs/common';

import {JanService} from './jan.service';

@Module({
  exports: [JanService],
  providers: [JanService],
})
export class JanModule {}
