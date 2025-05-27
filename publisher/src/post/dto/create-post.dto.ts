import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly content: string;

  @IsString()
  readonly author: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
