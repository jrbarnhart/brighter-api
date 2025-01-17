import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from '@prisma/client';
import prismaError from 'src/validation/prismaError';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    try {
      return await this.prisma.resource.create({
        data: createResourceDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Resource[]> {
    return this.prisma.resource.findMany({
      include: {
        rooms: true,
        skill: true,
        variants: true,
      },
    });
  }

  async findOne(id: number): Promise<Resource> {
    const foundResource = await this.prisma.resource.findUnique({
      where: { id },
      include: {
        rooms: true,
        skill: true,
        variants: true,
      },
    });

    if (foundResource === null) {
      throw new NotFoundException();
    }

    return foundResource;
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    const resourceToUpdate = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resourceToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resource.update({
        where: { id },
        data: updateResourceDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Resource> {
    const resourceToDelete = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resourceToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resource.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
