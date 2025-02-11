import { ApiProperty } from '@nestjs/swagger';
import { Faction, GearSlot } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArmorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsEnum(Faction)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The faction/player class this belongs to',
    enum: Faction,
    type: String,
  })
  faction: Faction;

  @IsEnum(GearSlot)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: GearSlot,
    type: String,
  })
  slot: GearSlot;
}
