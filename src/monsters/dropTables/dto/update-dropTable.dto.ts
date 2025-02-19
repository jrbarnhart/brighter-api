import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateDropTableDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  monsterVariantId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  resourceVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  weaponVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  armorVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  consumableVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  miscItemIds?: number[];

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  currency?: number | null;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeResourceVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeWeaponVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeArmorVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeConsumableVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeMiscItemIds?: number[];
}
