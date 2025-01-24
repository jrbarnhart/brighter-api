import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ResourceVariantBaseEntity } from '../resourceVariants/entities/resourceVariants.entity';
import { GatheringSkillBaseEntity } from 'src/skills/gatheringSkill/entities/gatheringSkills.entity';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';

export class ResourceEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  skill: GatheringSkillBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  rooms: RoomBaseEntity[];

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  variants: ResourceVariantBaseEntity[];
}

export class ResourceBaseEntity {
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
}
