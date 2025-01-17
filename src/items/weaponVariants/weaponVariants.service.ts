import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateWeaponVariantDto } from './dto/create-weaponVariant.dto';
import { UpdateWeaponVariantDto } from './dto/update-weaponVariant.dto';
import { WeaponVariant } from '@prisma/client';

@Injectable()
export class WeaponVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createWeaponVariantDto: CreateWeaponVariantDto,
  ): Promise<WeaponVariant> {
    try {
      return await this.prisma.weaponVariant.create({
        data: createWeaponVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<WeaponVariant[]> {
    return this.prisma.weaponVariant.findMany({
      include: {
        dropTables: true,
        recipe: true,
        vendors: true,
        weapon: true,
      },
    });
  }

  async findOne(id: number): Promise<WeaponVariant> {
    const foundWeaponVariant = await this.prisma.weaponVariant.findUnique({
      where: { id },
      include: {
        dropTables: true,
        recipe: true,
        vendors: true,
        weapon: true,
      },
    });

    if (foundWeaponVariant === null) {
      throw new NotFoundException();
    }

    return foundWeaponVariant;
  }

  async update(
    id: number,
    updateWeaponVariantDto: UpdateWeaponVariantDto,
  ): Promise<WeaponVariant> {
    const weaponVariantToUpdate = await this.prisma.weaponVariant.findUnique({
      where: { id },
    });

    if (!weaponVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.weaponVariant.update({
        where: { id },
        data: updateWeaponVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<WeaponVariant> {
    const weaponVariantToDelete = await this.prisma.weaponVariant.findUnique({
      where: { id },
    });

    if (!weaponVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.weaponVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
