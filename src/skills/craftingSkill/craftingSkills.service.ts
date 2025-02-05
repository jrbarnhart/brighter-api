import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateCraftingSkillDto } from './dto/create-craftingSkill.dto';
import { UpdateCraftingSkillDto } from './dto/update-craftingSkill.dto';
import { CraftingSkill } from '@prisma/client';

@Injectable()
export class CraftingSkillsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCraftingSkillDto: CreateCraftingSkillDto,
  ): Promise<CraftingSkill> {
    try {
      return await this.prisma.craftingSkill.create({
        data: createCraftingSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<CraftingSkill[]> {
    return this.prisma.craftingSkill.findMany({
      include: {
        region: true,
        requirements: true,
        rooms: true,
        consumables: true,
      },
    });
  }

  async findOne(id: number): Promise<CraftingSkill> {
    const foundCraftingSkill = await this.prisma.craftingSkill.findUnique({
      where: { id },
      include: {
        region: true,
        requirements: true,
        rooms: true,
        consumables: true,
      },
    });

    if (foundCraftingSkill === null) {
      throw new NotFoundException();
    }

    return foundCraftingSkill;
  }

  async update(
    id: number,
    updateCraftingSkillDto: UpdateCraftingSkillDto,
  ): Promise<CraftingSkill> {
    const craftingSkillToUpdate = await this.prisma.craftingSkill.findUnique({
      where: { id },
    });

    if (!craftingSkillToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.craftingSkill.update({
        where: { id },
        data: updateCraftingSkillDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<CraftingSkill> {
    const craftingSkillToDelete = await this.prisma.craftingSkill.findUnique({
      where: { id },
    });

    if (!craftingSkillToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.craftingSkill.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
