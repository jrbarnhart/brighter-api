import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateArmorVariantDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumberString()
  @IsNotEmpty()
  armorId?: number;
}
