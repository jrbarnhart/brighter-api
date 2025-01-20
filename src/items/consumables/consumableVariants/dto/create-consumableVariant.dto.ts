import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateConsumableVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  consumableId: number;
}
