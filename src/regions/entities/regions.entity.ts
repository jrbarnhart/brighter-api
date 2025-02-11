import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';
import { CombatSkillBaseEntity } from 'src/skills/combatSkill/entities/combatSkills.entity';
import { CraftingSkillBaseEntity } from 'src/skills/craftingSkill/entities/craftingSkills.entity';
import { GatheringSkillBaseEntity } from 'src/skills/gatheringSkill/entities/gatheringSkills.entity';

export class RegionEntity {
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

  rooms: RoomBaseEntity[];

  combatSkills: CombatSkillBaseEntity[];

  gatheringSkills: GatheringSkillBaseEntity[];

  craftingSkills: CraftingSkillBaseEntity[];
}

export class RegionBaseEntity {
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
