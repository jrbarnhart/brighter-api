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
import {
  Armor,
  ArmorVariant,
  Consumable,
  ConsumableVariant,
  MiscItem,
  Resource,
  ResourceVariant,
  Weapon,
  WeaponVariant,
} from '@prisma/client';

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
  async createConsumable(
    createConsumableDto: CreateConsumableDto,
  ): Promise<Consumable> {
    try {
      return await this.prisma.consumable.create({
        data: createConsumableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllConsumables(): Promise<Consumable[]> {
    return this.prisma.consumable.findMany({
      include: {
        variants: true,
      },
    });
  }

  async findOneConsumable(id: number): Promise<Consumable> {
    const foundConsumable = await this.prisma.consumable.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });

    if (foundConsumable === null) {
      throw new NotFoundException();
    }

    return foundConsumable;
  }

  async updateConsumable(
    id: number,
    updateConsumableDto: UpdateConsumableDto,
  ): Promise<Consumable> {
    const consumableToUpdate = await this.prisma.consumable.findUnique({
      where: { id },
    });

    if (!consumableToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumable.update({
        where: { id },
        data: updateConsumableDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeConsumable(id: number): Promise<Consumable> {
    const consumableToDelete = await this.prisma.consumable.findUnique({
      where: { id },
    });

    if (!consumableToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.consumable.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }

  // Weapon Variants
  async createWeaponVariant(
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

  findAllWeaponVariants(): Promise<WeaponVariant[]> {
    return this.prisma.weaponVariant.findMany({
      include: {
        dropTables: true,
        recipe: true,
        vendors: true,
        weapon: true,
      },
    });
  }

  async findOneWeaponVariant(id: number): Promise<WeaponVariant> {
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

  async updateWeaponVariant(
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

  async removeWeaponVariant(id: number): Promise<WeaponVariant> {
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

  // Weapons
  createWeapon(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    return 'This action adds a new weapon';
  }

  findAllWeapons(): Promise<Weapon[]> {
    return `This action returns all weapons`;
  }

  findOneWeapon(id: number): Promise<Weapon> {
    return `This action returns a #${id} weapon`;
  }

  updateWeapon(id: number, updateWeaponDto: UpdateWeaponDto): Promise<Weapon> {
    return `This action updates a #${id} weapon`;
  }

  removeWeapon(id: number): Promise<Weapon> {
    return `This action removes a #${id} weapon`;
  }

  // Armor Variants
  createArmorVariant(
    createArmorVariantDto: CreateArmorVariantDto,
  ): Promise<ArmorVariant> {
    return 'This action adds a new armor variant';
  }

  findAllArmorVariants(): Promise<ArmorVariant[]> {
    return `This action returns all armor variants`;
  }

  findOneArmorVariant(id: number): Promise<ArmorVariant> {
    return `This action returns a #${id} armor variant`;
  }

  updateArmorVariant(
    id: number,
    updateArmorVariantDto: UpdateArmorVariantDto,
  ): Promise<ArmorVariant> {
    return `This action updates a #${id} armor variant`;
  }

  removeArmorVariant(id: number): Promise<ArmorVariant> {
    return `This action removes a #${id} armor variant`;
  }

  // Armor
  createArmor(createArmorDto: CreateArmorDto): Promise<Armor> {
    return 'This action adds a new armor';
  }

  findAllArmor(): Promise<Armor[]> {
    return `This action returns all armors`;
  }

  findOneArmor(id: number): Promise<Armor> {
    return `This action returns a #${id} armor`;
  }

  updateArmor(id: number, updateArmorDto: UpdateArmorDto): Promise<Armor> {
    return `This action updates a #${id} armor`;
  }

  removeArmor(id: number): Promise<Armor> {
    return `This action removes a #${id} armor`;
  }

  // Misc Items
  createMiscItem(createMiscItemDto: CreateMiscItemDto): Promise<MiscItem> {
    return 'This action adds a new misc item';
  }

  findAllMiscItem(): Promise<MiscItem[]> {
    return `This action returns all misc items`;
  }

  findOneMiscItem(id: number): Promise<MiscItem> {
    return `This action returns a #${id} misc item`;
  }

  updateMiscItem(
    id: number,
    updateMiscItemDto: UpdateMiscItemDto,
  ): Promise<MiscItem> {
    return `This action updates a #${id} misc item`;
  }

  removeMiscItem(id: number): Promise<MiscItem> {
    return `This action removes a #${id} misc item`;
  }
}
