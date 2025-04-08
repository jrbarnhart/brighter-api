import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArmorVariantBaseEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { ConsumableVariantBaseEntity } from 'src/items/consumables/consumableVariants/entities/consumableVariants.entity';
import { MiscItemBaseEntity } from 'src/items/miscItems/entities/miscItems.entity';
import { ResourceVariantBaseEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';
import { WeaponVariantBaseEntity } from 'src/items/weapons/weaponVariants/entities/weaponVariants.entity';
import { NpcBaseEntity } from 'src/npcs/entities/npcs.entity';

export class VendorEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  npc: NpcBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number;

  resourceVariants: ResourceVariantBaseEntity[];

  consumableVariants: ConsumableVariantBaseEntity[];

  weaponVariants: WeaponVariantBaseEntity[];

  armorVariants: ArmorVariantBaseEntity[];

  miscItems: MiscItemBaseEntity[];
}

export class VendorBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number;
}
