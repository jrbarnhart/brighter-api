import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateMiscItemDto } from './dto/create-miscItem.dto';
import { UpdateMiscItemDto } from './dto/update-miscItem.dto';
import { MiscItem } from '@prisma/client';

@Injectable()
export class MiscItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createMiscItemDto: CreateMiscItemDto): Promise<MiscItem> {
    try {
      return await this.prisma.miscItem.create({
        data: createMiscItemDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<MiscItem[]> {
    return this.prisma.miscItem.findMany({
      include: {
        inRecipes: true,
        vendors: true,
        dropTables: true,
      },
    });
  }

  async findOne(id: number): Promise<MiscItem> {
    const foundMiscItem = await this.prisma.miscItem.findUnique({
      where: { id },
      include: {
        inRecipes: true,
        vendors: true,
        dropTables: true,
      },
    });

    if (foundMiscItem === null) {
      throw new NotFoundException();
    }

    return foundMiscItem;
  }

  async update(
    id: number,
    updateMiscItemDto: UpdateMiscItemDto,
  ): Promise<MiscItem> {
    const miscItemToUpdate = await this.prisma.miscItem.findUnique({
      where: { id },
    });

    if (!miscItemToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.miscItem.update({
        where: { id },
        data: updateMiscItemDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<MiscItem> {
    const miscItemToDelete = await this.prisma.miscItem.findUnique({
      where: { id },
    });

    if (!miscItemToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.miscItem.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
