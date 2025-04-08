import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVendorDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number;

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
}
