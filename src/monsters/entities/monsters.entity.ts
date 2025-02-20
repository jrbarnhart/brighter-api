import { ApiProperty } from '@nestjs/swagger';
import { AttackElement } from '@prisma/client';
import {
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
import { CombatSkillBaseEntity } from 'src/skills/combatSkill/entities/combatSkills.entity';
import { MonsterVariantBaseEntity } from '../monsterVariants/entities/monsterVariants.entity';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';
import { RegionBaseEntity } from 'src/regions/entities/regions.entity';

export class MonsterEntity {
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

  skill: CombatSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  region: RegionBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  rooms: RoomBaseEntity[];

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  attackElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  immuneElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  vulnerableElement: AttackElement;

  variants: MonsterVariantBaseEntity[];
}

export class MonsterBaseEntity {
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
  skillId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  attackElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  immuneElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  vulnerableElement: AttackElement;
}

export class MonsterBaseWithSkillEntity {
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
  skillId: number;

  skill: CombatSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  attackElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  immuneElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  vulnerableElement: AttackElement;
}
