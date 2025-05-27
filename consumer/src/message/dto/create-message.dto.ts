import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly author: string;

  @IsString()
  readonly content: string;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
