import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { CreateQuestStepDto } from './dto/create-quest-step.dto';
import { UpdateQuestStepDto } from './dto/update-quest-step.dto';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  // Quests
  @Post()
  createQuest(@Body() createQuestDto: CreateQuestDto) {
    return this.questsService.createQuest(createQuestDto);
  }

  @Get()
  findAllQuests() {
    return this.questsService.findAllQuests();
  }

  @Get(':id')
  findOneQuest(@Param('id') id: string) {
    return this.questsService.findOneQuest(+id);
  }

  @Patch(':id')
  updateQuest(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
    return this.questsService.updateQuest(+id, updateQuestDto);
  }

  @Delete(':id')
  removeQuest(@Param('id') id: string) {
    return this.questsService.removeQuest(+id);
  }

  // Quest Steps
  @Post()
  createQuestStep(@Body() createQuestStepDto: CreateQuestStepDto) {
    return this.questsService.createQuestStep(createQuestStepDto);
  }

  @Get()
  findAllQuestsStep() {
    return this.questsService.findAllQuestSteps();
  }

  @Get(':id')
  findOneQuestStep(@Param('id') id: string) {
    return this.questsService.findOneQuestStep(+id);
  }

  @Patch(':id')
  updateQuestStep(
    @Param('id') id: string,
    @Body() updateQuestStepDto: UpdateQuestStepDto,
  ) {
    return this.questsService.updateQuestStep(+id, updateQuestStepDto);
  }

  @Delete(':id')
  removeQuestStep(@Param('id') id: string) {
    return this.questsService.removeQuestStep(+id);
  }
}
