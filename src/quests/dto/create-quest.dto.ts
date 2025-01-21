import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateQuestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;
}
