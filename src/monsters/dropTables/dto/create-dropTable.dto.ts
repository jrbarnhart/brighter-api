import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateDropTableDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterVariantId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  weaponVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  armorVariantIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  consumableVariantIds?: number[];

  @IsNumber()
  @IsInt()
  @IsPositive()
  currency?: number;
}
