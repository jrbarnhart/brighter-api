import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma.service';
import { ResourcesController } from './resources/resources.controller';
import { ResourcesService } from './resources/resources.service';
import { ResourceVariantsController } from './resourceVariants/resourceVariants.controller';
import { ResourceVariantsService } from './resourceVariants/resourceVariants.service';
import { ConsumableVariantsController } from './consumableVariants/consumableVariants.controller';
import { ConsumableVariantsService } from './consumableVariants/consumableVariants.service';
import { ConsumablesController } from './consumables/consumables.controller';
import { ConsumablesService } from './consumables/consumables.service';

@Module({
  controllers: [
    ItemsController,
    ResourceVariantsController,
    ResourcesController,
    ConsumableVariantsController,
    ConsumablesController,
  ],
  providers: [
    PrismaService,
    ItemsService,
    ResourceVariantsService,
    ResourcesService,
    ConsumableVariantsService,
    ConsumablesService,
  ],
})
export class ItemsModule {}
