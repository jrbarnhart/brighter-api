import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
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
