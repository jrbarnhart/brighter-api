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
      return await this.prisma.room.create({
        data: createRoomDto,
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
      return await this.prisma.room.update({
        where: { id },
        data: updateRoomDto,
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
