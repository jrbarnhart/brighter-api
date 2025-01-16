import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';
import { CreateConsumableDto } from './dto/consumable/create-consumable.dto';
import { UpdateConsumableDto } from './dto/consumable/update-consumable.dto';
import { CreateConsumableVariantDto } from './dto/consumable/create-consumable-variant.dto';
import { UpdateConsumableVariantDto } from './dto/consumable/update-consumable-variant.dto';
import { CreateWeaponDto } from './dto/weapon/create-weapon.dto';
import { UpdateWeaponDto } from './dto/weapon/update-weapon.dto';
import { CreateWeaponVariantDto } from './dto/weapon/create-weapon-variant.dto';
import { UpdateWeaponVariantDto } from './dto/weapon/update-weapon-variant.dto';
import { CreateArmorDto } from './dto/armor/create-armor.dto';
import { UpdateArmorDto } from './dto/armor/update-armor.dto';
import { CreateArmorVariantDto } from './dto/armor/create-armor-variant.dto';
import { UpdateArmorVariantDto } from './dto/armor/update-armor-variant.dto';
import { CreateMiscItemDto } from './dto/miscItem/create-misc-item.dto';
import { UpdateMiscItemDto } from './dto/miscItem/update-misc-item.dto';
import { PrismaService } from 'src/prisma.service';
import prismaError from 'src/validation/prismaError';
import { ConsumableVariant, Resource, ResourceVariant } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Resource Variants
  async createResourceVariant(
    createResourceVariantDto: CreateResourceVariantDto,
  ): Promise<ResourceVariant> {
    try {
      return await this.prisma.resourceVariant.create({
        data: createResourceVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllResourceVariants(): Promise<ResourceVariant[]> {
    return this.prisma.resourceVariant.findMany({
      include: {
        resource: true,
        dropTables: true,
        inRecipes: true,
        requirement: true,
        vendors: true,
      },
    });
  }

  async findOneResourceVariant(id: number): Promise<ResourceVariant> {
    const foundResourceVariant = await this.prisma.resourceVariant.findUnique({
      where: { id },
      include: {
        resource: true,
        dropTables: true,
        inRecipes: true,
        requirement: true,
        vendors: true,
      },
    });

    if (foundResourceVariant === null) {
      throw new NotFoundException();
    }

    return foundResourceVariant;
  }

  async updateResourceVariant(
    id: number,
    updateResourceVariantDto: UpdateResourceVariantDto,
  ): Promise<ResourceVariant> {
    const resourceVariantToUpdate =
      await this.prisma.resourceVariant.findUnique({
        where: { id },
      });

    if (!resourceVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resourceVariant.update({
        where: { id },
        data: updateResourceVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeResourceVariant(id: number): Promise<ResourceVariant> {
    const resourceVariantToDelete =
      await this.prisma.resourceVariant.findUnique({
        where: { id },
      });

    if (!resourceVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resourceVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }

  // Resources
  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    try {
      return await this.prisma.resource.create({
        data: createResourceDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllResources(): Promise<Resource[]> {
    return this.prisma.resource.findMany({
      include: {
        skill: true,
        variants: true,
        rooms: true,
      },
    });
  }

  async findOneResource(id: number): Promise<Resource> {
    const foundResource = await this.prisma.resource.findUnique({
      where: { id },
      include: {
        skill: true,
        variants: true,
        rooms: true,
      },
    });

    if (foundResource === null) {
      throw new NotFoundException();
    }

    return foundResource;
  }

  async updateResource(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    const resourceToUpdate = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resourceToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resource.update({
        where: { id },
        data: updateResourceDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeResource(id: number): Promise<Resource> {
    const resourceToDelete = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resourceToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.resource.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }

  // Consumable Variants
  async createConsumableVariant(
    createConsumableVariantDto: CreateConsumableVariantDto,
  ): Promise<ConsumableVariant> {
    try {
      return await this.prisma.consumableVariant.create({
        data: createConsumableVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllConsumableVariants(): Promise<ConsumableVariant[]> {
    return this.prisma.consumableVariant.findMany({
      include: {
        consumable: true,
        dropTables: true,
        recipe: true,
        vendors: true,
      },
    });
  }

  async findOneConsumableVariant(id: number): Promise<ConsumableVariant> {
    const foundConsumableVariant =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
        include: {
          consumable: true,
          dropTables: true,
          recipe: true,
          vendors: true,
        },
      });

    if (foundConsumableVariant === null) {
      throw new NotFoundException();
    }

    return foundConsumableVariant;
  }

  async updateConsumableVariant(
    id: number,
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ): Promise<ConsumableVariant> {
    const consumableVariantToUpdate =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
      });

    if (!consumableVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumableVariant.update({
        where: { id },
        data: updateConsumableVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeConsumableVariant(id: number): Promise<ConsumableVariant> {
    const consumableVariantToDelete =
      await this.prisma.consumableVariant.findUnique({
        where: { id },
      });

    if (!consumableVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumableVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }

  // Consumables
  createConsumable(createConsumableDto: CreateConsumableDto) {
    return 'This action adds a new consumable';
  }

  findAllConsumables() {
    return `This action returns all consumables`;
  }

  findOneConsumable(id: number) {
    return `This action returns a #${id} consumable`;
  }

  updateConsumable(id: number, updateConsumableDto: UpdateConsumableDto) {
    return `This action updates a #${id} consumable`;
  }

  removeConsumable(id: number) {
    return `This action removes a #${id} consumable`;
  }

  // Weapon Variants
  createWeaponVariant(createWeaponVariantDto: CreateWeaponVariantDto) {
    return 'This action adds a new weapon variant';
  }

  findAllWeaponVariants() {
    return `This action returns all weapon variants`;
  }

  findOneWeaponVariant(id: number) {
    return `This action returns a #${id} weapon variant`;
  }

  updateWeaponVariant(
    id: number,
    updateWeaponVariantDto: UpdateWeaponVariantDto,
  ) {
    return `This action updates a #${id} weapon variant`;
  }

  removeWeaponVariant(id: number) {
    return `This action removes a #${id} weapon variant`;
  }

  // Weapons
  createWeapon(createWeaponDto: CreateWeaponDto) {
    return 'This action adds a new weapon';
  }

  findAllWeapons() {
    return `This action returns all weapons`;
  }

  findOneWeapon(id: number) {
    return `This action returns a #${id} weapon`;
  }

  updateWeapon(id: number, updateWeaponDto: UpdateWeaponDto) {
    return `This action updates a #${id} weapon`;
  }

  removeWeapon(id: number) {
    return `This action removes a #${id} weapon`;
  }

  // Armor Variants
  createArmorVariant(createArmorVariantDto: CreateArmorVariantDto) {
    return 'This action adds a new armor variant';
  }

  findAllArmorVariants() {
    return `This action returns all armor variants`;
  }

  findOneArmorVariant(id: number) {
    return `This action returns a #${id} armor variant`;
  }

  updateArmorVariant(id: number, updateArmorVariantDto: UpdateArmorVariantDto) {
    return `This action updates a #${id} armor variant`;
  }

  removeArmorVariant(id: number) {
    return `This action removes a #${id} armor variant`;
  }

  // Armor
  createArmor(createArmorDto: CreateArmorDto) {
    return 'This action adds a new armor';
  }

  findAllArmor() {
    return `This action returns all armors`;
  }

  findOneArmor(id: number) {
    return `This action returns a #${id} armor`;
  }

  updateArmor(id: number, updateArmorDto: UpdateArmorDto) {
    return `This action updates a #${id} armor`;
  }

  removeArmor(id: number) {
    return `This action removes a #${id} armor`;
  }

  // Misc Items
  createMiscItem(createMiscItemDto: CreateMiscItemDto) {
    return 'This action adds a new misc item';
  }

  findAllMiscItem() {
    return `This action returns all misc items`;
  }

  findOneMiscItem(id: number) {
    return `This action returns a #${id} misc item`;
  }

  updateMiscItem(id: number, updateMiscItemDto: UpdateMiscItemDto) {
    return `This action updates a #${id} misc item`;
  }

  removeMiscItem(id: number) {
    return `This action removes a #${id} misc item`;
  }
}
