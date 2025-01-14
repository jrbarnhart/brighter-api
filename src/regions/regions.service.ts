import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Region } from '@prisma/client';
import { CreateRegionDto } from './dto/create-region.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto): Promise<Region> {
    try {
      return await this.prisma.region.create({
        data: {
          name: data.name,
          rooms: { connect: data.roomIds.map((roomId) => ({ id: roomId })) },
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

  findAll() {
    return `This action returns all regions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, data: Prisma.RegionUpdateInput): Promise<Region> {
    return this.prisma.region.update({ where: { id }, data });
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
