export const serviceTemplate = `
import { Injectable, NotFoundException } from '@nestjs/common';
import { Create__PASCAL__Dto } from './dto/create-__CAMEL__.dto';
import { Update__PASCAL__Dto } from './dto/update-__CAMEL__.dto';
import { PrismaService } from 'src/prisma.service';
import { __PASCAL__ } from '@prisma/client';
import prismaError from 'src/validation/prismaError';

@Injectable()
export class __PASCAL_PLURAL__Service {
  constructor(private prisma: PrismaService) {}

  async create(create__PASCAL__Dto: Create__PASCAL__Dto): Promise<__PASCAL__> {
    try {
      return await this.prisma.__CAMEL__.create({
        data: create__PASCAL__Dto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<__PASCAL__[]> {
    return this.prisma.__CAMEL__.findMany({
      include: {
        // Add your includes here
      },
    });
  }

  async findOne(id: number): Promise<__PASCAL__> {
    const found__PASCAL__ = await this.prisma.__CAMEL__.findUnique({
      where: { id },
      include: {
        // Add your includes here
      },
    });

    if (found__PASCAL__ === null) {
      throw new NotFoundException();
    }

    return found__PASCAL__;
  }

  async update(id: number, update__PASCAL__Dto: Update__PASCAL__Dto): Promise<__PASCAL__> {
    const __CAMEL__ToUpdate = await this.prisma.__CAMEL__.findUnique({
      where: { id },
    });

    if (!__CAMEL__ToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.__CAMEL__.update({
        where: { id },
        data: update__PASCAL__Dto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<__PASCAL__> {
    const __CAMEL__ToDelete = await this.prisma.__CAMEL__.findUnique({
      where: { id },
    });

    if (!__CAMEL__ToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.__CAMEL__.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}`;
