import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Quest } from '@prisma/client';

@Injectable()
export class QuestsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestDto: CreateQuestDto): Promise<Quest> {
    try {
      return await this.prisma.quest.create({
        data: createQuestDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Quest[]> {
    return this.prisma.quest.findMany({
      include: {
        steps: true,
      },
    });
  }

  async findOne(id: number): Promise<Quest> {
    const foundQuest = await this.prisma.quest.findUnique({
      where: { id },
      include: {
        steps: true,
      },
    });

    if (foundQuest === null) {
      throw new NotFoundException();
    }

    return foundQuest;
  }

  async update(id: number, updateQuestDto: UpdateQuestDto): Promise<Quest> {
    const questToUpdate = await this.prisma.quest.findUnique({
      where: { id },
    });

    if (!questToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.quest.update({
        where: { id },
        data: updateQuestDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Quest> {
    const questToDelete = await this.prisma.quest.findUnique({
      where: { id },
    });

    if (!questToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.quest.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
