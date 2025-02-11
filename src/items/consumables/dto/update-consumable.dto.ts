import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateConsumableDto {
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;
}
