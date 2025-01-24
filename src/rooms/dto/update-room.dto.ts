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
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
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
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    isArray: true,
    enum: BankType,
    type: String,
  })
  banks?: BankType[];
}
