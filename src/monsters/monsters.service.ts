import { Injectable } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

@Injectable()
export class MonstersService {
  create(createMonsterDto: CreateMonsterDto) {
    return 'This action adds a new monster';
  }

  findAll() {
    return `This action returns all monsters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monster`;
  }

  update(id: number, updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  remove(id: number) {
    return `This action removes a #${id} monster`;
  }
}
