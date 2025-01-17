import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResourceVariantDto } from './dto/create-resourceVariant.dto';
import { ResourceVariant } from '@prisma/client';
import prismaError from 'src/validation/prismaError';
import { UpdateResourceVariantDto } from './dto/update-resourceVariant.dto';

@Injectable()
export class ResourceVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createResourceVariantDto: CreateResourceVariantDto,
  ): Promise<ResourceVariant> {
    try {
      return await this.prisma.resourceVariant.create({
        data: createResourceVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<ResourceVariant[]> {
    return this.prisma.resourceVariant.findMany({
      include: {
        dropTables: true,
        inRecipes: true,
        requirement: true,
        resource: true,
        vendors: true,
      },
    });
  }

  async findOne(id: number): Promise<ResourceVariant> {
    const foundResourceVariant = await this.prisma.resourceVariant.findUnique({
      where: { id },
      include: {
        dropTables: true,
        inRecipes: true,
        requirement: true,
        resource: true,
        vendors: true,
      },
    });

    if (foundResourceVariant === null) {
      throw new NotFoundException();
    }

    return foundResourceVariant;
  }

  async update(
    id: number,
    updateResourceVariantDto: UpdateResourceVariantDto,
  ): Promise<ResourceVariant> {
    const resourceVariantToUpdate =
      await this.prisma.resourceVariant.findUnique({
        where: { id },
      });

    if (!resourceVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resourceVariant.update({
        where: { id },
        data: updateResourceVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<ResourceVariant> {
    const resourceVariantToDelete =
      await this.prisma.resourceVariant.findUnique({
        where: { id },
      });

    if (!resourceVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resourceVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
