import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { AttackElement, Faction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeaponDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsEnum(Faction)
  @ApiProperty({
    description: 'The faction/player class this belongs to',
    enum: Faction,
    type: String,
  })
  faction?: Faction;

  @IsNotEmpty()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  element?: AttackElement;

  @IsNotEmpty()
  @IsBoolean()
  isRanged?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTwoHanded?: boolean;
}
