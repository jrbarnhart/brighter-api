import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { WeaponBaseEntity } from '../../entities/weapons.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';
import { VendorBaseEntity } from 'src/npcs/vendors/entities/vendors.entity';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';

export class WeaponVariantEntity {
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

  weapon: WeaponBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  weaponId: number;

  recipe?: CraftingRecipeBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;

  vendors: VendorBaseEntity[];

  dropTables: DropTableBaseEntity[];
}

export class WeaponVariantBaseEntity {
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
  weaponId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;
}

export class WeaponVariantBaseWithWeaponEntity {
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
  weaponId: number;

  weapon: WeaponBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;
}
