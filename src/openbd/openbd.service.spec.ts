import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/common';
import {of} from 'rxjs';

import {OpenBDService, InvalidISBNError} from './openbd.service';

describe('OpenBDService', () => {
  let module: TestingModule;
  let openbdService: OpenBDService;
  let httpService: HttpService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [OpenBDService],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
  });

  beforeEach(async () => {
    openbdService = module.get<OpenBDService>(OpenBDService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(openbdService).toBeDefined();
  });

  it('不正なISBN', async () => {
    const exchanged = openbdService.cover('9784041098968');
    await expect(exchanged).rejects.toThrow(InvalidISBNError);
  });

  it('表紙絵がある場合', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        data: [{summary: {cover: 'https://cover.openbd.jp/9784041098967.jpg'}}],
      } as any),
    );
    const cover = await openbdService.cover('9784041098967');
    await expect(cover).toBe('https://cover.openbd.jp/9784041098967.jpg');
  });

  it('表紙絵が無かった場合', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        data: [{summary: {}}],
      } as any),
    );
    const cover = await openbdService.cover('9784041098967');
    await expect(cover).toBeNull();
  });
});
