import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';
import { VendorBaseEntity } from 'src/npcs/vendors/entities/vendors.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';

export class MiscItemEntity {
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

  vendors: VendorBaseEntity[];

  inRecipes: CraftingRecipeBaseEntity[];

  dropTables: DropTableBaseEntity[];
}

export class MiscItemBaseEntity {
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
}
