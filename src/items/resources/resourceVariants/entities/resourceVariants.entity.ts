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
  ResourceBaseEntity,
  ResourceBaseWithSkillEntity,
} from '../../entities/resources.entity';
import { CraftingRecipeBaseEntity } from 'src/skills/craftingSkill/craftingRecipes/entities/craftingRecipes.entity';
import { GatheringSkillRequirementBaseEntity } from 'src/skills/gatheringSkill/gatheringSkillRequirement/entities/gatheringSkillRequirements.entity';
import { VendorBaseEntity } from 'src/npcs/vendors/entities/vendors.entity';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';

export class ResourceVariantEntity {
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

  resource: ResourceBaseWithSkillEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId: number;

  requirement?: GatheringSkillRequirementBaseEntity;

  inRecipes: CraftingRecipeBaseEntity[];

  vendors: VendorBaseEntity[];

  dropTables: DropTableBaseEntity[];
}

export class ResourceVariantBaseEntity {
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
  resourceId: number;
}

export class ResourceVariantBaseWithResourceEntity {
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
  resourceId: number;

  resource: ResourceBaseEntity;
}
