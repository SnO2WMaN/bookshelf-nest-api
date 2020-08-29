import {Module} from '@nestjs/common';

import {VersionService} from './version.service';
import {VersionResolver} from './version.resolver';

@Module({
  providers: [VersionService, VersionResolver],
  exports: [VersionService],
})
export class VersionModule {}
