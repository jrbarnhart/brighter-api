import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateConsumableDto } from './dto/create-consumable.dto';
import { UpdateConsumableDto } from './dto/update-consumable.dto';
import { Consumable } from '@prisma/client';

@Injectable()
export class ConsumablesService {
  constructor(private prisma: PrismaService) {}

  async create(createConsumableDto: CreateConsumableDto): Promise<Consumable> {
    try {
      return await this.prisma.consumable.create({
        data: createConsumableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Consumable[]> {
    return this.prisma.consumable.findMany({
      include: {
        variants: true,
      },
    });
  }

  async findOne(id: number): Promise<Consumable> {
    const foundConsumable = await this.prisma.consumable.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });

    if (foundConsumable === null) {
      throw new NotFoundException();
    }

    return foundConsumable;
  }

  async update(
    id: number,
    updateConsumableDto: UpdateConsumableDto,
  ): Promise<Consumable> {
    const consumableToUpdate = await this.prisma.consumable.findUnique({
      where: { id },
    });

    if (!consumableToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumable.update({
        where: { id },
        data: updateConsumableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Consumable> {
    const consumableToDelete = await this.prisma.consumable.findUnique({
      where: { id },
    });

    if (!consumableToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumable.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
