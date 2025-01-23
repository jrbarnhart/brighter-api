import { ApiProperty } from '@nestjs/swagger';
import { Faction, GearSlot } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorVariantBaseEntity } from '../armorVariants/entities/armorVariants.entity';

export class ArmorEntity {
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
  @IsEnum(GearSlot)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: GearSlot,
    type: String,
  })
  slot: GearSlot;

  armorVariants: ArmorVariantBaseEntity[];
}

export class ArmorBaseEntity {
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
  @IsEnum(GearSlot)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: GearSlot,
    type: String,
  })
  slot: GearSlot;
}
