import {IsInt, IsPositive} from 'class-validator';

export class FindDTO {
  @IsInt()
  @IsPositive()
  limit: number;
}
