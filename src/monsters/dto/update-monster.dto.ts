import { ApiProperty } from '@nestjs/swagger';
import { Element } from '@prisma/client';
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

export class UpdateMonsterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId?: number;

  @IsNotEmpty()
  @IsBoolean()
  passive?: boolean;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The damage type this monster attacks with',
    enum: Element,
    type: String,
  })
  attackElement?: Element;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The damage type this monster is immune to',
    enum: Element,
    type: String,
  })
  immuneElement?: Element;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The damage type this monster is vulnerable to',
    enum: Element,
    type: String,
  })
  vulnerableElement?: Element;
}
