import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma.service';
import { ResourcesController } from './resources/resources.controller';
import { ResourcesService } from './resources/resources.service';
import { ResourceVariantsController } from './resources/resourceVariants/resourceVariants.controller';
import { ResourceVariantsService } from './resources/resourceVariants/resourceVariants.service';
import { ConsumableVariantsController } from './consumables/consumableVariants/consumableVariants.controller';
import { ConsumableVariantsService } from './consumables/consumableVariants/consumableVariants.service';
import { ConsumablesController } from './consumables/consumables.controller';
import { ConsumablesService } from './consumables/consumables.service';
import { WeaponVariantsController } from './weapons/weaponVariants/weaponVariants.controller';
import { WeaponsController } from './weapons/weapons.controller';
import { ArmorVariantsController } from './armors/armorVariants/armorVariants.controller';
import { ArmorsController } from './armors/armors.controller';
import { MiscItemsController } from './miscItems/miscItems.controller';
import { WeaponVariantsService } from './weapons/weaponVariants/weaponVariants.service';
import { WeaponsService } from './weapons/weapons.service';
import { ArmorVariantsService } from './armors/armorVariants/armorVariants.service';
import { ArmorsService } from './armors/armors.service';
import { MiscItemsService } from './miscItems/miscItems.service';

@Module({
  controllers: [
    ItemsController,
    ResourceVariantsController,
    ResourcesController,
    ConsumableVariantsController,
    ConsumablesController,
    WeaponVariantsController,
    WeaponsController,
    ArmorVariantsController,
    ArmorsController,
    MiscItemsController,
  ],
  providers: [
    PrismaService,
    ItemsService,
    ResourceVariantsService,
    ResourcesService,
    ConsumableVariantsService,
    ConsumablesService,
    WeaponVariantsService,
    WeaponsService,
    ArmorVariantsService,
    ArmorsService,
    MiscItemsService,
  ],
})
export class ItemsModule {}
