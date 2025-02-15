import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArmorBaseEntity } from '../../entities/armors.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';
import { VendorBaseEntity } from 'src/npcs/vendors/entities/vendors.entity';

export class ArmorVariantEntity {
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

  armor: ArmorBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  armorId: number;

  recipe?: CraftingRecipeBaseEntity;

  vendors: VendorBaseEntity[];

  dropTables: DropTableBaseEntity[];
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
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  armorId: number;
}

export class ArmorVariantBaseWithArmorEntity {
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
  armorId: number;

  armor: ArmorBaseEntity;
}
