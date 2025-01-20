import { ApiProperty } from '@nestjs/swagger';
import { Faction, GearSlot } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArmorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsEnum(Faction)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
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
