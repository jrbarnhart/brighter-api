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
import { ArmorVariantBaseWithArmorEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { ConsumableVariantBaseWithConsumableEntity } from 'src/items/consumables/consumableVariants/entities/consumableVariants.entity';
import { MiscItemBaseEntity } from 'src/items/miscItems/entities/miscItems.entity';
import { ResourceVariantBaseWithResourceEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';
import { WeaponVariantBaseWithWeaponEntity } from 'src/items/weapons/weaponVariants/entities/weaponVariants.entity';
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
  name?: string | null;

  npc: NpcBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number;

  resourceVariants: ResourceVariantBaseWithResourceEntity[];

  consumableVariants: ConsumableVariantBaseWithConsumableEntity[];

  weaponVariants: WeaponVariantBaseWithWeaponEntity[];

  armorVariants: ArmorVariantBaseWithArmorEntity[];

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
