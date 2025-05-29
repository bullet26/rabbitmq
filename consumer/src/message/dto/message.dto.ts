import { ApiProperty } from '@nestjs/swagger';

export class MessageDTO {
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: '683820f84a84eaed07d52372',
  })
  _id: string;

  @ApiProperty({
    description: 'The author of the post',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is a sample post content.',
  })
  content: string;

  @ApiProperty({
    description: 'The date of the post',
    example: '2022-04-15T14:03:50.000Z',
  })
  date: Date;
}
