import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
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
  @MinLength(1)
  name: string;

  region: RegionBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;

  requirements: GatheringSkillRequirementBaseEntity[];

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
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId: number;
}
