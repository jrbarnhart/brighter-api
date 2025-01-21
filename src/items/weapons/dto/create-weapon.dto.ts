import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Element, Faction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeaponDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsEnum(Faction)
  @ApiProperty({
    description: 'The faction/player class this belongs to',
    enum: Faction,
    type: String,
  })
  faction: Faction;

  @IsNotEmpty()
  @IsEnum(Element)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: Element,
    type: String,
  })
  element: Element;

  @IsNotEmpty()
  @IsBoolean()
  isRanged: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTwoHanded: boolean;
}
