import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateQuestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;
}
