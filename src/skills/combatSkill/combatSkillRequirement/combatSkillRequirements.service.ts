import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateCombatSkillRequirementDto } from './dto/create-combatSkillRequirement.dto';
import { UpdateCombatSkillRequirementDto } from './dto/update-combatSkillRequirement.dto';
import { CombatSkillRequirement } from '@prisma/client';

@Injectable()
export class CombatSkillRequirementsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCombatSkillRequirementDto: CreateCombatSkillRequirementDto,
  ): Promise<CombatSkillRequirement> {
    try {
      return await this.prisma.combatSkillRequirement.create({
        data: createCombatSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<CombatSkillRequirement[]> {
    return this.prisma.combatSkillRequirement.findMany({
      include: {
        monsterVariant: true,
        skill: true,
      },
    });
  }

  async findOne(id: number): Promise<CombatSkillRequirement> {
    const foundCombatSkillRequirement =
      await this.prisma.combatSkillRequirement.findUnique({
        where: { id },
        include: {
          monsterVariant: true,
          skill: true,
        },
      });

    if (foundCombatSkillRequirement === null) {
      throw new NotFoundException();
    }

    return foundCombatSkillRequirement;
  }

  async update(
    id: number,
    updateCombatSkillRequirementDto: UpdateCombatSkillRequirementDto,
  ): Promise<CombatSkillRequirement> {
    const combatSkillRequirementToUpdate =
      await this.prisma.combatSkillRequirement.findUnique({
        where: { id },
      });

    if (!combatSkillRequirementToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.combatSkillRequirement.update({
        where: { id },
        data: updateCombatSkillRequirementDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<CombatSkillRequirement> {
    const combatSkillRequirementToDelete =
      await this.prisma.combatSkillRequirement.findUnique({
        where: { id },
      });

    if (!combatSkillRequirementToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.combatSkillRequirement.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
