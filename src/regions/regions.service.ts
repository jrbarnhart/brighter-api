import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Region } from '@prisma/client';
import { CreateRegionDto } from './dto/create-region.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto): Promise<Region> {
    try {
      return await this.prisma.region.create({
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      // Handle specific Prisma error for unique constraints
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Validation failed');
      }

      // For any other error that we didn't explicitly handle
      throw new BadRequestException('An unknown error occured');
    }
  }

  findAll(): Promise<Region[]> {
    return this.prisma.region.findMany({ include: { rooms: true } });
  }

  async findOne(id: number): Promise<Region> {
    const foundRegion = await this.prisma.region.findUnique({
      where: { id },
      include: { rooms: true },
    });

    if (foundRegion === null) {
      throw new NotFoundException();
    }

    return foundRegion;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    try {
      return await this.prisma.region.update({
        where: { id },
        data: {
          name: updateRegionDto.name,
        },
      });
    } catch (error) {
      // Handle specific Prisma error for unique constraints
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Validation failed', error.message);
      }

      // For any other error that we didn't explicitly handle
      throw new BadRequestException('An unknown error occured');
    }
  }

  async remove(id: number) {
    try {
      const regionToDelete = await this.prisma.region.findUnique({
        where: { id },
        include: { rooms: true },
      });

      if (!regionToDelete) {
        throw new NotFoundException('Record not found');
      }

      if (regionToDelete.rooms.length > 0) {
        throw new BadRequestException(
          'Regions that have rooms may not be deleted',
        );
      }

      return this.prisma.region.delete({ where: { id } });
    } catch (error) {
      // Handle specific Prisma error for unique constraints
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Validation failed', error.message);
      }

      // For any other error that we didn't explicitly handle
      throw new BadRequestException('An unknown error occured');
    }
  }
}
