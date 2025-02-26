import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster } from '@prisma/client';

@Injectable()
export class MonstersService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    try {
      return await this.prisma.monster.create({
        data: createMonsterDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Monster[]> {
    this.logger.log('Retrieved all monsters.');
    return this.prisma.monster.findMany({
      include: {
        rooms: true,
        skill: true,
        variants: true,
        region: true,
      },
    });
  }

  async findOne(id: number): Promise<Monster> {
    const foundMonster = await this.prisma.monster.findUnique({
      where: { id },
      include: {
        rooms: true,
        skill: true,
        variants: true,
        region: true,
      },
    });

    if (foundMonster === null) {
      throw new NotFoundException();
    }

    return foundMonster;
  }

  async update(
    id: number,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    const monsterToUpdate = await this.prisma.monster.findUnique({
      where: { id },
    });

    if (!monsterToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.monster.update({
        where: { id },
        data: updateMonsterDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Monster> {
    const monsterToDelete = await this.prisma.monster.findUnique({
      where: { id },
    });

    if (!monsterToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.monster.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
