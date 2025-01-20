import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class UpdateArmorVariantDto {
  @IsString()
  @IsNotEmpty()
  @Max(256)
  name?: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  armorId?: number;
}
