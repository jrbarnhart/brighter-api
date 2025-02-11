import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateConsumableDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;
}
