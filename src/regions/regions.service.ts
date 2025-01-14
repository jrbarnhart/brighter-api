import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Region } from '@prisma/client';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.RegionCreateInput): Promise<Region> {
    return this.prisma.region.create({ data });
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
