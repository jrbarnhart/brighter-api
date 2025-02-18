import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  weaponVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  armorVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  consumableVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  miscItemIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeResourceVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeWeaponVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeArmorVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeConsumableVariantIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeMiscItemIds?: number[];
}
