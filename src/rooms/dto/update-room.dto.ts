import { BankType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  portal?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  obelisk?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  rift?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    isArray: true,
    enum: BankType,
    type: String,
  })
  banks?: BankType[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  craftingSkillIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  monsterIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  npcIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  questStepIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeCraftingSkillIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeMonsterIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeNpcIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeResourceIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  removeQuestStepIds?: number[];
}
