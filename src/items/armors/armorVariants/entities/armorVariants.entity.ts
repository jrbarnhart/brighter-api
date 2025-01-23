import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorBaseEntity } from '../../entities/armors.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';

export class ArmorVariantEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  armor: ArmorBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  armorId: number;

  recipe: CraftingRecipeBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number;

  //dropTables: DropTableEntity[]
  //vendors: VendorEntity[]
}

export class ArmorVariantBaseEntity {
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
  armorId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number;
}
