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

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Resource Variants
  createResourceVariant(createResourceVariantDto: CreateResourceVariantDto) {
    return 'This action adds a new resource variant';
  }

  findAllResourceVariants() {
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

  async findOneResourceVariant(id: number) {
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

  updateResourceVariant(
    id: number,
    updateResourceVariantDto: UpdateResourceVariantDto,
  ) {
    return `This action updates a #${id} resource variant`;
  }

  removeResourceVariant(id: number) {
    return `This action removes a #${id} resource variant`;
  }

  // Resources
  createResource(createResourceDto: CreateResourceDto) {
    return 'This action adds a new resource';
  }

  findAllResources() {
    return `This action returns all resources`;
  }

  findOneResource(id: number) {
    return `This action returns a #${id} resource`;
  }

  updateResource(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  removeResource(id: number) {
    return `This action removes a #${id} resource`;
  }

  // Consumable Variants
  createConsumableVariant(
    createConsumableVariantDto: CreateConsumableVariantDto,
  ) {
    return 'This action adds a new consumable variant';
  }

  findAllConsumableVariants() {
    return `This action returns all consumable variants`;
  }

  findOneConsumableVariant(id: number) {
    return `This action returns a #${id} consumable variant`;
  }

  updateConsumableVariant(
    id: number,
    updateConsumableVariantDto: UpdateConsumableVariantDto,
  ) {
    return `This action updates a #${id} consumable variant`;
  }

  removeConsumableVariant(id: number) {
    return `This action removes a #${id} consumable variant`;
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
