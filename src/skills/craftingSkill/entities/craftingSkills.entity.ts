import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CraftingSkillRequirementBaseEntity } from '../craftingSkillRequirement/entities/craftingSkillRequirements.entity';
import { RegionBaseEntity } from 'src/regions/entities/regions.entity';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';
import { ConsumableBaseEntity } from 'src/items/consumables/entities/consumables.entity';

export class CraftingSkillEntity {
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

  requirements: CraftingSkillRequirementBaseEntity[];

  rooms: RoomBaseEntity[];

  consumables: ConsumableBaseEntity[];
}

export class CraftingSkillBaseEntity {
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
