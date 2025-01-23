import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateConsumableVariantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  consumableId: number;
}
