import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateQuestDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId?: number;
}
