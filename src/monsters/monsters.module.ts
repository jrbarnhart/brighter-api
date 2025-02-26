import { Logger, Module } from '@nestjs/common';
import { MonsterVariantsController } from './monsterVariants/monsterVariants.controller';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';
import { MonsterVariantsService } from './monsterVariants/monsterVariants.service';
import { PrismaService } from 'src/prisma.service';
import { DropTablesController } from './dropTables/dropTables.controller';
import { DropTablesService } from './dropTables/dropTables.service';

@Module({
  controllers: [
    DropTablesController,
    MonsterVariantsController,
    MonstersController,
  ],
  providers: [
    PrismaService,
    DropTablesService,
    MonsterVariantsService,
    MonstersService,
    Logger,
  ],
})
export class MonstersModule {}
