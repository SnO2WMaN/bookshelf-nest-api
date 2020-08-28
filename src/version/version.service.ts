import {Injectable} from '@nestjs/common';

import {Version} from './schema/version.schema';

@Injectable()
export class VersionService {
  sortVersions(versions: Version[]): Version[] {
    return versions.sort(
      (
        {publishedAt: publishedA, version: versionA, meta: metaA},
        {publishedAt: publishedB, version: versionB, meta: metaB},
      ) => {
        if (Boolean(publishedA) && Boolean(publishedB))
          return (
            new Date(publishedB).getTime() - new Date(publishedA).getTime()
          );
        if (versionA !== versionB) return versionB - versionA;
        if (Boolean(metaB) && !metaA) return 1;
        if (Boolean(metaA) && !metaB) return -1;
        throw new Error();
      },
    );
  }
}
