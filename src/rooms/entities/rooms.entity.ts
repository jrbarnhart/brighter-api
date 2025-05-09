import { BankType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegionBaseEntity } from 'src/regions/entities/regions.entity';
import { CraftingSkillBaseEntity } from 'src/skills/craftingSkill/entities/craftingSkills.entity';
import { MonsterBaseEntity } from 'src/monsters/entities/monsters.entity';
import { NpcBaseEntityWithVendor } from 'src/npcs/entities/npcs.entity';
import { ResourceBaseEntity } from 'src/items/resources/entities/resources.entity';
import { QuestStepBaseEntityWithQuest } from 'src/quests/questSteps/entities/questSteps.entity';

export class RoomEntity {
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

  @IsNotEmpty()
  @IsBoolean()
  portal: boolean;

  @IsNotEmpty()
  @IsBoolean()
  obelisk: boolean;

  @IsNotEmpty()
  @IsBoolean()
  rift: boolean;

  @IsArray()
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    isArray: true,
    enum: BankType,
    type: String,
  })
  banks: BankType[];

  craftingSkills: CraftingSkillBaseEntity[];

  monsters: MonsterBaseEntity[];

  npcs: NpcBaseEntityWithVendor[];

  resources: ResourceBaseEntity[];

  questSteps: QuestStepBaseEntityWithQuest[];
}

export class RoomBaseEntity {
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

  @IsNotEmpty()
  @IsBoolean()
  portal: boolean;

  @IsNotEmpty()
  @IsBoolean()
  obelisk: boolean;

  @IsNotEmpty()
  @IsBoolean()
  rift: boolean;

  @IsArray()
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    isArray: true,
    enum: BankType,
    type: String,
  })
  banks: BankType[];
}
