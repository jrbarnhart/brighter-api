import { Faction, GearSlot } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArmorDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEnum(Faction)
  @IsNotEmpty()
  faction?: Faction;

  @IsEnum(GearSlot)
  @IsNotEmpty()
  slot?: GearSlot;
}
