import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';
import { CreateConsumableVariantDto } from './dto/consumable/create-consumable-variant.dto';
import { UpdateConsumableVariantDto } from './dto/consumable/update-consumable-variant.dto';
import { CreateConsumableDto } from './dto/consumable/create-consumable.dto';
import { UpdateConsumableDto } from './dto/consumable/update-consumable.dto';

@Injectable()
export class ItemsService {
  // Resource Variants
  createResourceVariant(createResourceVariantDto: CreateResourceVariantDto) {
    return 'This action adds a new resource variant';
  }

  findAllResourceVariants() {
    return `This action returns all resource variants`;
  }

  findOneResourceVariant(id: number) {
    return `This action returns a #${id} resource variant`;
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

  // Weapons

  // Armor Variants

  // Armor

  // Misc Items
}
