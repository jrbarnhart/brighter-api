import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateCombatSkillDto } from './dto/create-combatSkill.dto';
import { UpdateCombatSkillDto } from './dto/update-combatSkill.dto';
import { CombatSkill } from '@prisma/client';

@Injectable()
export class CombatSkillsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCombatSkillDto: CreateCombatSkillDto,
  ): Promise<CombatSkill> {
    try {
      return await this.prisma.combatSkill.create({
        data: createCombatSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<CombatSkill[]> {
    return this.prisma.combatSkill.findMany({
      include: {
        monsters: true,
        region: true,
        requirements: true,
      },
    });
  }

  async findOne(id: number): Promise<CombatSkill> {
    const foundCombatSkill = await this.prisma.combatSkill.findUnique({
      where: { id },
      include: {
        monsters: true,
        region: true,
        requirements: true,
      },
    });

    if (foundCombatSkill === null) {
      throw new NotFoundException();
    }

    return foundCombatSkill;
  }

  async update(
    id: number,
    updateCombatSkillDto: UpdateCombatSkillDto,
  ): Promise<CombatSkill> {
    const combatSkillToUpdate = await this.prisma.combatSkill.findUnique({
      where: { id },
    });

    if (!combatSkillToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.combatSkill.update({
        where: { id },
        data: updateCombatSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<CombatSkill> {
    const combatSkillToDelete = await this.prisma.combatSkill.findUnique({
      where: { id },
    });

    if (!combatSkillToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.combatSkill.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
