/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { CreateMonsterVariantDto } from './dto/create-monster-variant.dto';
import { UpdateMonsterVariantDto } from './dto/update-monster-variant.dto';

@Injectable()
export class MonstersService {
  // Monsters
  createMonster(createMonsterDto: CreateMonsterDto) {
    return 'This action adds a new monster';
  }

  findAllMonsters() {
    return `This action returns all monsters`;
  }

  findOneMonster(id: number) {
    return `This action returns a #${id} monster`;
  }

  updateMonster(id: number, updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  removeMonster(id: number) {
    return `This action removes a #${id} monster`;
  }

  // Monster Variants
  createMonsterVariant(createMonsterVariantDto: CreateMonsterVariantDto) {
    return 'This action adds a new monster variant';
  }

  findAllMonsterVariants() {
    return `This action returns all monster variants`;
  }

  findOneMonsterVariant(id: number) {
    return `This action returns a #${id} monster variant`;
  }

  updateMonsterVariant(
    id: number,
    updateMonsterVariantDto: UpdateMonsterVariantDto,
  ) {
    return `This action updates a #${id} monster variant`;
  }

  removeMonsterVariant(id: number) {
    return `This action removes a #${id} monster variant`;
  }
}
