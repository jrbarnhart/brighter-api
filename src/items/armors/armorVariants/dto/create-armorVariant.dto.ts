import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArmorVariantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  armorId: number;
}
