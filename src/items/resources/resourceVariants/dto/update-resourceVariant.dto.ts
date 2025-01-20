import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateResourceVariantDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  resourceId?: number;
}
