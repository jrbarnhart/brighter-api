import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';

@Injectable()
export class ItemsService {
  // Resources
  createResource(createResourceDto: CreateResourceDto) {
    return 'This action adds a new item';
  }

  findAllResources() {
    return `This action returns all items`;
  }

  findOneResource(id: number) {
    return `This action returns a #${id} item`;
  }

  updateResource(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} item`;
  }

  removeResource(id: number) {
    return `This action removes a #${id} item`;
  }

  // Consumables

  // Weapons

  // Armor

  // Misc Items
}
