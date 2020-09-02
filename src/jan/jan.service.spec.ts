import {Test, TestingModule} from '@nestjs/testing';

import {JanService} from './jan.service';

describe('JanService', () => {
  let service: JanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JanService],
    }).compile();

    service = module.get<JanService>(JanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calculateCheckDigit()', () => {
    expect(service.calculateCheckDigit('1923000020009')).toBe(9);
    expect(service.calculateCheckDigit('1929979004408')).toBe(8);
    expect(service.calculateCheckDigit('1920030016002')).toBe(2);
  });

  it('check()', () => {
    expect(service.check('1929979004408')).toBe(true);
    expect(service.check('19299790044080')).toBe(false);
    expect(service.check('1929979004409')).toBe(false);
  });

  it('price()', () => {
    expect(service.price('1929979004408')).toStrictEqual({
      value: 440,
      currency: 'JPY',
    });
    expect(service.price('1929979000004')).toBeNull();
  });
});
