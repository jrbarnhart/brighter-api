import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';

@Injectable()
export class ItemsService {
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

  // Consumable Variants

  // Consumables

  // Weapon Variants

  // Weapons

  // Armor Variants

  // Armor

  // Misc Items
}
