import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CombatSkillRequirementBaseEntity } from '../combatSkillRequirement/entities/combatSkillRequirements.entity';
import { RegionBaseEntity } from 'src/regions/entities/regions.entity';
import { MonsterBaseEntity } from 'src/monsters/entities/monsters.entity';

export class CombatSkillEntity {
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

  region: RegionBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  requirements: CombatSkillRequirementBaseEntity[];

  monsters: MonsterBaseEntity[];
}

export class CombatSkillBaseEntity {
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
  regionId: number;
}
