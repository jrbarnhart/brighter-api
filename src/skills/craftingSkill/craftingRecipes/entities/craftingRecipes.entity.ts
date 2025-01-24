import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorVariantBaseEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { CraftingSkillRequirementBaseEntity } from '../../craftingSkillRequirement/entities/craftingSkillRequirements.entity';
import { ResourceVariantBaseEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';
import { MiscItemBaseEntity } from 'src/items/miscItems/entities/miscItems.entity';
import { ConsumableVariantBaseEntity } from 'src/items/consumables/consumableVariants/entities/consumableVariants.entity';
import { WeaponVariantBaseEntity } from 'src/items/weapons/weaponVariants/entities/weaponVariants.entity';

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

  inputResourceVariants: ResourceVariantBaseEntity[];
  inputItems: MiscItemBaseEntity[];

  outputConsumableVariant?: ConsumableVariantBaseEntity;
  outputWeaponVariant?: WeaponVariantBaseEntity;
  outputArmorVariant?: ArmorVariantBaseEntity;
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
