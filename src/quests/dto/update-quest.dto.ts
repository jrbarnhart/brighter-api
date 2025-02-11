import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateQuestDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;
}
