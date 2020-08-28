import {Module, HttpModule} from '@nestjs/common';

import {OpenBDService} from './openbd.service';

@Module({
  imports: [HttpModule],
  exports: [OpenBDService],
  providers: [OpenBDService],
})
export class OpenBDModule {}
