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
  async createWeapon(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    try {
      return await this.prisma.weapon.create({
        data: createWeaponDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllWeapons(): Promise<Weapon[]> {
    return this.prisma.weapon.findMany({
      include: {
        variants: true,
      },
    });
  }

  async findOneWeapon(id: number): Promise<Weapon> {
    const foundWeapon = await this.prisma.weapon.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });

    if (foundWeapon === null) {
      throw new NotFoundException();
    }

    return foundWeapon;
  }

  async updateWeapon(
    id: number,
    updateWeaponDto: UpdateWeaponDto,
  ): Promise<Weapon> {
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

  async removeWeapon(id: number): Promise<Weapon> {
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

  // Armor Variants
  async createArmorVariant(
    createArmorVariantDto: CreateArmorVariantDto,
  ): Promise<ArmorVariant> {
    try {
      return await this.prisma.armorVariant.create({
        data: createArmorVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllArmorVariants(): Promise<ArmorVariant[]> {
    return this.prisma.armorVariant.findMany({
      include: {
        armor: true,
        dropTables: true,
        recipe: true,
        vendors: true,
      },
    });
  }

  async findOneArmorVariant(id: number): Promise<ArmorVariant> {
    const foundArmorVariant = await this.prisma.armorVariant.findUnique({
      where: { id },
      include: {
        armor: true,
        dropTables: true,
        recipe: true,
        vendors: true,
      },
    });

    if (foundArmorVariant === null) {
      throw new NotFoundException();
    }

    return foundArmorVariant;
  }

  async updateArmorVariant(
    id: number,
    updateArmorVariantDto: UpdateArmorVariantDto,
  ): Promise<ArmorVariant> {
    const armorVariantToUpdate = await this.prisma.armorVariant.findUnique({
      where: { id },
    });

    if (!armorVariantToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armorVariant.update({
        where: { id },
        data: updateArmorVariantDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeArmorVariant(id: number): Promise<ArmorVariant> {
    const armorVariantToDelete = await this.prisma.armorVariant.findUnique({
      where: { id },
    });

    if (!armorVariantToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armorVariant.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }

  // Armor
  async createArmor(createArmorDto: CreateArmorDto): Promise<Armor> {
    try {
      return await this.prisma.armor.create({
        data: createArmorDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAllArmor(): Promise<Armor[]> {
    return this.prisma.armor.findMany({
      include: {
        variants: true,
      },
    });
  }

  async findOneArmor(id: number): Promise<Armor> {
    const foundArmor = await this.prisma.armor.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });

    if (foundArmor === null) {
      throw new NotFoundException();
    }

    return foundArmor;
  }

  async updateArmor(
    id: number,
    updateArmorDto: UpdateArmorDto,
  ): Promise<Armor> {
    const armorToUpdate = await this.prisma.armor.findUnique({
      where: { id },
    });

    if (!armorToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armor.update({
        where: { id },
        data: updateArmorDto,
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async removeArmor(id: number): Promise<Armor> {
    const armorToDelete = await this.prisma.armor.findUnique({
      where: { id },
    });

    if (!armorToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.armor.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
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
