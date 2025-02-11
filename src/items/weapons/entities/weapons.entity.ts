import { ApiProperty } from '@nestjs/swagger';
import { Faction, AttackElement } from '@prisma/client';
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
  @MinLength(1)
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
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  element: AttackElement;

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
  @MinLength(1)
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
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  element: AttackElement;

  @IsNotEmpty()
  @IsBoolean()
  isRanged: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTwoHanded: boolean;
}
