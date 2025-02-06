import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuestDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string;
}
