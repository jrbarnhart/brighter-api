import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { Weapon } from '@prisma/client';

@Injectable()
export class WeaponsService {
  constructor(private prisma: PrismaService) {}

  async create(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    try {
      return await this.prisma.weapon.create({
        data: createWeaponDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Weapon[]> {
    return this.prisma.weapon.findMany({
      include: {
        // Add your includes here
      },
    });
  }

  async findOne(id: number): Promise<Weapon> {
    const foundWeapon = await this.prisma.weapon.findUnique({
      where: { id },
      include: {
        // Add your includes here
      },
    });

    if (foundWeapon === null) {
      throw new NotFoundException();
    }

    return foundWeapon;
  }

  async update(id: number, updateWeaponDto: UpdateWeaponDto): Promise<Weapon> {
    const weaponToUpdate = await this.prisma.weapon.findUnique({
      where: { id },
    });

    if (!weaponToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.weapon.update({
        where: { id },
        data: updateWeaponDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Weapon> {
    const weaponToDelete = await this.prisma.weapon.findUnique({
      where: { id },
    });

    if (!weaponToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.weapon.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
