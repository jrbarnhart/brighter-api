import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateGatheringSkillDto } from './dto/create-gatheringSkill.dto';
import { UpdateGatheringSkillDto } from './dto/update-gatheringSkill.dto';
import { GatheringSkill } from '@prisma/client';

@Injectable()
export class GatheringSkillsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createGatheringSkillDto: CreateGatheringSkillDto,
  ): Promise<GatheringSkill> {
    try {
      return await this.prisma.gatheringSkill.create({
        data: createGatheringSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<GatheringSkill[]> {
    return this.prisma.gatheringSkill.findMany({
      include: {
        region: true,
        requirements: true,
        resources: true,
      },
    });
  }

  async findOne(id: number): Promise<GatheringSkill> {
    const foundGatheringSkill = await this.prisma.gatheringSkill.findUnique({
      where: { id },
      include: {
        region: true,
        requirements: true,
        resources: true,
      },
    });

    if (foundGatheringSkill === null) {
      throw new NotFoundException();
    }

    return foundGatheringSkill;
  }

  async update(
    id: number,
    updateGatheringSkillDto: UpdateGatheringSkillDto,
  ): Promise<GatheringSkill> {
    const gatheringSkillToUpdate = await this.prisma.gatheringSkill.findUnique({
      where: { id },
    });

    if (!gatheringSkillToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.gatheringSkill.update({
        where: { id },
        data: updateGatheringSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<GatheringSkill> {
    const gatheringSkillToDelete = await this.prisma.gatheringSkill.findUnique({
      where: { id },
    });

    if (!gatheringSkillToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.gatheringSkill.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
