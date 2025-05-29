import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The author of the posts to filter by',
    example: 'John Doe',
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'This is a sample message content.',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: 'The date of the message',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  date: Date;
}
