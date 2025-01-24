import { ApiProperty } from '@nestjs/swagger';
import { Faction } from '@prisma/client';
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
import { WeaponVariantBaseEntity } from '../weaponVariants/entities/weaponVariants.entity';

export class WeaponEntity {
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

  variants: WeaponVariantBaseEntity[];
}

export class WeaponBaseEntity {
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
