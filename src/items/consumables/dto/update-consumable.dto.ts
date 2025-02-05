import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateConsumableDto {
  @IsString()
  @MaxLength(256)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;
}
