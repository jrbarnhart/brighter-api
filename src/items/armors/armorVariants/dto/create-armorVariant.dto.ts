import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateArmorVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  armorId: number;
}
