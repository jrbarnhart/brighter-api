import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AttackElement, Faction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeaponDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsOptional()
  @IsEnum(Faction)
  @ApiProperty({
    description: 'The faction/player class this belongs to',
    enum: Faction,
    type: String,
  })
  faction?: Faction;

  @IsOptional()
  @IsEnum(AttackElement)
  @ApiProperty({
    description: 'The damage element this weapon has',
    enum: AttackElement,
    type: String,
  })
  element?: AttackElement;

  @IsOptional()
  @IsBoolean()
  isRanged?: boolean;

  @IsOptional()
  @IsBoolean()
  isTwoHanded?: boolean;
}
