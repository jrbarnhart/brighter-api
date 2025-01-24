import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { MonsterBaseEntity } from 'src/monsters/entities/monsters.entity';
import { CombatSkillRequirementBaseEntity } from 'src/skills/combatSkill/combatSkillRequirement/entities/combatSkillRequirements.entity';

export class MonsterVariantEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  monster: MonsterBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterId: number;

  requirement?: CombatSkillRequirementBaseEntity;

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;

  //dropTable: DropTableBaseEntity;
}

export class MonsterVariantBaseEntity {
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
  monsterId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  requirementId: number | null;
}
