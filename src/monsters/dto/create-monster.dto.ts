import { ApiProperty } from '@nestjs/swagger';
import { Element } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMonsterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  skillId: number;

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: Element,
    type: String,
  })
  attackElement: Element;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: Element,
    type: String,
  })
  immuneElement: Element;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: Element,
    type: String,
  })
  vulnerableElement: Element;
}
