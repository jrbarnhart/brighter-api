import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { GatheringSkillEntity } from '../../entities/gatheringSkills.entity';
import { ResourceVariantBaseWithResourceEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';

export class GatheringSkillRequirementEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(400)
  description?: string;

  skill: GatheringSkillEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  resourceVariant?: ResourceVariantBaseWithResourceEntity;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceVariantId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}

export class GatheringSkillRequirementBaseEntity {
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
  resourceVariantId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}
