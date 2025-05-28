import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsString()
  author: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  startDate: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endDate: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number;
}
