import {Module} from '@nestjs/common';

import {JanService} from './jan.service';

@Module({
  providers: [JanService],
})
export class JanModule {}
