import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: '1234567890',
  })
  id: string;
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is a sample post content.',
  })
  content: string;

  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  author: string;
}
