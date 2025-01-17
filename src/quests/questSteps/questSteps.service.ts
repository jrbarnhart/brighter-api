import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestStepDto } from './dto/create-questStep.dto';
import { UpdateQuestStepDto } from './dto/update-questStep.dto';
import { QuestStep } from '@prisma/client';

@Injectable()
export class QuestStepsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestStepDto: CreateQuestStepDto): Promise<QuestStep> {
    try {
      return await this.prisma.questStep.create({
        data: createQuestStepDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<QuestStep[]> {
    return this.prisma.questStep.findMany({
      include: {
        npc: true,
        quest: true,
        room: true,
      },
    });
  }

  async findOne(id: number): Promise<QuestStep> {
    const foundQuestStep = await this.prisma.questStep.findUnique({
      where: { id },
      include: {
        npc: true,
        quest: true,
        room: true,
      },
    });

    if (foundQuestStep === null) {
      throw new NotFoundException();
    }

    return foundQuestStep;
  }

  async update(
    id: number,
    updateQuestStepDto: UpdateQuestStepDto,
  ): Promise<QuestStep> {
    const questStepToUpdate = await this.prisma.questStep.findUnique({
      where: { id },
    });

    if (!questStepToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.questStep.update({
        where: { id },
        data: updateQuestStepDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<QuestStep> {
    const questStepToDelete = await this.prisma.questStep.findUnique({
      where: { id },
    });

    if (!questStepToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.questStep.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
