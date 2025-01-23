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

export class UpdateRoomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId?: number;

  @IsNotEmpty()
  @IsBoolean()
  portal?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  obelisk?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  craftingSkillIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  monsterIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  npcIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  questStepIds?: number[];

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
