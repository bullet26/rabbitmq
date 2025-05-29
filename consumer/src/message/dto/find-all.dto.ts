import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @ApiProperty({
    description: 'The author of the posts to filter by',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({
    description: 'The start date to filter posts from',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  startDate?: string;

  @ApiProperty({
    description: 'The end date to filter posts until',
    example: '2023-12-31T23:59:59Z',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endDate?: string;

  @ApiProperty({
    description: 'The number of posts to return',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number;
}
