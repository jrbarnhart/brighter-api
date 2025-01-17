import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateCraftingSkillRequirementDto } from './dto/create-craftingSkillRequirement.dto';
import { UpdateCraftingSkillRequirementDto } from './dto/update-craftingSkillRequirement.dto';
import { CraftingSkillRequirement } from '@prisma/client';

@Injectable()
export class CraftingSkillRequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCraftingSkillRequirementDto: CreateCraftingSkillRequirementDto,
  ): Promise<CraftingSkillRequirement> {
    try {
      return await this.prisma.craftingSkillRequirement.create({
        data: createCraftingSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<CraftingSkillRequirement[]> {
    return this.prisma.craftingSkillRequirement.findMany({
      include: {
        recipe: true,
        skill: true,
      },
    });
  }

  async findOne(id: number): Promise<CraftingSkillRequirement> {
    const foundCraftingSkillRequirement =
      await this.prisma.craftingSkillRequirement.findUnique({
        where: { id },
        include: {
          recipe: true,
          skill: true,
        },
      });

    if (foundCraftingSkillRequirement === null) {
      throw new NotFoundException();
    }

    return foundCraftingSkillRequirement;
  }

  async update(
    id: number,
    updateCraftingSkillRequirementDto: UpdateCraftingSkillRequirementDto,
  ): Promise<CraftingSkillRequirement> {
    const craftingSkillRequirementToUpdate =
      await this.prisma.craftingSkillRequirement.findUnique({
        where: { id },
      });

    if (!craftingSkillRequirementToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.craftingSkillRequirement.update({
        where: { id },
        data: updateCraftingSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<CraftingSkillRequirement> {
    const craftingSkillRequirementToDelete =
      await this.prisma.craftingSkillRequirement.findUnique({
        where: { id },
      });

    if (!craftingSkillRequirementToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.craftingSkillRequirement.delete({
        where: { id },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
