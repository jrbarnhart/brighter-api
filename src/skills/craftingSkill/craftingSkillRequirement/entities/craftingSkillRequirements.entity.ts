import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { CraftingSkillBaseEntity } from '../../entities/craftingSkills.entity';
import { CraftingRecipeBaseEntity } from '../../craftingRecipes/entities/craftingRecipes.entity';

export class CraftingSkillRequirementEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(400)
  description?: string;

  skill: CraftingSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  recipe?: CraftingRecipeBaseEntity;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}

export class CraftingSkillRequirementBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}

export class CraftingSkillRequirementBaseWithSkillEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  skill: CraftingSkillBaseEntity;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}
