import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is a sample post content.',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'The date of the post',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  date: Date;
}
