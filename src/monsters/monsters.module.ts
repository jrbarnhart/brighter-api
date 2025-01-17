import { Module } from '@nestjs/common';
import { MonsterVariantsController } from './monsterVariants/monsterVariants.controller';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';
import { MonsterVariantsService } from './monsterVariants/monsterVariants.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MonsterVariantsController, MonstersController],
  providers: [PrismaService, MonsterVariantsService, MonstersService],
})
export class MonstersModule {}
