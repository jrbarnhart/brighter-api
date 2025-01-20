import { ApiProperty } from '@nestjs/swagger';
import { Faction, GearSlot } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Max } from 'class-validator';

export class UpdateArmorDto {
  @IsString()
  @IsNotEmpty()
  @Max(256)
  name?: string;

  @IsEnum(Faction)
  @IsNotEmpty()
  @Max(256)
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: Faction,
    type: String,
  })
  faction?: Faction;

  @IsEnum(GearSlot)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The gear slot that this armor occupies',
    enum: GearSlot,
    type: String,
  })
  slot?: GearSlot;
}
