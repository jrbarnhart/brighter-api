import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ConsumableBaseEntity,
  ConsumableBaseWithSkillEntity,
} from '../../entities/consumables.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';
import { VendorBaseEntity } from 'src/npcs/vendors/entities/vendors.entity';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';

export class ConsumableVariantEntity {
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

  consumable: ConsumableBaseWithSkillEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  consumableId: number;

  recipe?: CraftingRecipeBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;

  vendors: VendorBaseEntity[];

  dropTables: DropTableBaseEntity[];
}

export class ConsumableVariantBaseEntity {
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

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  consumableId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;
}

export class ConsumableVariantBaseWithConsumableEntity {
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

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  consumableId: number;

  consumable: ConsumableBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;
}
