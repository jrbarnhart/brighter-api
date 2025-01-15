import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule {}
