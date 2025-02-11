import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId?: number;

  @IsOptional()
  @IsBoolean()
  passive?: boolean;
}
