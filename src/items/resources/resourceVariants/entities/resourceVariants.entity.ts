import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
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
  name: string;

  resource: ResourceBaseWithSkillEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId: number;

  requirement?: GatheringSkillRequirementBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;

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
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;
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
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId: number;

  resource: ResourceBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;
}
