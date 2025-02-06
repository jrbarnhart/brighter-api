import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ArmorVariantBaseEntity } from 'src/items/armors/armorVariants/entities/armorVariants.entity';
import { ConsumableVariantBaseEntity } from 'src/items/consumables/consumableVariants/entities/consumableVariants.entity';
import { MiscItemBaseEntity } from 'src/items/miscItems/entities/miscItems.entity';
import { ResourceVariantBaseEntity } from 'src/items/resources/resourceVariants/entities/resourceVariants.entity';
import { WeaponVariantBaseEntity } from 'src/items/weapons/weaponVariants/entities/weaponVariants.entity';
import { MonsterVariantBaseWithMonsterEntity } from 'src/monsters/monsterVariants/entities/monsterVariants.entity';

export class DropTableEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  monsterVariant: MonsterVariantBaseWithMonsterEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterVariantId: number;

  resourceVariants: ResourceVariantBaseEntity[];

  weaponVariants: WeaponVariantBaseEntity[];

  armorVariants: ArmorVariantBaseEntity[];

  consumableVariants: ConsumableVariantBaseEntity[];

  miscItems: MiscItemBaseEntity[];

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  currency: number | null;
}

export class DropTableBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  monsterVariantId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  currency: number | null;
}
