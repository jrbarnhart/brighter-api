import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Region } from '@prisma/client';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import prismaError from 'src/validation/prismaError';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    try {
      return await this.prisma.region.create({
        data: createRegionDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Region[]> {
    return this.prisma.region.findMany({
      include: {
        rooms: true,
        combatSkills: true,
        craftingSkills: true,
        gatheringSkills: true,
      },
    });
  }

  async findOne(id: number): Promise<Region> {
    const foundRegion = await this.prisma.region.findUnique({
      where: { id },
      include: {
        rooms: true,
        combatSkills: true,
        craftingSkills: true,
        gatheringSkills: true,
      },
    });

    if (foundRegion === null) {
      throw new NotFoundException();
    }

    return foundRegion;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const regionToUpdate = await this.prisma.region.findUnique({
      where: { id },
    });

    if (!regionToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.region.update({
        where: { id },
        data: updateRegionDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Region> {
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

    try {
      return await this.prisma.region.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
