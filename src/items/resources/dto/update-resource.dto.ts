import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateResourceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId?: number;

  @IsNotEmpty()
  @IsBoolean()
  passive?: boolean;
}
