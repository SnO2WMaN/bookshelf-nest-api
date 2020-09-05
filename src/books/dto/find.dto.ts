import {IsInt, IsPositive} from 'class-validator';

export class FindDTO {
  @IsInt()
  @IsPositive()
  readonly limit?: number;

  @IsInt()
  @IsPositive()
  readonly page?: number;
}
