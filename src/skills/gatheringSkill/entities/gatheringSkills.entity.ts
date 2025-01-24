import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { GatheringSkillRequirementBaseEntity } from '../gatheringSkillRequirement/entities/gatheringSkillRequirements.entity';
import { ResourceBaseEntity } from 'src/items/resources/entities/resources.entity';
import { RegionBaseEntity } from 'src/regions/entities/regions.entity';

export class GatheringSkillEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  region: RegionBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  skillRequirements: GatheringSkillRequirementBaseEntity[];

  resources: ResourceBaseEntity[];
}

export class GatheringSkillBaseEntity {
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
  regionId: number;
}
