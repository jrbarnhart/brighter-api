/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { CreateQuestStepDto } from './dto/create-quest-step.dto';
import { UpdateQuestStepDto } from './dto/update-quest-step.dto';

@Injectable()
export class QuestsService {
  // Quests
  createQuest(createQuestDto: CreateQuestDto) {
    return 'This action adds a new quest';
  }

  findAllQuests() {
    return `This action returns all quests`;
  }

  findOneQuest(id: number) {
    return `This action returns a #${id} quest`;
  }

  updateQuest(id: number, updateQuestDto: UpdateQuestDto) {
    return `This action updates a #${id} quest`;
  }

  removeQuest(id: number) {
    return `This action removes a #${id} quest`;
  }

  // Quest Steps
  createQuestStep(createQuestStepDto: CreateQuestStepDto) {
    return 'This action adds a new quest step';
  }

  findAllQuestSteps() {
    return `This action returns all quest steps`;
  }

  findOneQuestStep(id: number) {
    return `This action returns a #${id} quest step`;
  }

  updateQuestStep(id: number, updateQuestStepDto: UpdateQuestStepDto) {
    return `This action updates a #${id} quest step`;
  }

  removeQuestStep(id: number) {
    return `This action removes a #${id} quest step`;
  }
}
