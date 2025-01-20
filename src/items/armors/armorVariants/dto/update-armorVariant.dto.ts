import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateArmorVariantDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  armorId?: number;
}
