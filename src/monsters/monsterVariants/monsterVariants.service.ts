import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateMonsterVariantDto } from './dto/create-monsterVariant.dto';
import { UpdateMonsterVariantDto } from './dto/update-monsterVariant.dto';
import { MonsterVariant } from '@prisma/client';

@Injectable()
export class MonsterVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMonsterVariantDto: CreateMonsterVariantDto,
  ): Promise<MonsterVariant> {
    try {
      return await this.prisma.monsterVariant.create({
        data: createMonsterVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<MonsterVariant[]> {
    return this.prisma.monsterVariant.findMany({
      include: {
        dropTable: true,
        monster: true,
        requirement: true,
      },
    });
  }

  async findOne(id: number): Promise<MonsterVariant> {
    const foundMonsterVariant = await this.prisma.monsterVariant.findUnique({
      where: { id },
      include: {
        dropTable: true,
        monster: true,
        requirement: true,
      },
    });

    if (foundMonsterVariant === null) {
      throw new NotFoundException();
    }

    return foundMonsterVariant;
  }

  async update(
    id: number,
    updateMonsterVariantDto: UpdateMonsterVariantDto,
  ): Promise<MonsterVariant> {
    const monsterVariantToUpdate = await this.prisma.monsterVariant.findUnique({
      where: { id },
    });

    if (!monsterVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.monsterVariant.update({
        where: { id },
        data: updateMonsterVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<MonsterVariant> {
    const monsterVariantToDelete = await this.prisma.monsterVariant.findUnique({
      where: { id },
    });

    if (!monsterVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.monsterVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
