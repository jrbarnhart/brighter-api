import { Module } from '@nestjs/common';
import { QuestStepsController } from './questSteps/questSteps.controller';
import { QuestsController } from './quests.controller';
import { QuestStepsService } from './questSteps/questSteps.service';
import { QuestsService } from './quests.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuestStepsController, QuestsController],
  providers: [PrismaService, QuestStepsService, QuestsService],
})
export class QuestsModule {}
