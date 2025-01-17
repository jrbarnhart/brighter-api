
import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { Armor } from '@prisma/client';

@Injectable()
export class ArmorsService {
  constructor(private prisma: PrismaService) {}

  async create(createArmorDto: CreateArmorDto): Promise<Armor> {
    try {
      return await this.prisma.armor.create({
        data: createArmorDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Armor[]> {
    return this.prisma.armor.findMany({
      include: {
        // Add your includes here
      },
    });
  }

  async findOne(id: number): Promise<Armor> {
    const foundArmor = await this.prisma.armor.findUnique({
      where: { id },
      include: {
        // Add your includes here
      },
    });

    if (foundArmor === null) {
      throw new NotFoundException();
    }

    return foundArmor;
  }

  async update(id: number, updateArmorDto: UpdateArmorDto): Promise<Armor> {
    const armorToUpdate = await this.prisma.armor.findUnique({
      where: { id },
    });

    if (!armorToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armor.update({
        where: { id },
        data: updateArmorDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Armor> {
    const armorToDelete = await this.prisma.armor.findUnique({
      where: { id },
    });

    if (!armorToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armor.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}