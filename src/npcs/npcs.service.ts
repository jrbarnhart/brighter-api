import { Injectable } from '@nestjs/common';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';

@Injectable()
export class NpcsService {
  create(createNpcDto: CreateNpcDto) {
    return 'This action adds a new npc';
  }

  findAll() {
    return `This action returns all npcs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} npc`;
  }

  update(id: number, updateNpcDto: UpdateNpcDto) {
    return `This action updates a #${id} npc`;
  }

  remove(id: number) {
    return `This action removes a #${id} npc`;
  }
}
