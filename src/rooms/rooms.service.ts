import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';
import { Room } from '@prisma/client';
import prismaError from 'src/validation/prismaError';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      const {
        name,
        obelisk,
        portal,
        regionId,
        banks,
        craftingSkillIds,
        monsterIds,
        npcIds,
        questStepIds,
        resourceIds,
      } = createRoomDto;
      return await this.prisma.room.create({
        data: {
          name,
          regionId,
          obelisk,
          portal,
          banks,
          craftingSkills: craftingSkillIds
            ? { connect: craftingSkillIds.map((id) => ({ id })) }
            : undefined,
          monsters: monsterIds
            ? { connect: monsterIds.map((id) => ({ id })) }
            : undefined,
          npcs: npcIds ? { connect: npcIds.map((id) => ({ id })) } : undefined,
          questSteps: questStepIds
            ? { connect: questStepIds.map((id) => ({ id })) }
            : undefined,
          resources: resourceIds
            ? { connect: resourceIds.map((id) => ({ id })) }
            : undefined,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({
      include: {
        craftingSkills: true,
        monsters: true,
        npcs: true,
        questSteps: true,
        region: true,
        resources: true,
      },
    });
  }

  async findOne(id: number): Promise<Room> {
    const foundRoom = await this.prisma.room.findUnique({
      where: { id },
      include: {
        craftingSkills: true,
        monsters: true,
        npcs: true,
        questSteps: true,
        region: true,
        resources: true,
      },
    });

    if (foundRoom === null) {
      throw new NotFoundException();
    }

    return foundRoom;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const roomToUpdate = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!roomToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      const {
        name,
        obelisk,
        portal,
        regionId,
        banks,
        craftingSkillIds,
        monsterIds,
        npcIds,
        questStepIds,
        resourceIds,
        removeCraftingSkillIds,
        removeMonsterIds,
        removeNpcIds,
        removeQuestStepIds,
        removeResourceIds,
      } = updateRoomDto;
      return await this.prisma.room.update({
        where: { id },
        data: {
          name,
          regionId,
          obelisk,
          portal,
          banks,
          craftingSkills:
            craftingSkillIds || removeCraftingSkillIds
              ? {
                  connect: craftingSkillIds?.map((id) => ({ id })),
                  disconnect: removeCraftingSkillIds?.map((id) => ({ id })),
                }
              : undefined,
          monsters:
            monsterIds || removeMonsterIds
              ? {
                  connect: monsterIds?.map((id) => ({ id })),
                  disconnect: removeMonsterIds?.map((id) => ({ id })),
                }
              : undefined,
          npcs:
            npcIds || removeNpcIds
              ? {
                  connect: npcIds?.map((id) => ({ id })),
                  disconnect: removeNpcIds?.map((id) => ({ id })),
                }
              : undefined,
          questSteps:
            questStepIds || removeQuestStepIds
              ? {
                  connect: questStepIds?.map((id) => ({ id })),
                  disconnect: removeQuestStepIds?.map((id) => ({ id })),
                }
              : undefined,
          resources:
            resourceIds || removeResourceIds
              ? {
                  connect: resourceIds?.map((id) => ({ id })),
                  disconnect: removeResourceIds?.map((id) => ({ id })),
                }
              : undefined,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Room> {
    const roomToDelete = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!roomToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.room.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
