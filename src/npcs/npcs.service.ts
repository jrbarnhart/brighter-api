import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';
import { NPC } from '@prisma/client';

@Injectable()
export class NpcsService {
  constructor(private prisma: PrismaService) {}

  async create(createNpcDto: CreateNpcDto): Promise<NPC> {
    try {
      return await this.prisma.nPC.create({
        data: createNpcDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<NPC[]> {
    return this.prisma.nPC.findMany({
      include: {
        questSteps: { include: { quest: true } },
        rooms: true,
        vendor: true,
      },
    });
  }

  async findOne(id: number): Promise<NPC> {
    const foundNpc = await this.prisma.nPC.findUnique({
      where: { id },
      include: {
        questSteps: { include: { quest: true } },
        rooms: true,
        vendor: true,
      },
    });

    if (foundNpc === null) {
      throw new NotFoundException();
    }

    return foundNpc;
  }

  async update(id: number, updateNpcDto: UpdateNpcDto): Promise<NPC> {
    const npcToUpdate = await this.prisma.nPC.findUnique({
      where: { id },
    });

    if (!npcToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.nPC.update({
        where: { id },
        data: updateNpcDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<NPC> {
    const npcToDelete = await this.prisma.nPC.findUnique({
      where: { id },
    });

    if (!npcToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.nPC.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
