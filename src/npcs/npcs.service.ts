/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class NpcsService {
  // Npcs
  createNpc(createNpcDto: CreateNpcDto) {
    return 'This action adds a new npc';
  }

  findAllNpcs() {
    return `This action returns all npcs`;
  }

  findOneNpc(id: number) {
    return `This action returns a #${id} npc`;
  }

  updateNpc(id: number, updateNpcDto: UpdateNpcDto) {
    return `This action updates a #${id} npc`;
  }

  removeNpc(id: number) {
    return `This action removes a #${id} npc`;
  }

  // Vendors
  createVendor(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAllVendors() {
    return `This action returns all vendors`;
  }

  findOneVendor(id: number) {
    return `This action returns a #${id} vendor`;
  }

  updateVendor(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  removeVendor(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
