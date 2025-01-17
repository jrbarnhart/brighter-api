
import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateArmorVariantDto } from './dto/create-armorVariant.dto';
import { UpdateArmorVariantDto } from './dto/update-armorVariant.dto';
import { ArmorVariant } from '@prisma/client';

@Injectable()
export class ArmorVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(createArmorVariantDto: CreateArmorVariantDto): Promise<ArmorVariant> {
    try {
      return await this.prisma.armorVariant.create({
        data: createArmorVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<ArmorVariant[]> {
    return this.prisma.armorVariant.findMany({
      include: {
        // Add your includes here
      },
    });
  }

  async findOne(id: number): Promise<ArmorVariant> {
    const foundArmorVariant = await this.prisma.armorVariant.findUnique({
      where: { id },
      include: {
        // Add your includes here
      },
    });

    if (foundArmorVariant === null) {
      throw new NotFoundException();
    }

    return foundArmorVariant;
  }

  async update(id: number, updateArmorVariantDto: UpdateArmorVariantDto): Promise<ArmorVariant> {
    const armorVariantToUpdate = await this.prisma.armorVariant.findUnique({
      where: { id },
    });

    if (!armorVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armorVariant.update({
        where: { id },
        data: updateArmorVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<ArmorVariant> {
    const armorVariantToDelete = await this.prisma.armorVariant.findUnique({
      where: { id },
    });

    if (!armorVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armorVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}