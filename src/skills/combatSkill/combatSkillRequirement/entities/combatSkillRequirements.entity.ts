import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { CombatSkillBaseEntity } from '../../entities/combatSkills.entity';
import { MonsterVariantBaseWithMonsterEntity } from 'src/monsters/monsterVariants/entities/monsterVariants.entity';

export class CombatSkillRequirementEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(400)
  description?: string;

  skill: CombatSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  monsterVariant?: MonsterVariantBaseWithMonsterEntity;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterVariantId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}

export class CombatSkillRequirementBaseEntity {
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

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;
}
