import { BankType } from '@prisma/client';
import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string(),
  regionId: z.number().int().positive(),
  craftingSkillIds: z.array(z.number().int().positive()).optional(),
  monsterIds: z.array(z.number().int().positive()).optional(),
  npcIds: z.array(z.number().int().positive()).optional(),
  resourceIds: z.array(z.number().int().positive()).optional(),
  questStepIds: z.array(z.number().int().positive()).optional(),
  banks: z.array(z.nativeEnum(BankType)).optional(),
  portal: z.boolean(),
  obelisk: z.boolean(),
});

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  regionId: number;

  @IsNotEmpty()
  @IsBoolean()
  portal: boolean;

  @IsNotEmpty()
  @IsBoolean()
  obelisk: boolean;

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  craftingSkillIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  monsterIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  npcIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  resourceIds?: number[];

  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  questStepIds?: number[];

  @IsArray()
  @IsEnum(BankType, { each: true })
  @ApiProperty({
    description: 'The array of types of bank in this room',
    enum: BankType,
    type: String,
  })
  banks: BankType[];
}
