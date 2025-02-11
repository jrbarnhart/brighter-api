import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateResourceVariantDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId?: number;
}
