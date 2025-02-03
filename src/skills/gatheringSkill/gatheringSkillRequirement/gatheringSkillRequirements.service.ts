import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateGatheringSkillRequirementDto } from './dto/create-gatheringSkillRequirement.dto';
import { UpdateGatheringSkillRequirementDto } from './dto/update-gatheringSkillRequirement.dto';
import { GatheringSkillRequirement } from '@prisma/client';

@Injectable()
export class GatheringSkillRequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createGatheringSkillRequirementDto: CreateGatheringSkillRequirementDto,
  ): Promise<GatheringSkillRequirement> {
    try {
      return await this.prisma.gatheringSkillRequirement.create({
        data: createGatheringSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<GatheringSkillRequirement[]> {
    return this.prisma.gatheringSkillRequirement.findMany({
      include: {
        resourceVariant: { include: { resource: true } },
        skill: true,
      },
    });
  }

  async findOne(id: number): Promise<GatheringSkillRequirement> {
    const foundGatheringSkillRequirement =
      await this.prisma.gatheringSkillRequirement.findUnique({
        where: { id },
        include: {
          resourceVariant: { include: { resource: true } },
          skill: true,
        },
      });

    if (foundGatheringSkillRequirement === null) {
      throw new NotFoundException();
    }

    return foundGatheringSkillRequirement;
  }

  async update(
    id: number,
    updateGatheringSkillRequirementDto: UpdateGatheringSkillRequirementDto,
  ): Promise<GatheringSkillRequirement> {
    const gatheringSkillRequirementToUpdate =
      await this.prisma.gatheringSkillRequirement.findUnique({
        where: { id },
      });

    if (!gatheringSkillRequirementToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.gatheringSkillRequirement.update({
        where: { id },
        data: updateGatheringSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<GatheringSkillRequirement> {
    const gatheringSkillRequirementToDelete =
      await this.prisma.gatheringSkillRequirement.findUnique({
        where: { id },
      });

    if (!gatheringSkillRequirementToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.gatheringSkillRequirement.delete({
        where: { id },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
