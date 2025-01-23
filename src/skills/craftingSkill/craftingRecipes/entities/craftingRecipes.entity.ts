import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorVariantEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';

export class CraftingRecipeEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  //requirement?: CraftingSkillRequirementEntity

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId?: number | null;

  //inputResourceVariants?: ResourceVariantEntity[]
  //inputItems?: MiscItemEntity[]

  //outputConsumableVariant?: ConsumableVariantEntity
  //outputWeaponVariant?: WeaponVariantEntity
  outputArmorVariant?: ArmorVariantEntity;
}
