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
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegionEntity } from 'src/regions/entities/regions.entity';

export class RoomEntity {
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
  region: RegionEntity;

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

  //   craftingSKills: CraftingSkillEntity[]

  //   monsters: MonsterEntity[]

  //   npcs: NpcEntity[]

  //   resources: ResourceEntity[]

  //   questSteps: QuestStepEntity

  @IsArray()
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    isArray: true,
    enum: BankType,
    type: String,
  })
  banks?: BankType[];
}
