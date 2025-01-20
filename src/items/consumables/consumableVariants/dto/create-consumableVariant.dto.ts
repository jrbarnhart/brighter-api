import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateConsumableVariantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  consumableId: number;
}
