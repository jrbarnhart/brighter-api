import { ApiProperty } from '@nestjs/swagger';
import { AttackElement, BankType, Faction, GearSlot } from '@prisma/client';

export class AttackElementsEnum {
  @ApiProperty({ enum: AttackElement })
  value: AttackElement;
}

export class FactionsEnum {
  @ApiProperty({ enum: Faction })
  value: Faction;
}

export class GearSlotsEnum {
  @ApiProperty({ enum: GearSlot })
  value: GearSlot;
}

export class BankTypesEnum {
  @ApiProperty({ enum: BankType })
  value: BankType;
}
