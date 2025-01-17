import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma.service';
import { ResourcesController } from './resources/resources.controller';
import { ResourcesService } from './resources/resources.service';
import { ResourceVariantsController } from './resourceVariants/resourceVariants.controller';
import { ResourceVariantsService } from './resourceVariants/resourceVariants.service';

@Module({
  controllers: [
    ItemsController,
    ResourceVariantsController,
    ResourcesController,
  ],
  providers: [
    ItemsService,
    ResourceVariantsService,
    ResourcesService,
    PrismaService,
  ],
})
export class ItemsModule {}
