import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
} from 'class-validator';

export class UpdateVendorDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  npcId?: number;

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceVariantIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  weaponVariantIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  armorVariantIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  consumableVariantIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  miscItemsIds?: number[];
}
