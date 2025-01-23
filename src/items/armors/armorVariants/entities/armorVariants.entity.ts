import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorEntity } from '../../entities/armors.entity';
import { CraftingRecipeEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';

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

  armor: ArmorEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  armorId: number;

  recipe: CraftingRecipeEntity;

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
