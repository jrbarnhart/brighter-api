import { ApiProperty } from '@nestjs/swagger';
import { AttackElement } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMonsterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage type this monster attacks with',
    enum: AttackElement,
    type: String,
  })
  attackElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage type this monster is immune to',
    enum: AttackElement,
    type: String,
  })
  immuneElement: AttackElement;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage type this monster is vulnerable to',
    enum: AttackElement,
    type: String,
  })
  vulnerableElement: AttackElement;
}
