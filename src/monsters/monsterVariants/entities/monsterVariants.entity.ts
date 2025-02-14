import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DropTableBaseEntity } from 'src/monsters/dropTables/entities/dropTables.entity';
import {
  MonsterBaseEntity,
  MonsterBaseWithSkillEntity,
} from 'src/monsters/entities/monsters.entity';
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
  @MinLength(1)
  name: string;

  monster: MonsterBaseWithSkillEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterId: number;

  requirement?: CombatSkillRequirementBaseEntity;

  @IsOptional()
  dropTable?: DropTableBaseEntity;
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
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterId: number;
}

export class MonsterVariantBaseWithMonsterEntity {
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
  monsterId: number;

  monster: MonsterBaseEntity;
}
