import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateConsumableVariantDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  consumableId?: number;
}
