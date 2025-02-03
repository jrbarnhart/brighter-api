import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorVariantBaseWithArmorEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { CraftingSkillRequirementBaseEntity } from '../../craftingSkillRequirement/entities/craftingSkillRequirements.entity';
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
  name: string;

  requirement?: CraftingSkillRequirementBaseEntity;

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
  name: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;
}
