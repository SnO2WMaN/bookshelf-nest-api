import {Module} from '@nestjs/common';

import {VersionService} from './version.service';

@Module({
  exports: [VersionService],
  providers: [VersionService],
})
export class VersionModule {}
