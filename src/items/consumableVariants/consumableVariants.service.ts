import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateConsumableVariantDto } from './dto/create-consumableVariant.dto';
import { ConsumableVariant } from '@prisma/client';
import prismaError from 'src/validation/prismaError';
import { UpdateConsumableVariantDto } from './dto/update-consumableVariant.dto';

@Injectable()
export class ConsumableVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createConsumableVariantDto: CreateConsumableVariantDto,
  ): Promise<ConsumableVariant> {
    try {
      return await this.prisma.consumableVariant.create({
        data: createConsumableVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<ConsumableVariant[]> {
    return this.prisma.consumableVariant.findMany({
      include: {
        consumable: true,
        dropTables: true,
        recipe: true,
        vendors: true,
      },
    });
  }

  async findOne(id: number): Promise<ConsumableVariant> {
    const foundConsumableVariant =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
        include: {
          consumable: true,
          dropTables: true,
          recipe: true,
          vendors: true,
        },
      });

    if (foundConsumableVariant === null) {
      throw new NotFoundException();
    }

    return foundConsumableVariant;
  }

  async update(
    id: number,
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ): Promise<ConsumableVariant> {
    const consumableVariantToUpdate =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
      });

    if (!consumableVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumableVariant.update({
        where: { id },
        data: updateConsumableVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<ConsumableVariant> {
    const consumableVariantToDelete =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
      });

    if (!consumableVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumableVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
