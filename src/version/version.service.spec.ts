import {Test, TestingModule} from '@nestjs/testing';

import {VersionService} from './version.service';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionService],
    }).compile();

    service = module.get<VersionService>(VersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sortVersions', () => {
    it('全ての版に発行日がある', () => {
      const sorted = service.sortVersions([
        {
          version: 1,
          publishedAt: '1996/9/20',
        },
        {
          version: 2,
          publishedAt: '2004/2/29',
        },
        {
          version: 3,
          publishedAt: '2008/9/26',
        },
      ]);
      expect(sorted).toStrictEqual([
        {
          version: 3,
          publishedAt: '2008/9/26',
        },
        {
          version: 2,
          publishedAt: '2004/2/29',
        },
        {
          version: 1,
          publishedAt: '1996/9/20',
        },
      ]);
    });
    it('全ての版に通し番号がある', () => {
      const sorted = service.sortVersions([
        {
          version: 1,
        },
        {
          version: 2,
        },
        {
          version: 3,
        },
      ]);
      expect(sorted).toStrictEqual([
        {
          version: 3,
        },
        {
          version: 2,
        },
        {
          version: 1,
        },
      ]);
    });
    it('版の番号が重複しており,発行日がある', () => {
      const sorted = service.sortVersions([
        {
          version: 1,
          publishedAt: '1996/9/20',
        },
        {
          version: 2,
          publishedAt: '2004/2/29',
        },
        {
          version: 2,
          publishedAt: '2008/9/26',
          meta: '補訂版',
        },
      ]);
      expect(sorted).toStrictEqual([
        {
          version: 2,
          publishedAt: '2008/9/26',
          meta: '補訂版',
        },
        {
          version: 2,
          publishedAt: '2004/2/29',
        },
        {
          version: 1,
          publishedAt: '1996/9/20',
        },
      ]);
    });
    it('版の番号が重複しており,発行日がなく,メタデータがあるものを優先する', () => {
      const sorted = service.sortVersions([
        {
          version: 1,
        },
        {
          version: 2,
        },
        {
          version: 2,
          meta: '補訂版',
        },
      ]);
      expect(sorted).toStrictEqual([
        {
          version: 2,
          meta: '補訂版',
        },
        {
          version: 2,
        },
        {
          version: 1,
        },
      ]);
    });
  });
});
