import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArmorVariantBaseWithArmorEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { CraftingSkillRequirementBaseWithSkillEntity } from '../../craftingSkillRequirement/entities/craftingSkillRequirements.entity';
import { ResourceVariantBaseWithResourceEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';
import { MiscItemBaseEntity } from 'src/items/miscItems/entities/miscItems.entity';
import { ConsumableVariantBaseWithConsumableEntity } from 'src/items/consumables/consumableVariants/entities/consumableVariants.entity';
import { WeaponVariantBaseWithWeaponEntity } from 'src/items/weapons/weaponVariants/entities/weaponVariants.entity';

export class CraftingRecipeEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  requirement?: CraftingSkillRequirementBaseWithSkillEntity;

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;

  inputResourceVariants: ResourceVariantBaseWithResourceEntity[];
  inputItems: MiscItemBaseEntity[];

  outputConsumableVariant?: ConsumableVariantBaseWithConsumableEntity;
  outputWeaponVariant?: WeaponVariantBaseWithWeaponEntity;
  outputArmorVariant?: ArmorVariantBaseWithArmorEntity;
}

export class CraftingRecipeBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;
}
