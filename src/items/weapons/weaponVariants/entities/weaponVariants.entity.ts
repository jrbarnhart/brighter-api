import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { WeaponBaseEntity } from '../../entities/weapons.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';

export class WeaponVariantEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
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

  //vendors: VendorBaseEntity[]
  //dropTables: DropTableBaseEntity[]
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
