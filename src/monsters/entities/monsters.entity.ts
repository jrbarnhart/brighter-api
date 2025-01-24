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
} from 'class-validator';
import { CombatSkillBaseEntity } from 'src/skills/combatSkill/entities/combatSkills.entity';
import { MonsterVariantBaseEntity } from '../monsterVariants/entities/monsterVariants.entity';

export class MonsterEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  skill: CombatSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  //rooms: RoomBaseEntity[]

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
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

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
